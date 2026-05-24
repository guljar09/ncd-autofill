console.log("NCD UI Panel Active");

// listen panel actions
window.addEventListener("message", (event) => {
    let action = event.data.action;

    if (action === "LOAD_NCD") {
        alert("Loading Sheet Data...");
        if (window.loadNCD) window.loadNCD();
    }

    if (action === "NEXT_NCD") {
        if (window.nextNCD) window.nextNCD();
    }

    if (action === "DONE_NCD") {
        alert("Marked Done ✔️");
    }

    if (action === "SKIP_NCD") {
        alert("Skipped ⏭️");
    }
});
