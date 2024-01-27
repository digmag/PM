window.addEventListener("load", ()=>{
    const search = new URLSearchParams(window.location.search);
    let page = search.get("page");
    if(!page){
        page = 1;
    }
    $.ajax({
        method: "GET",
        url: `https://mis-api.kreosoft.space/api/patient?page=${page}`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        success: function(data){
            putPatient(data);
        },
        error: function(t){
            alert("Войдите");
            window.location.pathname = "/login";
        }
    })
});

function putPatient(data){
    data.patients.forEach(patient => {
        const clone = document.querySelector("#patient").cloneNode(true);
        clone.classList.remove("d-none");
        clone.id = patient.id;
        clone.querySelector("#name").textContent = patient.name;
        clone.querySelector("#name").id = "";
        if(patient.gender == "Male"){
            clone.querySelector("#gender").textContent += " Мужской";
        }
        else{
            clone.querySelector("#gender").textContent += " Женский";
        }
        clone.querySelector("#gender").id = "";
        if(patient.birthday){
            clone.querySelector("#birthday").textContent += " "+ dateconv(patient.birthday);
        }
        else{
            clone.querySelector("#birthday").textContent += " Не указана";
        }
        clone.querySelector("#birthday").id = "";

        let text = createtext(clone);
        if(localStorage.getItem("Voice_need")=="true"){
            let speechSynthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            let defaultVoice

            speechSynthesis.onvoiceschanged = () => {
                voices = speechSynthesis.getVoices()
                defaultVoice = voices.find((voice) => voice.name === 'Google русский')
            }
            utterance.voice = defaultVoice;
            utterance.lang = 'ru-RU';
            utterance.rate = 0.8;
            clone.addEventListener("mouseenter",(e)=>{
                speechSynthesis.speak(utterance);
            });
            clone.addEventListener("mouseleave",(e)=>{
                speechSynthesis.cancel();
            })
        }
        clone.addEventListener("click",(e)=>{
            localStorage.setItem("patientid", e.target.parentElement.id);
            window.location.href = "/patient"
        });
        document.querySelector("#patients").appendChild(clone);
    });
    createpagination(data.pagination);
}
function createtext(e){
    let text = "Пациент "
    e.querySelectorAll("div").forEach(element => {
        text+= `${element.textContent} `;
    });
    return text;
}

function dateconv(date){
    return `${date.split("T")[0].split("-")[2]}.${date.split("T")[0].split("-")[1]}.${date.split("T")[0].split("-")[0]}`;
}

function createpagination(pagination){
    const parent = document.querySelector("#paginationBar");
    if(pagination.current>1){
        parent.appendChild(create_pageitem(pagination.current-1));
    }
    parent.appendChild(create_pageitem(1));
    parent.appendChild(create_pageitem(pagination.count));
    if(pagination.current<pagination.count){
        parent.appendChild(create_pageitem(pagination.current+1));
    }
}

function create_pageitem(page){
    const li = document.createElement("li");
    li.classList.add("page-item");
    li.innerHTML = `<a class="page-link" href = "?page=${page}">${page}</a>`;
    return li;
}