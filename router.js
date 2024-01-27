document.querySelector("head").innerHTML = `<meta charset="UTF-8">`

let route = "/"+window.location.pathname.split("/")[1];

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
    case "/profile":
        $.get("html/profile.html", (data)=>{
            updatepage(data);
            document.querySelector("head").innerHTML+=`
                <title>profile</title>
                `;
        })
        break;
    case `/patient`:
        $.get("html/patient.html", (data)=>{
            updatepage(data);
            document.querySelector("head").innerHTML+=`
                <title>patient</title>
                `;
        })
        break;
    case "/inspection":
        $.get("html/inspection.html", (data)=>{
            updatepage(data);
            document.querySelector("head").innerHTML+=`
                <title>inspection</title>
                `;
        })
        break;
    case "/consultations":
        $.get("html/consultations.html", (data)=>{
            updatepage(data);
            document.querySelector("head").innerHTML+=`
                <title>consultations</title>
                `;
        })
        break;
    case "/calendar":
        $.get("html/consultation_calendar.html", (data)=>{
            updatepage(data);
            document.querySelector("head").innerHTML += `<title>Calendar</title>`;
        });
        break;
    case "/inspectioncreate":
        $.get("html/inspect_create.html", (data)=>{
            updatepage(data);
            document.querySelector("head").innerHTML += `<title>Inspection Create</title>`;
        });
        break;
    default:
        if(localStorage.token){
            window.location.href = "/patients";
        }
        else{
            window.location.href = "/login";
        }
        break;
}

function updatepage(page){
    $("main").html(page);
}