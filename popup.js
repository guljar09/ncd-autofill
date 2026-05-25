document.getElementById("startBtn").addEventListener("click", async () => {

    try {

        const tabs = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        chrome.tabs.sendMessage(tabs[0].id, {
            action: "START"
        });

    } catch (e) {

        console.log(e);
        alert("Connection Error");
    }
});
