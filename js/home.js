if (document.getElementById("profileEmail")) {

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

function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}