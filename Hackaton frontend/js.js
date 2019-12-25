var firstThumbnails;
var secondThumbnails;
var thirdThumbnails;
var fourthThumbnails;

window.onload = async function(){
	var x = document.getElementById("videoPlayer");
	x.style.display = "none";
	const response = await fetch('http://localhost:8000/api?type=thumbnail$');
	const responseJson = await response.json();
	firstThumbnails = responseJson.first.replace("[", "").replace("]", "").split(",");
	secondThumbnails = responseJson.second.replace("[", "").replace("]", "").split(",");
	thirdThumbnails = responseJson.third.replace("[", "").replace("]", "").split(",");
	fourthThumbnails = responseJson.fourth.replace("[", "").replace("]", "").split(",");
	
	this.loopThumbnails();
	};
	
async function loopThumbnails() {	
		for (var i = 0; i < 4; i++) {
		document.getElementById("imageOne").src = "file:///" + firstThumbnails[i].trim();
		document.getElementById("imageTwo").src = "file:///" + secondThumbnails[i].trim();
		document.getElementById("imageThree").src = "file:///" + thirdThumbnails[i].trim();
		document.getElementById("imageFour").src = "file:///" + fourthThumbnails[i].trim();
		await sleep(1000);
		}
		chooseVideo(Math.floor((Math.random() * 4) + 1));
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function chooseVideo(param) {
	var mySubString;
	if (param == 1) {
	mySubString = firstThumbnails[0].substring(
    firstThumbnails[0].lastIndexOf("/") + 1, 
    firstThumbnails[0].lastIndexOf("_")
	);
	} else if( param == 2) {
	mySubString = secondThumbnails[0].substring(
    secondThumbnails[0].lastIndexOf("/") + 1, 
    secondThumbnails[0].lastIndexOf("_")
	);
	} else if( param == 3) {
			mySubString = thirdThumbnails[0].substring(
    thirdThumbnails[0].lastIndexOf("/") + 1, 
    thirdThumbnails[0].lastIndexOf("_")
	);
	} else if( param == 4) {
	mySubString = fourthThumbnails[0].substring(
    fourthThumbnails[0].lastIndexOf("/") + 1, 
    fourthThumbnails[0].lastIndexOf("_")
	);
	}
	
	const responseTwo = await fetch('http://localhost:8000/api?type=add$&name=' + mySubString + "$");
	const responseJsonTwo = await responseTwo.json();
	
	this.removeThumbnails();
	this.playVideo(responseJsonTwo.url);
	
}

function removeThumbnails() {
	loop = false;
	
		document.getElementById("imageOne").remove()
		document.getElementById("imageTwo").remove()
		document.getElementById("imageThree").remove()
		document.getElementById("imageFour").remove()
}

function playVideo(url) {
	var url = url.replace("\\", "/");
	var y = document.getElementById("videoPlayer");
	y.src = "file:///" + url;
	y.style.display = "block"; 
	y.autoplay = true;
	y.load();
}