/*
   Copyright 2017 jokebookservice1

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

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
			let url = location.protocol + "//" + location.hostname + location.pathname + "#" + rightClickedElement.parentElement.parentElement.id;
			copyArea.value = `${user} (${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}) "${selection}" ${url}`;
			rightClickedElement.appendChild(copyArea);
			copyArea.focus();
			copyArea.select();
			document.execCommand("copy"); // Perform the copy
			copyArea.remove();
		}
	}
});