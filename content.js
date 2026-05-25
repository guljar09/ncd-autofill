console.log("NCD Ultra Active");

let patients = [];
let running = false;

// SHEET LOAD
async function fetchPatients() {

    const SHEET_ID = "1tdeGy-CGVQuz54NcM7DSRf5REqDS1_Vf_u-NsHw8Q30";

    const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

    try {

        const res = await fetch(URL);
        const text = await res.text();

        const rows = text.split("\n").map(r => r.split(","));

        let arr = [];

        for (let i = 1; i < rows.length; i++) {

            let r = rows[i];

            if (r[4] && r[4].toLowerCase().includes("pending")) {

                arr.push({
                    name: r[0] || "",
                    systolic: r[1] || "",
                    diastolic: r[2] || "",
                    diabetic: r[3] || ""
                });
            }
        }

        return arr;

    } catch (e) {
        console.log(e);
        return [];
    }
}

// AUTO FILL
function autoFill(p) {

    let inputs = document.querySelectorAll("input");

    inputs.forEach(el => {

        let n = (el.name || "").toLowerCase();
        let id = (el.id || "").toLowerCase();

        if (n.includes("name") || id.includes("name")) {
            el.value = p.name;
        }

        if (n.includes("sys") || id.includes("sys")) {
            el.value = p.systolic;
        }

        if (n.includes("dia") || id.includes("dia")) {
            el.value = p.diastolic;
        }

        if (n.includes("diab") || id.includes("diab")) {
            el.value = p.diabetic;
        }
    });

    console.log("Filled:", p.name);
}

// START AUTO
async function startAutoRun() {

    patients = await fetchPatients();

    if (!patients.length) {
        alert("No patients found");
        return;
    }

    running = true;

    for (let i = 0; i < patients.length; i++) {

        if (!running) break;

        autoFill(patients[i]);

        await new Promise(r => setTimeout(r, 4000));
    }

    alert("All Done ✔️");
}

// STOP
function stopAutoRun() {
    running = false;
}

// BUTTON LISTENER
chrome.runtime.onMessage.addListener((req) => {

    if (req.action === "START") {
        startAutoRun();
    }

    if (req.action === "STOP") {
        stopAutoRun();
    }
});
