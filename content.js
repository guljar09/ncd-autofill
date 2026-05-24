console.log("NCD System Loaded");

let patients = [];
let currentIndex = 0;

async function loadNCD() {
    patients = await fetchPatients();

    if (!patients.length) {
        alert("No Pending Patients ✔️");
        return;
    }

    loadPatient(0);
}

function loadPatient(i) {
    let p = patients[i];
    if (!p) return;

    currentIndex = i;
    autoFill(p);
}

function autoFill(p) {

    let inputs = document.querySelectorAll("input, textarea, select");

    inputs.forEach(el => {
        let n = (el.name || "").toLowerCase();
        let id = (el.id || "").toLowerCase();

        if (n.includes("name") || id.includes("name")) el.value = p.name;
        if (n.includes("sys")) el.value = p.systolic;
        if (n.includes("dia")) el.value = p.diastolic;
        if (n.includes("diab")) el.value = p.diabetic;
    });

    alert("Loaded ✔️ " + p.name);
}

function nextNCD() {
    if (currentIndex + 1 < patients.length) {
        loadPatient(currentIndex + 1);
    } else {
        alert("All Done ✔️");
    }
}

window.loadNCD = loadNCD;
window.nextNCD = nextNCD;

window.addEventListener("message", (e) => {
    if (e.data.action === "LOAD") loadNCD();
    if (e.data.action === "NEXT") nextNCD();
});
