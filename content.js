console.log("NCD FULL AUTO SYSTEM LOADED");

let patients = [];
let currentIndex = 0;

// load data from sheet
async function load() {
    patients = await fetchPatients();
    console.log("Patients Loaded:", patients);

    if (patients.length > 0) {
        loadPatient(0);
    } else {
        alert("No Pending Patients ✔️");
    }
}

// load one patient
function loadPatient(index) {
    let p = patients[index];
    if (!p) return;

    currentIndex = index;

    autoFill(p);
}

// auto fill on page
function autoFill(p) {

    let inputs = document.querySelectorAll("input, textarea, select");

    inputs.forEach(i => {
        let name = (i.name || "").toLowerCase();
        let id = (i.id || "").toLowerCase();

        if (name.includes("name") || id.includes("name")) {
            i.value = p.name;
        }

        if (name.includes("sys") || id.includes("sys")) {
            i.value = p.systolic;
        }

        if (name.includes("dia") || id.includes("dia")) {
            i.value = p.diastolic;
        }

        if (name.includes("diab") || id.includes("diab")) {
            i.value = p.diabetic;
        }
    });

    alert("Patient Loaded ✔️: " + p.name);
}

// next patient
function nextPatient() {
    if (currentIndex + 1 < patients.length) {
        loadPatient(currentIndex + 1);
    } else {
        alert("All Done ✔️");
    }
}

// expose functions
window.loadNCD = load;
window.nextNCD = nextPatient;

// auto start after login page load
setTimeout(load, 3000);
