const { Op } = require("sequelize");
const {
  stateModel,
  districtModel,
  DcCourtModel,
  HcCourtModel,
  DcCases,
  CaseDetails,
} = require("../../models");

function convertYearFromCode(input) {
  return input.replace(/\/(\d{2})$/, (_, yy) => {
    const year = parseInt(yy, 10);
    const fullYear = year <= 24 ? 2000 + year : 1900 + year;
    return `/${fullYear}`;
  });
}

// const fetchCasesDetailsAsPerBarCouncil = async (req, res) => {
//     try {
//         let {BarCouncil, districtIds} = req.body

//         if(!BarCouncil || !districtIds || !Array.isArray(districtIds) || districtIds.length === 0) {
//             return res.status(400).json({ message: 'BarCouncil and districtIds are required'
//             });
//         }
//         BarCouncil = convertYearFromCode(BarCouncil);
//         console.log(BarCouncil, "BarCouncil after conversion");
//         // const districtDetails = await districtModel.findAll({
//         //     where: {
//         //       state_id
//         //     },
//         //     raw: true,
//         // })
//         // if (districtDetails.length === 0) {
//         //     return res.status(404).json({ message: 'District not found' });
//         // }
//         let arr = [];
//         const [state, number, year] = BarCouncil.split('/');
//         console.log(`Fetching cases for state: ${state}, number: ${number}, year: ${year}`);
//         for (let i =0 ; i < districtIds.length; i++) {
//             const districtId = districtIds[i];

//             let url = `${process.env.HOST_E_COURT}/district-court/search/advocate-number`;
//             let headers = {
//                 'Content-Type': 'application/json',
//                 'Authorization': `${process.env.E_COURT_AUTH_TOKEN}`
//             };
//             const body = {
//                 advocate: { state, number, year },
//                 stage: "BOTH",
//                 districtId: districtId
//             };
//             console.log(JSON.stringify(body), "____body for fetching cases");
//             let response = await fetch(url, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(body)
//             });
//             let data = await response.json();
//             if (data.length == 0) {
//                 console.log(`No cases found for district , ${districtId}`);
//                 continue; // Skip to next district if no cases found
//             }
//             console.log(data,"____data fetcheds")
//             if(data.length > 0) {
//                 data.forEach(caseItem => {
//                     if(caseItem.advocateName !== null && caseItem.cases.length > 0) {
//                         caseItem.advocateName = caseItem.advocateName.trim();
//                         caseItem.cases.forEach(async (caseDetails) => {
//                             caseDetails.caseNumber = caseDetails.caseNumber.trim();
//                             caseDetails.dateOfDecision = caseDetails.dateOfDecision.trim();
//                             caseDetails.dateOfFiling = caseDetails.dateOfFiling.trim();
//                             caseDetails.districtId = districtId;
//                             const oneCaseDetails = {
//                                 cnr: caseDetails.cnr,
//                                 title: caseDetails.title,
//                                 date_of_decision: caseDetails.date_of_decision,
//                                 case_number: caseDetails.case_number,
//                                 filing_number: caseDetails.filing.number,
//                                 filing_year: caseDetails.filing.year,
//                                 type: caseDetails.type,
//                                 district_id: caseDetails.district_id,
//                                 advocate_name: caseItem.advocateName,
//                                 raw: caseDetails
//                             };
//                             //spread and add to an array then bulk create to one time
//                             await DcCases.create(oneCaseDetails);
//                         });
//                         arr.push(caseDetails);

//                     }

//                 });
//             }
//             arr.push(data);
//             // break;
//         }
//         res.status(200).json(arr);
//     } catch (error) {
//         console.error('Error fetching case details:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
//   }

