function genderTransform(gender){
    switch (gender) {
        case "Мужской":
            return "Male";    
        default:
            return "Female";
    }
}

document.querySelector("#regClick").addEventListener("click",()=>{
    const name  = document.querySelector("#Name").value;
    const password = document.querySelector("#password").value;
    const email =  document.querySelector("#emailField").value;
    const phone  =document.querySelector("#phoneField").value;
    const id = document.querySelector("#Speciality").sid;
    const email_pattern = RegExp("[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}");
    const password_pattern = RegExp("[a-zA-z0-9]{6,}");
    if(email_pattern.test(email) && password_pattern.test(password)&& id && name != ""){
        let data={};
        data.name = name;
        data.password = password;
        data.email = email;
        data.id = id;
        data.gender = genderTransform(document.querySelector("#Gender").value);
        if(phone){
            data.phone = phone;
        }
        $.ajax({
            method:"POST",
            url: `https://mis-api.kreosoft.space/api/doctor/register`,
            contentType:"application/json",
            dataType:"json",
            data:JSON.stringify(data),
            success: function(data){
                console.log(data)
            },
            error: function(t){

            }
        });
    }
    else{
        if(name != ""){
            document.querySelector("#Name").classList.add("is-invalid");
            document.querySelector("#Name").parentElement.querySelector(".invalid-feedback").textContent = "Имя является обязательным пунктом";
        }
        if(password !=""){
            document.querySelector("#password").classList.add("is-invalid");
            document.querySelector("#password").parentElement.querySelector(".invalid-feedback").textContent = "Пароль не соответствует требованиям(должен быть от 6 символов)";
        }
        if(email !=""){
            document.querySelector("#emailField").classList.add("is-invalid");
            document.querySelector("#emailField").parentElement.querySelector(".invalid-feedback").textContent = "Email не соответствует требованиям";
        }
        if(!id){
            document.querySelector("#Speciality").classList.add("is-invalid");
            document.querySelector("#Speciality").parentElement.querySelector(".invalid-feedback").textContent = "Поле 'Специальность' должно быть одним из предложенных";
        }
    }
});

document.querySelector("#Speciality").addEventListener("input", (e)=>{
    document.querySelector("datalist").innerHTML = "";
    $.ajax({
        method:"GET",
        url: `https://mis-api.kreosoft.space/api/dictionary/speciality?name=${e.target.value}`,
        contentType:"application/json",
        success: function(data){
            putintodatalist(data)
        },
        error: function(t){
            console.log(t);
        }
    });
});

function putintodatalist(data){
    let datalist = document.querySelector("datalist");
    data.specialties.forEach(spec => {
        console.log(spec);
        datalist.innerHTML +=`<option>${spec.name}</option>`;
        document.querySelector("#Speciality").setAttribute("sid", spec.id);
    });
}