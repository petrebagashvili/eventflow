function joinGroup(index){

    let group = groups[index];

    if(group.members.length >= 20){
        alert("Group is full!");
        return;
    }

    if(!isAllowed(group.type)){
        alert("Your age does not match this group!");
        return;
    }

    group.members.push(user.name);
    save();
    renderGroups();
}

function leaveGroup(index){

    let group = groups[index];

    group.members = group.members.filter(m => m !== user.name);

    save();
    renderGroups();
}

function isAllowed(type){

    if(type === "family") return true;

    if(type === "under30") return user.age < 30;

    if(type === "30to50") return user.age >= 30 && user.age <= 50;

    if(type === "50plus") return user.age > 50;

    return false;
}

function createGroup(){

    if(user.role !== "admin"){
        alert("Only admin can create groups!");
        return;
    }

    const name = document.getElementById("groupName").value;
    const type = document.getElementById("groupAge").value;

    if(!name || !type) return;

    groups.push({
        name,
        type,
        members:[]
    });

    save();
    renderGroups();
}

if(user.role !== "admin"){
    document.getElementById("adminPanel").style.display = "none";
}

renderGroups();