browser.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const url = details.url;
    const tabId = details.tabId;

    const response = await fetch(url);
    const html = await response.text();
    const regex = /"name":"Datasheet","page_count":\d+,"url":"([^"]+)"/;
    const match = html.match(regex);

    if (match && match[1]) {
      // use first match - it seems like octopart's html viewer can render
      // multiple documents but i have not found an example of this.
      browser.tabs.update(tabId, { url: match[1] });
    }
  },
  { urls: ["https://octopart.com/datasheet/*"], types: ["main_frame"] },
  ["blocking"]
);
