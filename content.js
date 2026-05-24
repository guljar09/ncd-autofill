console.log("NCD Stable System Loaded");

let patients = [];
let index = 0;

// load sheet data
async function loadNCD() {
    patients = await fetchPatients();

    if (!patients.length) {
        alert("No Pending Patients ✔️");
        return;
    }

    loadPatient(0);
}

// load one patient
function loadPatient(i) {
    let p = patients[i];
    if (!p) return;

    index = i;

    autoFill(p);
}

// safe auto fill (stable version)
function autoFill(p) {

    let inputs = document.querySelectorAll("input, textarea, select");

    inputs.forEach(el => {
        let name = (el.name || "").toLowerCase();
        let id = (el.id || "").toLowerCase();

        if (name.includes("name") || id.includes("name")) {
            el.value = p.name;
        }

        if (name.includes("sys")) {
            el.value = p.systolic;
        }

        if (name.includes("dia")) {
            el.value = p.diastolic;
        }

        if (name.includes("diab")) {
            el.value = p.diabetic;
        }
    });

    console.log("Loaded:", p.name);
    alert("Patient Loaded ✔️");
}

// next patient
function nextNCD() {
    if (index + 1 < patients.length) {
        loadPatient(index + 1);
    } else {
        alert("All Done ✔️");
    }
}

// expose functions
window.loadNCD = loadNCD;
window.nextNCD = nextNCD;
