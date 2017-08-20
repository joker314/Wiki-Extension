// Background script

chrome.contextMenus.removeAll(function(){
	chrome.contextMenus.create({
		title: "Cite '%s' on the Wiki (copy)",
		contexts: ["selection"],
		onclick: function(info, tab){
			chrome.tabs.sendMessage(tab.id, info.selectionText);
		}
	});
	chrome.contextMenus.create({
		title: "Cite this comment on the Wiki (copy)",
		onclick: function(info, tab){
			chrome.tabs.sendMessage(tab.id, "")
		}
	});
});