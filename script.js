function showSignup() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("signupForm").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("signupForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
}

function togglePassword(id){
    const input = document.getElementById(id);

    if(input.type === "password"){
        input.type = "text";
    } else {
        input.type = "password";
    }
}

document.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let msg = document.getElementById("loginMessage");

    if(email === "" || password === ""){
        msg.innerHTML =
        '<p class="error">Please fill all fields.</p>';
        return;
    }

   msg.innerHTML =
    '<p class="success">Login successful!</p>';

    setTimeout(() => {
        window.location.href = "home.html";
    }, 1000);
});

document.getElementById("signupForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value;
    let confirm = document.getElementById("confirmPassword").value;

    let msg = document.getElementById("signupMessage");

    if(name === "" || email === "" ||
       password === "" || confirm === ""){
        msg.innerHTML =
        '<p class="error">Please fill all fields.</p>';
        return;
    }

    if(password.length < 6){
        msg.innerHTML =
        '<p class="error">Password must be at least 6 characters.</p>';
        return;
    }

    if(password !== confirm){
        msg.innerHTML =
        '<p class="error">Passwords do not match.</p>';
        return;
    }

    msg.innerHTML =
    '<p class="success">Account created successfully!</p>';

    setTimeout(() => {
        window.location.href = "home.html";
    }, 1500);

    setTimeout(()=>{
        showLogin();
    },1500);

});