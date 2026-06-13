async function send(){

    const data = {
        location: document.getElementById("location").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
        price: document.getElementById("price").value,

        paidBy: document.getElementById("paidBy").value
            .split(",")
            .map(x => x.trim())
            .filter(x => x !== ""),

        debtors: document.getElementById("debtors").value
            .split(",")
            .map(x => x.trim())
            .filter(x => x !== "")
    };

    try {

        const res = await fetch("http://127.0.0.1:5000/admin/add-trip", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        alert("Trip saved ✔");

        console.log(result);

    } catch (err) {

        alert("Error saving data ❌");
        console.error(err);
    }
}


async function updateTrip(){

    const id = document.getElementById("tripId").value;

    const data = {
        location: document.getElementById("location").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,

        paidBy: document.getElementById("paidBy").value
            .split(",")
            .map(x => x.trim())
            .filter(x => x !== ""),

        debtors: document.getElementById("debtors").value
            .split(",")
            .map(x => x.trim())
            .filter(x => x !== "")
    };

    try {

        await fetch(`http://127.0.0.1:5000/admin/update-trip/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        alert("Trip updated ✔");

    } catch (err) {

        alert("Update failed ❌");
        console.error(err);
    }
}