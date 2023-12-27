window.addEventListener("load", ()=>{
    const id = localStorage.getItem("patientid");
    $.ajax({
        url: `https://mis-api.kreosoft.space/api/patient/${id}`,
        method: "GET",
        contentType: "application/json",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        success: function(data){
            put_in(data);
        },
        error: function(t){
            console.log(t)
        }
    });
});

function put_in(data){
    console.log(data);
    if(data.gender == "Male"){
        document.querySelector("#Name").textContent = `${data.name} ♂️`;
    }
    else{
        document.querySelector("#Name").textContent = `${data.name} ♀️`;
    }
    document.querySelector("#BDate").textContent = `Дата рождения: ${date_to_normal(data.birthday)}`;
}

function date_to_normal(date){
    return date.split("T")[0]
}

function date_time(date){
    let date_time = date.split("T");
    return `${date_time[0]} ${date_time[1].split(".")[0]}`;
}

document.querySelector("#NotFirstInspection").addEventListener("change", (e)=>{
    if(e.target.checked){
        document.querySelector("#OtherInspections").classList.remove("d-none");
        $.ajax({
            url: `https://mis-api.kreosoft.space/api/patient/${localStorage.getItem("patientid")}/inspections/search`,
            method: "GET",
            contentType:"application/json",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            success: function(data){
                console.log(data)
                data.forEach(element => {
                    document.querySelector("#OtherInspections").innerHTML +=`
                    <option>${date_time(element.date)} ${element.diagnosis.name} ${element.diagnosis.code}</option>
                    `;
                });
            }
        });
    }
    else{
        document.querySelector("#OtherInspections").classList.add("d-none");
        document.querySelector("#OtherInspections").innerHTML = "";
    }
});

document.querySelector("#NeedConsultation").addEventListener("change", (e)=>{
    if(e.target.checked){
        document.querySelector("#Spetiality").readOnly = false;
        document.querySelector("#Comment").readOnly = false;
        document.querySelector("#AddConsultation").disabled = false;
    }
    else{
        document.querySelector("#Spetiality").readOnly = true;
        document.querySelector("#Comment").readOnly = true;
        document.querySelector("#AddConsultation").disabled = true;
        document.querySelector("#Spetiality").value = "";
        document.querySelector("#Comment").value = "";
    }
});

document.querySelector("#Spetiality").addEventListener("input",(e)=>{
    document.querySelector("#dataspet").innerHTML = "";
    if(e.target.value =="" && e.target.getAttribute("sid")){
        e.target.removeAttribute("sid");
    }
    else{
        $.ajax({
            url:`https://mis-api.kreosoft.space/api/dictionary/speciality?name=${e.target.value}&size=100`,
            method: "GET",
            contentType: "application/json",
            success:function (data){
                data.specialties.forEach(elem =>{
                    document.querySelector("#dataspet").innerHTML +=`
                    <option>${elem.name}</oprion>
                    `;
                    e.target.setAttribute("sid", elem.id)
                });
            }
        });
    }
});

document.querySelector("#AddConsultation").addEventListener("click", ()=>{
    let clone = document.querySelector("#consultationDiv").cloneNode(true);
    clone.querySelector("#com").textContent = document.querySelector("#Comment").value;
    clone.querySelector("#spec").textContent = document.querySelector("#Spetiality").value;
    clone.id = "";
    clone.querySelector("#com").id = "";
    clone.querySelector("#spec").id = "";
    clone.classList.remove("d-none");
    document.querySelector("#Consultations").appendChild(clone);
});

