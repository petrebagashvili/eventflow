const links = document.querySelectorAll("nav a");

links.forEach(link => {
    if (link.href.includes("about.html")) {
        link.style.fontWeight = "bold";
        link.style.color = "#ffe600";
    }
});


const container = document.querySelector(".about-container");

if(container){
    container.style.opacity = "0";
    container.style.transform = "translateY(20px)";
    container.style.transition = "0.8s ease";

    window.addEventListener("load", () => {
        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
    });
}


console.log("Welcome to EventTech About Page 🚀");