const {DcCases} = require("../../models");


const fetchDcCaseDetailsFrom_E_court = async (req, res) => {
    try {
        const { id } = req.params;
        const dcCase = await DcCases.findById(id);
        if (!dcCase) {
            return res.status(404).json({ message: "Case not found" });
            }
        return res.status(200).json(dcCase);
    } catch (error) {
        console.error("Error fetching case details:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    fetchDcCaseDetailsFrom_E_court
};