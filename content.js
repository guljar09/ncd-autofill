console.log("NCD Ultra Active");

let patients = [];
let index = 0;
let running = false;

async function loadNCD() {
    patients = await fetchPatients();

    if (!patients.length) {
        alert("No Pending Patients ✔️");
        return;
    }

    alert("Loaded ✔️ " + patients.length);
}

async function startAutoRun() {

    patients = await fetchPatients();

    if (!patients.length) {
        alert("No Pending Patients ✔️");
        return;
    }

    running = true;
    index = 0;

    for (let i = 0; i < patients.length; i++) {

        if (!running) break;

        index = i;

        autoFill(patients[i]);

        await new Promise(r => setTimeout(r, 4000));
    }

    running = false;
    alert("ALL DONE ✔️");
}

function stopAutoRun() {
    running = false;
    alert("STOPPED ⏹️");
}

function autoFill(p) {

    let inputs = document.querySelectorAll("input, textarea, select");

    inputs.forEach(el => {

        let n = (el.name || "").toLowerCase();
        let id = (el.id || "").toLowerCase();
        let ph = (el.placeholder || "").toLowerCase();

        if (n.includes("name") || id.includes("name") || ph.includes("name")) {
            el.value = p.name;
        }

        if (n.includes("sys") || id.includes("sys") || ph.includes("sys")) {
            el.value = p.systolic;
        }

        if (n.includes("dia") || id.includes("dia") || ph.includes("dia")) {
            el.value = p.diastolic;
        }

        if (n.includes("diab") || id.includes("diab") || ph.includes("diab")) {
            el.value = p.diabetic;
        }
    });

    console.log("Filled:", p.name);
}

window.loadNCD = loadNCD;
window.startAutoRun = startAutoRun;
window.stopAutoRun = stopAutoRun;

window.addEventListener("message", (e) => {

    if (!e.data) return;

    if (e.data.action === "LOAD") loadNCD();
    if (e.data.action === "START") startAutoRun();
    if (e.data.action === "STOP") stopAutoRun();
});
