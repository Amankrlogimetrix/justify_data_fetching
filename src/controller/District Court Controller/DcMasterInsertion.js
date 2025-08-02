const {stateModel, districtModel, complexModel, DcCourtModel} = require("../../models");
const { Op } = require("sequelize");

const staticDataController = async (req, res) => {
  try {
    console.log("Fetching state data...");
    const url = `${process.env.HOST_pheonix}/district-court/states`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch states: ${response.statusText}`);
    }

    const state = await response.json();
    const transformedStates = state.states.map(item => ({
      state_id: item.id,
      name: item.name
    }));

    // Save all states and get their DB rows (for own_state_id)
    const createdStates = await stateModel.bulkCreate(transformedStates, { returning: true ,raw:true});
    console.log(createdStates, "___> state data fetched successfully");
    // Now fetch and insert districts
    for (const state of createdStates) {
      const districtRes = await fetch(`${process.env.HOST_pheonix}/district-court/districts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stateId: state.state_id })
      });

      if (!districtRes.ok) {
        console.error(`Failed to fetch districts for stateId ${state.state_id}`);
        continue; // Skip to next state
      }

      const districtData = await districtRes.json();

      for (const district of districtData.districts) {
        let createdDistrict =  await districtModel.create({
          own_state_id: state.id, // This is from DB
          district_id: district.id,
          name: district.name,
          state_id: state.state_id // This is from API
        });
        let fetch_complexs = await fetch(`${process.env.HOST_pheonix}/district-court/complexes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
            body: JSON.stringify({ districtId: district.id })

        });
        if (!fetch_complexs.ok) {
            console.error(`Failed to fetch complexes for districtId ${district.id}`);
            continue; // Skip to next district
            }
        const complexData = await fetch_complexs.json();
        for (const complex of complexData.complexes) {
            let createdComplex = await complexModel.create({
                own_state_id: state.id, 
                own_district_id: createdDistrict.id,
                district_id: district.id,
                name: complex.name,
                state_id: state.state_id,
                complex_id: complex.id
            });

            let fetch_courts = await fetch(`${process.env.HOST_pheonix}/district-court/courts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify({ complexId: complex.id })

                });
                if (!fetch_courts.ok) {
                    console.error(`Failed to fetch courts for complexId ${district.id}`);
                    continue; // Skip to next district
                }
            const courtsData = await fetch_courts.json();

                for(const court of courtsData.courts) {

                    await DcCourtModel.create({
                        name: court.name,
                        d_court_id: court.id,
                        state_id: state.state_id,
                        district_id: district.id,
                        own_state_id: state.id,
                        own_district_id: createdDistrict.id,
                        own_complex_id: createdComplex.id,
                        complex_id: complex.id,
                    });
                }
      console.log(`Inserted courts for complex ${complex.name}`);


        }
      console.log(`Inserted complex for District ${district.name}`);


      }

      console.log(`Inserted districts for state ${state.name}`);
    }

    return res.status(200).json({ message: "State and district data fetched and stored successfully" });

  } catch (error) {
    console.error("Error fetching states or districts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
    staticDataController,
};