document.querySelectorAll("nav a").forEach(a => {
    if (a.href.includes("contact.html")) {
        a.style.color = "#ffe600";
        a.style.fontWeight = "bold";
    }
});


window.addEventListener("load", () => {

    const card = document.querySelector(".card");

    if(card){
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "0.8s ease";

        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 100);
    }
});


document.querySelectorAll(".item").forEach(item => {

    item.addEventListener("click", () => {

        const text = item.innerText;

        navigator.clipboard.writeText(text.split("\n")[1] || text);

        showToast("Copied to clipboard!");
    });

});


function showToast(message){

    let toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";

    toast.style.background = "#111";
    toast.style.color = "white";
    toast.style.padding = "10px 15px";
    toast.style.borderRadius = "10px";

    toast.style.fontSize = "14px";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}