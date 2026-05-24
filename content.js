console.log("NCD Auto Fill Engine Loaded");

// Google Sheet data (example object - pachi real sheet thi connect thase)
let currentPatient = null;

// Simulated function (pachi sheet thi real data aavse)
function setPatient(data) {
    currentPatient = data;
    autoFill();
}

// Auto fill function
function autoFill() {
    if (!currentPatient) return;

    // Try finding common input fields
    let inputs = document.querySelectorAll("input, select, textarea");

    inputs.forEach(input => {
        let name = input.name?.toLowerCase() || "";
        let id = input.id?.toLowerCase() || "";

        // NAME field
        if (name.includes("name") || id.includes("name")) {
            input.value = currentPatient.name;
        }

        // SYSTOLIC
        if (name.includes("sys") || id.includes("sys")) {
            input.value = currentPatient.systolic;
        }

        // DIASTOLIC
        if (name.includes("dia") || id.includes("dia")) {
            input.value = currentPatient.diastolic;
        }

        // DIABETIC
        if (name.includes("diab") || id.includes("diab")) {
            input.value = currentPatient.diabetic;
        }
    });

    alert("Auto Fill Done ✔️");
}
