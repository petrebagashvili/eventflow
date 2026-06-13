const API_URL = "http://127.0.0.1:5000";

async function signup(){

    const name =
        document.getElementById("signupName").value;

    const email =
        document.getElementById("signupEmail").value;

    const age =
        parseInt(
            document.getElementById("signupAge").value
        );

    const password =
        document.getElementById("signupPassword").value;

    const role =
        document.getElementById("signupRole").value;

    let group = "";

    if(age <= 30){
        group = "Young Group";
    }
    else if(age <= 50){
        group = "Adult Group";
    }
    else{
        group = "Senior Group";
    }

    const response = await fetch(
        API_URL + "/signup",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                age,
                password,
                role,
                group
            })
        }
    );

    const data = await response.json();

    document.getElementById("msg").innerHTML =
        data.message;
}

async function login(){

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    const response = await fetch(
        API_URL + "/login",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.json();

    if(response.ok){

        localStorage.setItem(
            "userName",
            data.name
        );

        localStorage.setItem(
            "userEmail",
            data.email
        );

        localStorage.setItem(
            "userRole",
            data.role
        );

        localStorage.setItem(
            "userGroup",
            data.group
        );

        window.location.href =
            "home.html";

    }else{

        document.getElementById("msg")
        .innerHTML =
        "Invalid Email or Password";
    }
}
if(!localStorage.getItem("userEmail")){
    window.location.href =
    "index.html";
}


const userName =
localStorage.getItem("userName") || "Guest";

const userEmail =
localStorage.getItem("userEmail") || "-";

const userAge =
localStorage.getItem("userAge") || "-";

const userGroup =
localStorage.getItem("userGroup") || "-";

const userRole =
localStorage.getItem("userRole") || "member";


document.getElementById("welcome")
.innerText =
"Welcome, " + userName;


document.getElementById("profileName")
.innerText =
userName;

document.getElementById("profileEmail")
.innerText =
userEmail;

document.getElementById("profileAge")
.innerText =
userAge;

document.getElementById("profileGroup")
.innerText =
userGroup;

document.getElementById("profileRole")
.innerText =
userRole;


const image =
localStorage.getItem("profileImage");

if(image){

    document.getElementById(
        "profileImage"
    ).src = image;
}


if(userRole === "admin"){

    document.getElementById(
        "adminMenu"
    ).innerHTML = `

        <a
        class="admin-link"
        href="booking.html">

        Booking Hotels

        </a>

        <a
        class="admin-link"
        href="cottages.html">

        Booking Cottages

        </a>

        <a
        class="admin-link"
        href="admin.html">

        Admin Panel

        </a>

    `;
}


function logout(){

    localStorage.clear();

    window.location.href =
    "index.html";
}
