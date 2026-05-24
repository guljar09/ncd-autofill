const SHEET_ID = "1tdeGy-CGVQuz54NcM7DSRf5REqDS1_Vf_u-NsHw8Q30";

const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

async function getData() {
    let res = await fetch(URL);
    let text = await res.text();

    let rows = text.split("\n");

    let patients = [];

    for (let i = 1; i < rows.length; i++) {
        let cols = rows[i].split(",");

        if (cols[4] && cols[4].includes("Pending")) {
            patients.push({
                name: cols[0],
                systolic: cols[1],
                diastolic: cols[2],
                diabetic: cols[3],
                status: cols[4]
            });
        }
    }

    console.log("Pending Patients:", patients);
}

getData();
