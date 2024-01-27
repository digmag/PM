$.ajax({
    url: `https://mis-api.kreosoft.space/api/inspection/${localStorage.getItem("inspectid")}`,
    method: "GET",
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    contentType: "application/json",
    success: function (data){
        let patient = data.patient;
        let doctor = data.doctor;
        document.querySelector("#Name").textContent = patient.name
        document.querySelector("#Date").textContent += normalize(data.date);
        document.querySelector("#Doctor").textContent += doctor.name;
        document.querySelector("#Complaint").textContent = data.complaints;
        document.querySelector("#Anamnesis").textContent = data.anamnesis;
        data.diagnoses.forEach(diagnos => {
            const clone = document.querySelector("#DiagnosesDiv");
            clone.id = "";
            clone.querySelector("#type").textContent = diagnos.type;
            clone.querySelector("#type").id ="";
            clone.querySelector("#desc").textContent = diagnos.description;
            clone.querySelector("#desc").id ="";
            clone.querySelector(".h3").textContent = `${diagnos.code} - ${diagnos.name}`;
            clone.classList.remove("d-none");
            document.querySelector("#Diagnoses").appendChild(clone);
        });
        document.querySelector("#Recomendations").textContent = data.treatment;
        switch (data.conclusion){
            case "Recovery":
                document.querySelector("#final").textContent = "Выздоровел";
                break;
            case "Disease":
                document.querySelector("#final").textContent = "Болен";
                document.querySelector("#finaldate").textContent = `Дата следующего осмотра - ${normalize(data.nextVisitDate)}`;
                break;
            case "Death":
                document.querySelector("#final").textContent = "Умер";
                document.querySelector("#finaldate").textContent = `Дата смерти - ${normalize(data.deathDate)}`;
        }
    },
    error: function(t){

    }
});

function normalize(date){
    if(date){
        let date1 = date.split("T")[0];
        return `${date1.split("-")[2]}.${date1.split("-")[1]}.${date1.split("-")[0]}`
    }
    else{
        return "";
    }
}