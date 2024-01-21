
if(localStorage.token){
    document.querySelector("a.btn.btn-primary").classList.add("d-none");
    document.querySelector(".dropdown").classList.remove("d-none");
    $.ajax({
        url: `https://mis-api.kreosoft.space/api/doctor/profile`,
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        contentType: "application/json",
        success: function(data){
            let name = data.name
            if(name.length>20){
                name = "";
                for (let i =0; i< 20; i++){
                    name += data.name[i];
                }
                name += "...";
            }
            document.querySelector(".dropdown").querySelector("button").textContent = name;
        },
        error: function(t){
            if(t.status == 401){
                alert("Зарегистрируйтесь");
            }
        }
    })
}