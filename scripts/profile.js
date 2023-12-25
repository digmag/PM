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

function putin(data){
    console.log(data);
    document.querySelector("#emailField").value = data.email;
    document.querySelector("#phoneField").value = data.phone;
    document.querySelector("#Date").value = date_to_normal(data.birthday);
    document.querySelector("#Name").value = data.name;
}

document.querySelector("#Save").addEventListener("click", ()=>{
    
});