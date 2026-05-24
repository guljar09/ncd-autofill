const SHEET_ID = "1tdeGy-CGVQuz54NcM7DSRf5REqDS1_Vf_u-NsHw8Q30";

const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

async function fetchPatients() {
    try {
        let res = await fetch(URL);
        let text = await res.text();

        let rows = text.split("\n").map(r => r.split(","));

        let patients = [];

        for (let i = 1; i < rows.length; i++) {
            let r = rows[i];

            if (r[4] && r[4].toLowerCase().includes("pending")) {
                patients.push({
                    name: r[0] || "",
                    systolic: r[1] || "",
                    diastolic: r[2] || "",
                    diabetic: r[3] || "",
                    status: r[4] || "",
                    row: i + 1
                });
            }
        }

        return patients;

    } catch (err) {
        console.error("Sheet error:", err);
        return [];
    }
}
