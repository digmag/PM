window.addEventListener("load",()=>{
    $.ajax({
        url: `https://mis-api.kreosoft.space/api/consultation?grouped=false&page=1&size=100`,
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        contentType: "application/json",
        success: function(data){
            let calendarEl = document.querySelector('#calendar');
            let calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'listWeek',
                headerToolbar: {
                    left: 'CustomPrevButton,CustomNextButton Today',
                    center: 'title',
                    right: 'Week,Day'
                },
                customButtons:{
                    CustomPrevButton: {
                        text: 'Предыдущий',
                        click: function() {
                            calendar.prev();
                            render();
                        }
                    },
                    CustomNextButton: {
                        text: 'Следующий',
                        click: function() {
                            calendar.next();
                            render();
                        }
                    },
                    Today:{
                        text: 'Сегодня',
                        click: function() {
                            calendar.today();
                            render();
                        }
                    },
                    Week:{
                        text: 'Неделя',
                        click: function() {
                            calendar.changeView("listWeek");
                            render();
                        }
                    },
                    Day:{
                        text: 'День',
                        click: function() {
                            calendar.changeView("listDay");
                            render();
                        }
                    }
                },
                eventClick: function(info) {
                    if(info.event.id){
                        window.location.pathname = "/inspection";
                        localStorage.setItem("inspectid",info.event.id)
                    }
                }
            });
            let consultations = data.inspections;
            consultations.forEach(consultation => {
                fetch(`https://mis-api.kreosoft.space/api/inspection/${consultation.id}`,{
                    method: 'GET',
                    headers: {
                        'ContentType': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then(response => {
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if(data.nextVisitDate){
                        let obj = {
                            title: `Пациент: ${data.patient.name}. Следующий осмотр`,
                            start: data.nextVisitDate,
                            allDay: false,
                            classNames: ["table-warning"]
                        };
                        calendar.addEvent(obj);
                    }
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
                let obj = {
                    title: `Пациент: ${consultation.patient}. Диагноз: ${consultation.diagnosis.name}`,
                    id: consultation.id,
                    start: consultation.date,
                    allDay: false,
                    classNames: ["table-success"]
                };
                calendar.addEvent(obj);
            });
            calendar.render();
            
            let buttons = ["CustomPrevButton", "CustomNextButton", "Today", "Week", "Day"];
            buttons.forEach(button => {
                document.querySelector("#calendar").querySelector(`.fc-${button}-button`).classList.add("btn","btn-primary","m-1");
            });
            render();
        },
    })
})
function render(){
    document.querySelector("#calendar").querySelector("h2").classList.add("m-1");
    if(document.querySelector("#calendar").querySelector("table"))
        document.querySelector("#calendar").querySelector("table").classList.add("m-1","table");
    if(document.querySelector("#calendar").querySelectorAll(".fc-list-day")){
        document.querySelector("#calendar").querySelectorAll(".fc-list-day").forEach(row =>{
            row.classList.add("table-primary");
        });
    }
}