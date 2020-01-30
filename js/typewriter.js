
function typewriter(element, callback) {
	nodes = [];
	content = [];
	function recursiveDFS(n) {
		if(n.nodeType==8) return; // HTML comment
		if(n.nodeType==3){ // text node
			content.push(n.textContent);
			n.textContent = "";
		}
		else{
			content.push(n.style.display);
			n.style.display = "none";
		}
		nodes.push(n);
		n.childNodes.forEach(recursiveDFS);
	}
	recursiveDFS(element);

	function timedRestore()
	{
		if(!nodes.length) return;
		if(nodes[0].nodeType != 3){
			nodes.shift().style.display = content.shift();
			return timedRestore();
		}
		if(!content[0].length){
			nodes.shift();
			content.shift();
			return timedRestore();
		}
		nodes[0].textContent += content[0].charAt(0);
		content[0] = content[0].substring(1);
		setTimeout(timedRestore, 10);

	}
	timedRestore();
}
