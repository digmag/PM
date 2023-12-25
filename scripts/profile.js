window.addEventListener("load", ()=>{
    $.ajax({
        url: `https://mis-api.kreosoft.space/api/doctor/profile`,
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        contentType: "application/json",
        success: function(data){
            putin(data)
        },
        error: function(t){
            console.log(t)
        }
    })
});

function date_to_normal(date){
    return date.split("T")[0];
}

function date_to_unnormal(date){
    return `${date}T00:00:00.000Z`;
}

function genderTransform(gender){
    if(gender == "Мужской"){ return "Male"; }
    return "Female"
}

function putin(data){
    if(data.gender == "Male"){
        document.querySelector("select").selectedIndex = 0;
    }
    else{
        document.querySelector("select").selectedIndex = 1;
    }
    document.querySelector("#emailField").value = data.email;
    document.querySelector("#phoneField").value = data.phone;
    document.querySelector("#Date").value = date_to_normal(data.birthday);
    document.querySelector("#Name").value = data.name;
}

document.querySelector("#Save").addEventListener("click", ()=>{
    const data = {
        "email": document.querySelector("#emailField").value,
        "name": document.querySelector("#Name").value,
        "birthday": date_to_unnormal(document.querySelector("#Date").value),
        "gender": genderTransform(document.querySelector("#Gender").value),
        "phone": document.querySelector("#phoneField").value
    };
    console.log(JSON.stringify(data));
    $.ajax({
        url: `https://mis-api.kreosoft.space/api/doctor/profile`,
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        error: function(t){
            if (t.status == 200){
                alert("Изменено");
            }
        }
    })
});