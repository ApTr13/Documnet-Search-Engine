//data of existing documents
var db = firebase.database().ref('docs');
var storageRef = firebase.storage().ref();
var dataToShow = [];

var data;
db.on('value', function(snapshot){
	if(snapshot.val()){
		data = Object.values(snapshot.val());
		//Object.keys(data).map(key => data[key]);
		console.log(data);
		Materialize.toast('Data loaded successfully', 5000);
	}
})

function search(){
	dataToShow = [];
	$('#filter').css("display", "none");
	var keyword = searchInput.value;
	if(data == null){
		Materialize.toast('Data not loaded yet. Wait!!!', 5000);
	}
	for(var doc in data){
		// console.log(data[doc])
		if(isPresent(data[doc].title, keyword) || isPresent(data[doc].description, keyword)){
			dataToShow.push(data[doc]);
		}
	}
	showData(dataToShow);
}

function isPresent(string, keyword){
	if(string.toLowerCase().indexOf(keyword.toLowerCase())>=0){
		return true;
	}
	else{
		return false;
	}
}

function filterResults(e){
	var filter = e.target.id;
	if(filter == "all"){
		showData(dataToShow);
		return;
	}
	else if(filter == "wordfile"){
		filter = "wordprocessing";
	}
	else if(filter == "ppt"){
		filter = "powerpoint";
	}
	console.log(filter);
	var filtereddataToShow = dataToShow.filter(function(res){
		return isPresent(res.type, filter);
	});
	showData(filtereddataToShow);
}

function showData(dataToShow){
	resultsDiv.innerHTML = '';
	if(!dataToShow.length){
		resultsDiv.innerHTML = 'No results found';
	}

	for(var result in dataToShow){
		$('#filter').css("display", "inline-flex");
		var childDiv = document.createElement("div");
		childDiv.innerHTML = `
			<div class="row" id="${dataToShow[result].key}">
		        <div class="col s12 m12">
		          <div class="card  cyan darken-2">
		            <div class="card-content white-text">
		              <span class="card-title">${dataToShow[result].title}</span>
		              <p>${dataToShow[result].description}</p>
		            </div>
		            <div class="card-action indigo darken-1">
		              <a href="${dataToShow[result].url}">Download</a>
		              <a style="cursor:pointer" onclick="deleteFile('${dataToShow[result].filename}', '${dataToShow[result].key}')">Delete</a>
		              <a href="html/update.html?key=${dataToShow[result].key}" >Update</a>
		            </div>
		          </div>
		        </div>
		     </div>
		`
		resultsDiv.appendChild(childDiv);
	}
}

function deleteFile(filename, key){
	var divToDelete = document.getElementById(key);
	console.log(divToDelete)
	divToDelete.style.display = "none";
	var desertRef = storageRef.child(filename);
	desertRef.delete().then(function() {
	  // File deleted successfully
	  console.log("deleted successfully");
	  Materialize.toast('Deleted successfully', 5000);
	}).catch(function(error) {
	  // Uh-oh, an error occurred!
	  console.log(error);
	});

	db.child(key).remove();
}

var resultsDiv = document.getElementById("resultsDiv");
var searchInput = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn");
var radioBtns = document.querySelectorAll(".with-gap");

searchBtn.addEventListener("click", search);
[...radioBtns].forEach(radioBtns => radioBtns.addEventListener('click', filterResults));
