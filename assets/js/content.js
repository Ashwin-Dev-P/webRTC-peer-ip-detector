function enable() {
	var s = document.createElement("script");
	s.src = chrome.runtime.getURL("/assets/js/script.js");
	s.onload = function () {
		this.remove();
	};
	(document.head || document.documentElement).appendChild(s);
}

//the enable function enables the script.js file to work inside the website since content.js runs in a seperate environment.
enable();
