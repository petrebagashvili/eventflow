console.log("EventHub Loaded");

function addAnnouncement(text){

const div = document.createElement("div");

div.classList.add("announcement");

div.innerText = text;

document.querySelector(".announcements")
.appendChild(div);

}

setTimeout(()=>{

addAnnouncement(
"Project Submission closes at 18:00"
);

},3000);