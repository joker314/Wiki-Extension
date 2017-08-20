// Content script

let rightClickedElement = null; // No element has been right-clicked yet.
document.addEventListener("contextmenu", function(e){
	rightClickedElement = e.path[0];
});

chrome.runtime.onMessage.addListener(function(selection, sender, reply){
	if(rightClickedElement){
		if(rightClickedElement.className === "content") { // It appears we are within a comment
			if(!selection) selection = rightClickedElement.innerText;
			let copyArea = document.createElement("textarea");
			let user = rightClickedElement.parentElement.getElementsByClassName("name")[0].children[0].innerText;
			let date = new Date(rightClickedElement.nextElementSibling.getElementsByClassName("time")[0].title);
			let url = location.protocol + "// " + location.hostname + location.pathname + "#" + rightClickedElement.parentElement.parentElement.id;
			copyArea.value = `${user} (${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}) "${selection}" ${url}`;
			rightClickedElement.appendChild(copyArea);
			copyArea.focus();
			copyArea.select();
			document.execCommand("copy"); // Perform the copy
			copyArea.remove();
		}
	}
});