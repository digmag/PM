document.querySelector("#authClick").addEventListener("click",()=>{
    document.querySelector("#emailField").classList.remove("is-invalid");
    document.querySelector("#passwordField").classList.remove("is-invalid");
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
            console.log(error);
            console.log(errors);
            if(errors.Email){
                document.querySelector("#emailField").classList.add("is-invalid");
                document.querySelector("#emailField").parentElement.querySelector(".invalid-feedback").textContent = errors.Email[0];
            }
            if(errors.Password){
                document.querySelector("#passwordField").classList.add("is-invalid");
                document.querySelector("#passwordField").parentElement.querySelector(".invalid-feedback").textContent = errors.Password[0];
            }
        }
    });
});