const fetchCasesDetailsAsPerBarCouncil = async (req, res) => {
  try {
    let { BarCouncil, districtIds } = req.body;

    if (
      !BarCouncil ||
      !districtIds ||
      !Array.isArray(districtIds) ||
      districtIds.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "BarCouncil and districtIds are required" });
    }
    BarCouncil = convertYearFromCode(BarCouncil);
    const [state, number, year] = BarCouncil.split("/");
    let findDistrictDetails = await districtModel.findAll({
      where: {
        district_id: {
          [Op.in]: districtIds,
        },
      },
      raw: true,
    });

    let allCasesToInsert = [];

    for (const districtId of districtIds) {
      const body = {
        advocate: { state, number, year },
        stage: "BOTH",
        districtId,
      };

      const response = await fetch(
        `${process.env.HOST_E_COURT}/district-court/search/advocate-number`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${process.env.E_COURT_AUTH_TOKEN}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        console.log(`No cases found for district ${districtId}`);
        continue;
      }

      for (const court of data) {
        if (
          court.advocateName &&
          Array.isArray(court.cases) &&
          court.cases.length > 0
        ) {
          const advocateName = court.advocateName.trim();

          for (const caseItem of court.cases) {
            if (caseItem.cnr && caseItem.caseNumber) {
              let caseStatus;
              const decisionDate = caseItem.dateOfDecision;
              const nature = caseItem.natureOfDisposal?.toLowerCase() || "";

              if (nature.includes("dismissed")) {
                caseStatus = "Lost";
              } else if (nature.includes("granted")) {
                caseStatus = "Win";
              } else if (
                !decisionDate ||
                decisionDate === "1970-01-01T00:00:00.000Z"
              ) {
                caseStatus = "Pending";
              } else {
                caseStatus = "Decision Done";
              }
              allCasesToInsert.push({
                cnr: caseItem.cnr,
                title: caseItem.title?.trim(),
                date_of_decision: caseItem.dateOfDecision?.trim(),
                case_number: caseItem.caseNumber?.trim(),
                filing_number: caseItem.filing?.number,
                filing_year: caseItem.filing?.year,
                type: caseItem.type.trim(),
                own_district_id:
                  findDistrictDetails.find(
                    (district) => district.district_id === districtId
                  )?.id || null,
                district_id: districtId,
                advocate_name: advocateName,
                raw: JSON.stringify(caseItem),
              });
            }
          }
        }
      }
    }
    let cnrs = [];

    if (allCasesToInsert.length > 0) {
      let createdData = await DcCases.bulkCreate(allCasesToInsert, {
        returning: true,
      });
      for (let data of createdData) {
        cnrs.push({
          id: data.id,
          cnr: data.cnr,
        });
      }
    }
    await fetchCasesDetailsAsPerCnr(cnrs);
    res.status(200).json({
      message: `${allCasesToInsert.length} case(s) inserted successfully`,
      count: allCasesToInsert.length,
      data: allCasesToInsert,
    });
  } catch (error) {
    console.error("Error fetching case details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchCasesDetailsAsPerCnr = async (cnrList) => {
  const batchSize = 10;
  const casesToInsert = [];

  for (let i = 0; i < cnrList.length; i += batchSize) {
    const batch = cnrList.slice(i, i + batchSize);

    const promises = batch.map(async (item) => {
      try {
        const response = await fetch(
          `${process.env.HOST_E_COURT}/district-court/case`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${process.env.E_COURT_AUTH_TOKEN}`,
            },
            body: JSON.stringify({ cnr: item.cnr }),
          }
        );

        const data = await response.json();

        if (!data || !data.cnr) return;

        const caseStatus = getCaseStatus(
          data.status?.natureOfDisposal,
          data.status?.decisionDate
        );

        casesToInsert.push({
          cnr: data.cnr,
          title: data.title,
          actsAndSections: data.actsAndSections,
          details: data.details,
          firstInformationReport: data.firstInformationReport,
          history: data.history,
          orders: data.orders,
          parties: data.parties,
          status: data.status,
          case_status: caseStatus,
          adv_cases_id: item.id,
          raw: data,
        });
      } catch (err) {
        console.error(`Failed to fetch for CNR ${item.cnr}:`, err.message);
      }
    });

    await Promise.allSettled(promises); 
  }

  if (casesToInsert.length > 0) {
    await CaseDetails.bulkCreate(casesToInsert, { ignoreDuplicates: true });
    console.log(`${casesToInsert.length} cases inserted successfully.`);
  }
};

function getCaseStatus(natureOfDisposal, decisionDate) {
  const normNature = natureOfDisposal?.toLowerCase() || "";
  if (normNature.includes("dismissed")) return "Lost";
  if (normNature.includes("granted")) return "Win";

  if (!decisionDate || decisionDate === "1970-01-01T00:00:00.000Z")
    return "Pending";

  return "Decision Done";
}

module.exports = {
  fetchCasesDetailsAsPerBarCouncil,
};
