const { HcCourtModel, HcBenchesModel} = require("../../models");
const { Op } = require("sequelize");


const highCourtsData = async (req, res) => {
  try {
    console.log("Fetching high courts data...");
    const url = `${process.env.HOST_pheonix}/high-court/courts`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch high courts: ${response.statusText}`);
    }

    const highCourts = await response.json();
    // console.log(highCourts, "___> high courts data fetched successfully");
    const transformedHighCourts = highCourts.courts.map(item => ({
      h_court_id: item.id,
      name: item.name,
    }));
    // console.log(transformedHighCourts, "___> transformed high courts data");
    let createHcData = await HcCourtModel.bulkCreate(transformedHighCourts, { returning: true, raw: true });

    for (const court of createHcData) {
      let fetch_benches = await fetch(`${process.env.HOST_pheonix}/high-court/benches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({courtId : court.h_court_id})
      });
      if (!fetch_benches.ok) {
        throw new Error(`Failed to fetch benches for high court ${court.name}: ${fetch_benches.statusText}`);
      }
      const benchesData = await fetch_benches.json();
      for (const bench of benchesData.benches) {
        await HcBenchesModel.create({
          own_hc_court_id: court.id,
          bench_id: bench.id,
          name: bench.name,
        });
      }
      console.log(`Inserted benches for high court ${court.name}`);
    }

    return res.status(200).json({ highCourts, message: "High courts data fetched successfully" });
  } catch (error) {
    console.error("Error fetching high courts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
    highCourtsData
};