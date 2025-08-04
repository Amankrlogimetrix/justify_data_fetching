
const { Op } = require("sequelize");
const {
  stateModel,
  districtModel,
  DcCourtModel,
  HcCourtModel,
  DcCases,
  CaseDetails,
} = require("../../models");


const getUsersDistrictsCases = async (req, res) => {
  try {
    let { districtId } = req.query;
    if (!districtId) {
      return res.status(400).json({ message: "districtId is required" });
    }
    let districtIdArray = districtId.split(",").map((id) => id.trim());

    const userDistrictsCases = await DcCases.findAll({
      where: {
        district_id: {
          [Op.in]: districtIdArray,
        },
      },
      include: [
        {
          model: CaseDetails,
          as: "case_details",
          attributes: 
            ["id", "case_status"],
          
        },
      ],
      attributes: { exclude: ["raw"] },
      raw: true,
    });
    return res.status(200).json({ status: true, data: userDistrictsCases });
  } catch (error) {
    console.error("Error fetching user districts cases:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDistrictsCases = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "id is required" });
        }
        let findCaseDetails = await CaseDetails.findOne({
            where: {
               id:id 
            },
            raw:true
        })
        return res.status(200).send({status:true, data:findCaseDetails})

        }catch(error){
            return res.status(500).send({status:false, message:"Server Error"})
        }
    }

module.exports = {
  getUsersDistrictsCases,
  getDistrictsCases
};