function extractDomain(url) {
    let domain;
    if (url.indexOf("://") > -1) {
        domain = url.split("/")[2];
    } else {
        domain = url.split("/")[0];
    }
    domain = domain.split(":")[0];
    domain = domain.split("?")[0];
    return domain;
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active) {
        const tabUrl = tab.url;
        const tabDomain = extractDomain(tabUrl);
        chrome.storage.sync.get({ trackedURLs: [] }, function (result) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                const trackedURLs = result.trackedURLs;
                if (!trackedURLs.includes(tabDomain) && tabDomain !== "newtab") {
                    trackedURLs.push(tabDomain);
                    chrome.storage.sync.set({ trackedURLs: trackedURLs }, function () {
                        if (chrome.runtime.lastError) {
                            console.error(chrome.runtime.lastError);
                        } else {
                            console.log(trackedURLs)
                            console.log("URL has been added to the tracked URLs array.");
                        }
                    });
                }
            }
        });
    }
});
