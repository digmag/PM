document.querySelector("#authClick").addEventListener("click",()=>{
    $.ajax({
        url: `https://mis-api.kreosoft.space/api/doctor/login`,
        contentType: "application/json",
        method:"POST",
        dataType:"json",
        data: JSON.stringify({
            "email": document.querySelector("#emailField").value,
            "password":document.querySelector("#passwordField").value
        }),
        success: function(data){
            console.log(data)
        },
        error: function(error){
            const errors = error.responseJSON.errors;
            document.querySelector("#emailField").value = "";
            console.log(errors);
            document.querySelector("#emailField").placeholder = errors.Email[1];
        }
    });
});