document.querySelector("head").innerHTML = `<meta charset="UTF-8">`;

let route = window.location.pathname;
console.log(route);
switch (route) {
    case "/login":
        $.get("html/login.html", (data)=>{
            updatepage(data);
            document.querySelector("head").innerHTML+=`
            <title>login</title>
            `;
        })
        break;

    default:
        break;
}

function updatepage(page){
    $("main").html(page);
}