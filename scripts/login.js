const email_pattern = RegExp("[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}");
const password_pattern = RegExp("[a-zA-z0-9]{6,}");

document.querySelector("#authClick").addEventListener("click",()=>{
    document.querySelector("#emailField").classList.remove("is-invalid");
    document.querySelector("#passwordField").classList.remove("is-invalid");
    if(email_pattern.test(document.querySelector("#emailField").value) && password_pattern.test(document.querySelector("#passwordField").value)){
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
                localStorage.setItem("token",data.token)
            },
            error: function(error){
                const errors = error.responseJSON.errors;
                if(!error.responseJSON.message){
                    if(errors.Email){
                        document.querySelector("#emailField").classList.add("is-invalid");
                        document.querySelector("#emailField").parentElement.querySelector(".invalid-feedback").textContent = errors.Email[0];
                    }
                    if(errors.Password){
                        document.querySelector("#passwordField").classList.add("is-invalid");
                        document.querySelector("#passwordField").parentElement.querySelector(".invalid-feedback").textContent = errors.Password[0];
                    }
                }
                else{
                    alert("Аккаунта нет в системе");
                }
            }
        });
    }
    else{
        if(!email_pattern.test(document.querySelector("#emailField").value)){
            document.querySelector("#emailField").classList.add("is-invalid");
            document.querySelector("#emailField").parentElement.querySelector(".invalid-feedback").textContent = "Поле должно соответствовать образцу";
        }
        if(!password_pattern.test(document.querySelector("#passwordField").value)){
            document.querySelector("#passwordField").classList.add("is-invalid");
            document.querySelector("#passwordField").parentElement.querySelector(".invalid-feedback").textContent = "Некорректный пароль";
        }
    }
});