console.log("NCD ACTIVE");

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {

    if (req.action === "START") {

        alert("Extension Connected ✔️");

        let inputs = document.querySelectorAll("input");

        console.log(inputs);

        inputs.forEach(el => {

            let n = (el.name || "").toLowerCase();
            let id = (el.id || "").toLowerCase();

            if (n.includes("name") || id.includes("name")) {
                el.value = "TEST NAME";
            }

            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        });
    }
});
