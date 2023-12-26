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
    }
    else{
        document.querySelector("#OtherInspections").classList.add("d-none");
        document.querySelector("#OtherInspections").innerHTML = "";
    }
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
});