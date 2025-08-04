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


let respone  = {
            "cnr": "RJJR010001712025",
            "title": "Kishore Kumar vs State",
            "date_of_decision": "2025-02-17T18:30:00.000Z",
            "case_number": "253500000372025",
            "filing_number": 37,
            "filing_year": 2025,
            "type": "Bail Application",
            "own_district_id": 720,
            "district_id": "d0d5bc1a",
            "advocate_name": "ANDARAM BENIOWAL",
            "case_status": "Decision Done",
            "raw": "{\"cnr\":\"RJJR010001712025\",\"title\":\"Kishore Kumar vs State\",\"dateOfDecision\":\"2025-02-17T18:30:00.000Z\",\"caseNumber\":\"253500000372025\",\"filing\":{\"number\":37,\"year\":2025},\"type\":\"Bail Application\",\"advocateName\":\"Andaram \"}"
        }

        

module.exports = {
    fetchDcCaseDetailsFrom_E_court
};