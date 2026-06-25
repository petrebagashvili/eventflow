const API_URL = "http://127.0.0.1:5000";

const currentPage = window.location.pathname.split("/").pop();
const isLoggedIn = localStorage.getItem("userEmail");

if (!isLoggedIn && currentPage === "home.html") {
    window.location.href = "index.html";
}

async function signup(){
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const age = parseInt(document.getElementById("signupAge").value);
    const password = document.getElementById("signupPassword").value;
    const role = document.getElementById("signupRole").value;

    let group = "";
    if(age <= 30){ group = "Young Group"; }
    else if(age <= 50){ group = "Adult Group"; }
    else { group = "Senior Group"; }

    const response = await fetch(API_URL + "/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, age, password, role, group })
    });

    const data = await response.json();
    
    if(document.getElementById("msg")) {
        document.getElementById("msg").innerHTML = data.message;
    }
}


async function login(){
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if(response.ok){
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userAge", data.age); // Saves age to storage
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userGroup", data.group);

        window.location.href = "home.html";
    } else {
        if(document.getElementById("msg")) {
            document.getElementById("msg").innerHTML = "Invalid Email or Password";
        }
    }
}

if (document.getElementById("profileName")) {

    const userName = localStorage.getItem("userName") || "Guest";
    const userEmail = localStorage.getItem("userEmail") || "-";
    const userAge = localStorage.getItem("userAge") || "-";
    const userGroup = localStorage.getItem("userGroup") || "-";
    const userRole = localStorage.getItem("userRole") || "member";

    if(document.getElementById("welcome")) {
        document.getElementById("welcome").innerText = "Welcome, " + userName;
    }
    
    document.getElementById("profileName").innerText = userName;
    document.getElementById("profileEmail").innerText = userEmail;
    document.getElementById("profileAge").innerText = userAge;
    document.getElementById("profileGroup").innerText = userGroup;
    document.getElementById("profileRole").innerText = userRole;

    const image = localStorage.getItem("profileImage");
    if(image && document.getElementById("profileImage")){
        document.getElementById("profileImage").src = image;
    }

    if(userRole === "admin" && document.getElementById("adminMenu")){
        document.getElementById("adminMenu").innerHTML = `
            <a class="admin-link" href="booking.html">Booking Hotels</a>
            <a class="admin-link" href="cottages.html">Booking Cottages</a>
            <a class="admin-link" href="admin.html">Admin Panel</a>
        `;
    }
}
