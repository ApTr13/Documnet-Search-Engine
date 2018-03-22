//uploading functionality

var db = firebase.database();
var storageRef = firebase.storage().ref();

var urlParams = [];
window.location.search.replace("?", "").split("&").forEach(function (e, i) {
    var p = e.split("=");
    urlParams[p[0]] = p[1];
});

// We have all the params now -> you can access it by name
var key = urlParams["key"];

function update() {
	var updateRef = db.ref().child('/docs/' + key);
	console.log(updateRef);

	updateRef.update({ title: document.getElementById("title").value, description: document.getElementById("desc").value });
}

submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", update);