window.addEventListener("load", ()=>{
    $.ajax({
        method: "GET",
        url: `https://mis-api.kreosoft.space/api/patient`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        success: function(data){
            console.log(data);
            data.patients.forEach(patient => {
                const clone = document.querySelector("#patient").cloneNode(true);
                clone.classList.remove("d-none");
                clone.id = patient.id;
                clone.querySelector("#name").textContent = patient.name;
                clone.querySelector("#name").id = "";
                clone.querySelector("#gender").textContent += patient.gender;
                clone.querySelector("#gender").id = "";
                clone.querySelector("#birthday").textContent = patient.birthday;
                clone.querySelector("#birthday").id = "";
                document.querySelector("#patients").appendChild(clone);
            });
        }
    })
});