document.querySelector("head").innerHTML = `<meta charset="UTF-8">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>`;

let route = window.location.pathname;
let newroute ="";
let parceroute = route.split("/");
if(parceroute[1] == "patient" || parceroute[1] == "inspection"){
    for(let i =0; i<parceroute.length-1;i++){
        newroute+=`/${parceroute[i]}`;
    }
    route = newroute;
}
console.log(route);
switch (route) {
    case "/login":
        $.get("html/login.html", (data)=>{
            updatepage(data);
            document.querySelector("head").innerHTML+=`
            <title>login</title>
            `;
        });
        break;
    case "/registration":
        $.get("html/registration.html",(data)=>{
            updatepage(data);
            document.querySelector("head").innerHTML+=`
            <title>registration</title>
            `;
        });
        break;
    case "/patients":
        $.get("html/patients.html", (data)=>{
            updatepage(data);
            document.querySelector("head").innerHTML+=`
            <title>patients</title>
            `;
        })
        break;
    default:
        break;
}

function updatepage(page){
    $("main").html(page);
}