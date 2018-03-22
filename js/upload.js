//uploading functionality

var db = firebase.database();
var storageRef = firebase.storage().ref();

function upload(e) {
	var file = document.getElementById("file").files[0];
	console.log(file);
	var fileRef = storageRef.child(file.name);
	fileRef.put(file).then(function(snapshot){
		console.log('uploaded file');
		// M.toast({html: 'I am a toast!'})
		// document.getElementById('output').innerHTML = "uploaded file";
		fileRef.getDownloadURL().then(function(url){
			var newPostKey = db.ref().child('docs').push().key;
			db.ref('docs/' + newPostKey).set({
				"title" : document.getElementById("title").value,
				"description" : document.getElementById("desc").value,
				"lastUpdated" : firebase.database.ServerValue.TIMESTAMP,
				"filename" : file.name,
				"url" : url,
				"type" : file.type,
				"key" : newPostKey
			})
			document.getElementById("uploadForm").reset();
		})
		Materialize.toast('File uploaded successfully', 5000);
	})
}

submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", upload);