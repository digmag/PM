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
                    <option value = ${element.id}>${date_time(element.date)} ${element.diagnosis.name} ${element.diagnosis.code}</option>
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

//document.querySelector()

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

document.querySelector("#Illness").addEventListener("input", (e)=>{
    console.log(`https://mis-api.kreosoft.space/api/dictionary/icd10?request=${e.target.value}`)
    document.querySelector("#IllnessList").innerHTML = "";
    $.ajax({
        url: `https://mis-api.kreosoft.space/api/dictionary/icd10?request=${e.target.value}`,
        method: "GET",
        contentType: "application/json",
        success: function(data){
            data.records.forEach(elem =>{
                document.querySelector("#IllnessList").innerHTML += `
                <option>${elem.code} - ${elem.name}</option>
                `;
                e.target.setAttribute("diagid", elem.id);
            });
        }
    })
});

document.querySelector("#AddDiagnoses").addEventListener("click", ()=>{
    let clone = document.querySelector("#DiagnosesDiv").cloneNode(true);
    clone.id = document.querySelector("#Illness").getAttribute("diagid");
    clone.classList.remove("d-none");
    clone.querySelector(".h3.container").textContent = document.querySelector("#Illness").value;
    let types = document.querySelector("#Types");
    let type = "";
    types.querySelectorAll("input").forEach(radio =>{
        if(radio.checked){
            type = types.querySelector(`label[for=${radio.id}]`).textContent;
        }
    });
    clone.querySelector("#type").textContent = `Тип в осмотре: ${type}`;
    clone.setAttribute("type", type);
    clone.querySelector("#type").id = "";
    clone.querySelector("#desc").textContent = `Расшифровка: ${document.querySelector("#IllnessDescr").value}`;
    clone.setAttribute("desc", document.querySelector("#IllnessDescr").value);
    clone.querySelector("#desc").id = "";
    if(type != "" && document.querySelector("#IllnessDescr").value != ""){
        document.querySelector("#Diagnoses").appendChild(clone);
    }
    else{
        alert("Все поля в блоке диагноза должны быть заполнены");
    }
});

document.querySelector("#final").addEventListener("change", (e)=>{
    if(e.target.value == "Выздоровел"){
        e.target.parentElement.parentElement.querySelectorAll("div")[1].classList.add("d-none");
    }
    else{
        e.target.parentElement.parentElement.querySelectorAll("div")[1].classList.remove("d-none");
    }
});

function converttype(type){
    switch (type) {
        case "Основной":
            return "Main";
        case "Сопутствующий":
            return "Concomitant";
        default:
            return "Complication";
    }
}

document.querySelector("#CreateInspection").addEventListener("click", ()=>{
    let data = {};
    data.date = `${document.querySelector("#Date").value}T00:00:00.000Z`;
    if(document.querySelector("#NotFirstInspection").checked){
        data.previousInspectionId = document.querySelector("#OtherInspections").options[document.querySelector("#OtherInspections").selectedIndex].id;
    }
    data.anamnesis = document.querySelector("#Anamnesis").value;
    data.complaints = document.querySelector("#Complaint").value;
    let diagnoses_arr = document.querySelector("#Diagnoses").children;
    let datadiag = [];
    let i=0
    for(let div of diagnoses_arr){
        if(!div.classList.contains("d-none")){
            let obj = {
                icdDiagnosisId: div.id,
                description: div.getAttribute("desc"),
                type: converttype(div.getAttribute("type")),
            }
            console.log(obj)
            datadiag[i]=obj;
            i+=1;
        }
    };
    data.diagnoses = datadiag;
    console.log(data)
});