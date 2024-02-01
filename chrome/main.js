function findFirstBookmarkUrl(nodes) {
    for (var i = 0; i < nodes.length; i++) {
        var current = nodes[i];
        if (current.url) {
            return current.url;
        }
        else if (current.children && current.children.length) {
            var deepUrl = findFirstBookmarkUrl(current.children);
            if (deepUrl) {
                return deepUrl;
            }
        }
    }
    return undefined;
}

chrome.runtime.onStartup.addListener(() => {
    chrome.bookmarks.getTree(nodes => {
        var bookmarkUrl = findFirstBookmarkUrl(nodes);
        if (!bookmarkUrl) {
            bookmarkUrl = "about:blank";
        }
        chrome.tabs.update(undefined, {url: bookmarkUrl});
    });
});
