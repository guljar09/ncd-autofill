console.log("NCD Stable System Loaded");

// -------------------- DATA --------------------
let patients = [];
let currentIndex = 0;

// -------------------- LOAD SHEET DATA --------------------
async function loadNCD() {
    try {
        patients = await fetchPatients();

        if (!patients || patients.length === 0) {
            alert("No Pending Patients ✔️");
            return;
        }

        console.log("Patients Loaded:", patients);

        loadPatient(0);

    } catch (err) {
        console.error("Error loading NCD:", err);
        alert("Error loading sheet data");
    }
}

// -------------------- LOAD SINGLE PATIENT --------------------
function loadPatient(index) {
    let p = patients[index];
    if (!p) return;

    currentIndex = index;
    autoFill(p);
}

// -------------------- AUTO FILL LOGIC --------------------
function autoFill(p) {

    let inputs = document.querySelectorAll("input, textarea, select");

    inputs.forEach(el => {
        let name = (el.name || "").toLowerCase();
        let id = (el.id || "").toLowerCase();

        // NAME
        if (name.includes("name") || id.includes("name")) {
            el.value = p.name;
        }

        // SYSTOLIC
        if (name.includes("sys") || id.includes("sys")) {
            el.value = p.systolic;
        }

        // DIASTOLIC
        if (name.includes("dia") || id.includes("dia")) {
            el.value = p.diastolic;
        }

        // DIABETIC
        if (name.includes("diab") || id.includes("diab")) {
            el.value = p.diabetic;
        }
    });

    console.log("Auto filled:", p.name);
    alert("Patient Loaded ✔️ " + p.name);
}

// -------------------- NEXT PATIENT --------------------
function nextNCD() {
    if (currentIndex + 1 < patients.length) {
        loadPatient(currentIndex + 1);
    } else {
        alert("All Done ✔️ No more patients");
    }
}

// -------------------- POPUP CONTROLS --------------------
window.addEventListener("message", (e) => {

    if (!e.data) return;

    if (e.data.action === "LOAD") {
        loadNCD();
    }

    if (e.data.action === "NEXT") {
        nextNCD();
    }
});

// -------------------- EXPOSE FUNCTIONS --------------------
window.loadNCD = loadNCD;
window.nextNCD = nextNCD;
