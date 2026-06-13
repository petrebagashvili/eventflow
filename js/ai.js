function addMessage(text, type){

    const div = document.createElement("div");
    div.className = "msg " + type;
    div.innerText = text;

    const box = document.getElementById("messages");
    box.appendChild(div);

    box.scrollTop = box.scrollHeight;
}


async function getData(){

    const res = await fetch("http://127.0.0.1:5000/ai/data");
    return await res.json();
}


function getDays(date){

    const today = new Date();
    const target = new Date(date);

    return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}


async function askBot(){

    const q = document.getElementById("question").value.toLowerCase();
    const user = localStorage.getItem("userName");

    addMessage("You: " + q, "user");

    const data = await getData();

    if(!data || data.length === 0){
        addMessage("Bot: No travel data available yet.", "bot");
        return;
    }

    const trip = data[data.length - 1];

    let msg = "";


    if(q === "hi" || q === "hello"){

        const daysLeft = getDays(trip.startDate);

        msg =
`👋 Hello ${user}
📍 Trip: ${trip.location}
⏳ Days left: ${daysLeft}
❓ Did anything change? (date / payment / members)`;
    }


    else if(q.includes("where") || q.includes("სად")){
        msg = "📍 We are going to " + trip.location;
    }


    else if(q.includes("when") || q.includes("როდის")){

        const daysLeft = getDays(trip.startDate);

        msg =
`🚌 Departure: ${trip.startDate}
🏁 Return: ${trip.endDate}
⏳ Days left: ${daysLeft}`;
    }


    else if(q.includes("price") || q.includes("cost") || q.includes("ფასი")){

        msg = "💰 Total cost: " + trip.price;
    }


    else if(q.includes("paid") || q.includes("who")){

        msg = "💳 Paid users: " + trip.paidBy.join(", ");
    }


    else{

        const daysLeft = getDays(trip.startDate);

        msg =
`📍 Trip: ${trip.location}
🗓 ${trip.startDate} → ${trip.endDate}
💰 ${trip.price}
⏳ Days left: ${daysLeft}`;
    }


    if(trip.debtors && trip.debtors.includes(user)){
        msg += "\n⚠ You still need to pay your part!";
    }


    addMessage("Bot: " + msg, "bot");

    document.getElementById("question").value = "";
}