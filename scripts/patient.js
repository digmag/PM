window.addEventListener("load",()=>{
    $.ajax({
        url: `https://mis-api.kreosoft.space/api/patient/${localStorage.getItem("patientid")}`,
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        contentType: "application/json",
        success: function(data){
            putin(data);
        }
    })
});

function putin(data){
    console.log(data)
    if(data.gender == "Male"){
        document.querySelector("#name").textContent = `${data.name} ♂️`;
    }
    else{
        document.querySelector("#name").textContent = `${data.name} ♀️`;
    }
    document.querySelector("#date").textContent = `Дата рождения: ${dateconv(data.birthday)}`;
}

function dateconv(date){
    return `${date.split("T")[0].split("-")[2]}.${date.split("T")[0].split("-")[1]}.${date.split("T")[0].split("-")[0]}`;
}