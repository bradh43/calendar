let calendar;
const VIEW_STYLE = ["day","week","month"];
const MONTH_NAME = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let day_name = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
let DATE_REGEX = "^(\\d+)[-]0?(\\d+)[-]0?(\\d+)$";
let back_flag = false;
let back_index = 2;
let calendar_attribute;
let csrf_token = null;
let edit_event = false;

window.onload = function () {
    //add action listeners   
    document.getElementById("today-button").addEventListener('click', function () {
        let view_style = calendar.getSetting().getViewStyle();
        if(view_style==0){
            calendar.currentDay();
        } else if(view_style==1){
            calendar.currentWeek();
        } else {
            calendar.currentMonth();
        }
        calendar_attribute = getCalendarAttribute();
        loadCalendarData(); 
    });
    document.getElementById("previous-button").addEventListener('click', function () {
        let view_style = calendar.getSetting().getViewStyle();
        if(view_style==0){
            calendar.previousDay();
        } else if(view_style==1){
            calendar.previousWeek();
        } else {
            calendar.previousMonth();
        }
        //turn off animation
        // calendar_attribute = getCalendarAttribute()+" slide-right";
        calendar_attribute = getCalendarAttribute();

        loadCalendarData(); 
        
    });
    document.getElementById("next-button").addEventListener('click', function () {
        let view_style = calendar.getSetting().getViewStyle();
        if(view_style==0){
            calendar.nextDay();
        } else if(view_style==1){            
            calendar.nextWeek();
        } else {
            calendar.nextMonth();            
        }
        //turn off animation
        // calendar_attribute = getCalendarAttribute()+" slide-left";
        calendar_attribute = getCalendarAttribute();

        
        loadCalendarData(); 
      
    });
    document.getElementById("sign-out").addEventListener('click', function () {

        console.log("Sign out");
        const logout_path = 'logout.php';
        fetch(logout_path, {
            method: "POST",
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(response => {
            setTimeout("location.reload(true);",250);
        })
        .catch(error => console.error('Error:',error))
        
        
    });

    document.getElementById("view-select").addEventListener('change', function () {
        let view_index = parseInt(document.getElementById("view-select").value);
        document.getElementById("setting-view-select").value = view_index;
        calendar_attribute = getCalendarAttribute();
        calendar.getSetting().setViewStyle(view_index);
        //update the tool tip text
        document.getElementById("previous-tooltip").innerHTML = "Previous " + VIEW_STYLE[view_index];
        document.getElementById("next-tooltip").innerHTML = "Next " + VIEW_STYLE[view_index];
        updateCalendarDisplay(); 
    });
    
    document.getElementById("setting-view-select").addEventListener('change', function () {
        let view_index = parseInt(document.getElementById("setting-view-select").value);
        document.getElementById("view-select").value = view_index;
        calendar_attribute = getCalendarAttribute();
        calendar.getSetting().setViewStyle(view_index);
        //update the tool tip text
        document.getElementById("previous-tooltip").innerHTML = "Previous " + VIEW_STYLE[view_index];
        document.getElementById("next-tooltip").innerHTML = "Next " + VIEW_STYLE[view_index];
        updateCalendarDisplay();
    });
   
    document.getElementById("setting-start-day-select").addEventListener('change', function () {
        let start_day_index = parseInt(document.getElementById("setting-start-day-select").value);
        calendar.getSetting().setWeekStartDay(start_day_index);

        calendar.adjustIndex();

        calendar_attribute = getCalendarAttribute();
        updateCalendarDisplay();
    });

    document.getElementById("setting-time-format-select").addEventListener('change', function () {
        let time_format_index = parseInt(document.getElementById("setting-time-format-select").value);
        calendar.getSetting().setTimeFormat(time_format_index);

        calendar_attribute = getCalendarAttribute();
        updateCalendarDisplay();
    });


    document.getElementById("setting-button").addEventListener('click', function () {
        document.getElementById("setting-modal").style.display = "block";

    });

    //get all the modals
    let modal_list = document.getElementsByClassName("modal");
    let close_modal_list = document.getElementsByClassName("close-modal");
    for(let i=0; i<close_modal_list.length; i++){
        close_modal_list[i].addEventListener('click', function () {
            edit_event = false;
            modal_list[i].style.display = "none";
            calendar_attribute = getCalendarAttribute();
            updateCalendarDisplay();
            //clear the edit modal
            clearEditEventModal();
            //clear the view modal
            clearViewEventModal();
        });
    }

    //action listener to exit modal if the background is clicked
    window.addEventListener('click', function (event) {
        
        for(let i=0; i<modal_list.length; i++){
            if(event.target == modal_list[i]){
                edit_event = false;
                modal_list[i].style.display = "none";
                calendar_attribute = getCalendarAttribute();
                updateCalendarDisplay();
                //clear the edit modal
                clearEditEventModal();
                //clear the view modal
                clearViewEventModal();
            }
        }
        
    });

    //add a listener to the edit event save button
    document.getElementById("edit-event-save-button").addEventListener('click', function (event) {

        //load in data to be saved
        let title = document.getElementById("edit-event-title").value;
        if(title == ""){
            title = "Untitled Event";
        }
        let date_key = document.getElementById("edit-event-date").value;
        let time = document.getElementById("edit-event-time").value;
        let location = document.getElementById("edit-event-location").value;
       
        


        // Make a json object for the infomation passed
        let info = { 'title': title, 'date_key': date_key, 'time': time, 'location': location, 'token': csrf_token};

        if(edit_event){
            edit_event = false;
            //update the edited event
            // fetch("editCalendarEvent.php", {
            //     method: 'POST',
            //     body: JSON.stringify(info),
            //     headers: { 'content-type': 'application/json', 'token':csrf_token }
            // })
            // .then(response => response.text())
            // .then(response => {
            //     console.log("Event added to SQL");
            //     //setTimeout("location.reload(true);",250);
            // })
            // .catch(error => console.error('Error:',error));    

        } else {
            //save the event
            fetch("addCalendarEvent.php", {
                method: 'POST',
                body: JSON.stringify(info),
                headers: { 'content-type': 'application/json', 'token':csrf_token }
            })
            .then(response => response.text())
            .then(response => {
                console.log("Event added to SQL");
                //setTimeout("location.reload(true);",250);
            })
            .catch(error => console.error('Error:',error));    

        }
        

        //load the view event modal
        document.getElementById("view-event-title").textContent = title;
        document.getElementById("view-event-date").textContent = date_key;
        document.getElementById("view-event-time").textContent = time;
        document.getElementById("view-event-location").textContent = location;

        //display the view event modal
        document.getElementById("view-event-modal").style.display = "block";

        //close the edit modal
        document.getElementById("edit-event-modal").style.display = "none";

        //clear the edit modal
        clearEditEventModal();


        //update the calendar display
        calendar_attribute = getCalendarAttribute();
        loadCalendarData(); 
        
    });

    //add a listener to the edit event button
    document.getElementById("edit-event-button").addEventListener('click', function (event) {

        edit_event = true;

        //get data to be edited
        let title = document.getElementById("view-event-title").textContent;
        let date_key = document.getElementById("view-event-date").textContent;
        let time = document.getElementById("view-event-time").textContent;
        let location = document.getElementById("view-event-location").textContent;

        //load data to be edited
        document.getElementById("edit-event-title").value = title;
        document.getElementById("edit-event-date").value = date_key;
        document.getElementById("edit-event-time").value = time;
        document.getElementById("edit-event-location").value = location;

        console.log(title);
        console.log(date_key);
        console.log(time);
        console.log(location);


        //close the view modal
        document.getElementById("view-event-modal").style.display = "none";
        //open the edit
        document.getElementById("edit-event-modal").style.display = "block";

        //clear the view modal
        clearViewEventModal();
        loadCalendarData(); 
        
    });

    //add a listener to the delete event button
    document.getElementById("delete-event-button").addEventListener('click', function (event) {

        //get data to be deleted
        let title = document.getElementById("view-event-title").textContent;
        let date_key = document.getElementById("view-event-date").textContent;
        let time = document.getElementById("view-event-time").textContent;
        let location = document.getElementById("view-event-location").textContent;


        //pop up to see if the user for sure wants to delete the event
        if (confirm("Are you sure you want to delete this event?")) {
            //call php file to delete event from sql table
            let info = { 'title': title, 'date_key': date_key, 'time': time, 'location': location, 'token': csrf_token};
            console.log("deleting calendar event from sql");
            fetch("deleteCalendarEvent.php", {
                    method: 'POST',
                    body: JSON.stringify(info),
                    headers: { 'content-type': 'application/json' }
                })
                .then(response => response.text())
                .then(response => {
                    console.log("Event deleted from SQL");
                    //setTimeout("location.reload(true);",250);
                })
                .catch(error => console.error('Error:',error));      
            //close the view modal
            document.getElementById("view-event-modal").style.display = "none";

            //clear the view modal
            clearViewEventModal();

            loadCalendarData(); 

        }


    });

    //add a listener to the save settings button
    document.getElementById("setting-save-button").addEventListener('click', function (event) {

        //get the updated calendar settings
        let start_day_index = parseInt(document.getElementById("setting-start-day-select").value);
        let view_index = parseInt(document.getElementById("setting-view-select").value);
        let time_format_index = parseInt(document.getElementById("setting-time-format-select").value);


        
        let info = { 'start_day_index': start_day_index, 'view_index': view_index, 'time_format_index': time_format_index, 'token': csrf_token};

        fetch("saveSetting.php", {
            method: 'POST',
            body: JSON.stringify(info),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.text())
        .then(response => {
            console.log("Settings Saved To SQL");
            //setTimeout("location.reload(true);",250);
        })
        .catch(error => console.error('Error:',error));      

        console.log("Save settings!");
        document.getElementById("setting-modal").style.display = "none";
        loadCalendarData(); 
        

    });

    
    
    
    
}

function clearEditEventModal(){
    document.getElementById("edit-event-title").value = "";
    document.getElementById("edit-event-date").value = "";
    document.getElementById("edit-event-time").value = "";
    document.getElementById("edit-event-location").value = "";
}
function clearViewEventModal(){
    document.getElementById("view-event-title").value = "";
    document.getElementById("view-event-date").value = "";
    document.getElementById("view-event-time").value = "";
    document.getElementById("view-event-location").value = "";
}

function getCalendarAttribute(){
    //get the index of the view selected
    let view_index = document.getElementById("view-select").value;
    //return calendar attribute
    return "calendar-table "+VIEW_STYLE[view_index]+"-view";
}






function updateCalendarDisplay(){
    
    
    //load the month and year to be displayed
    let month = MONTH_NAME[calendar.getMonth().index];
    let year = calendar.getYear();
    
    //set the calendar header
    document.getElementById("calendar-header-title").innerHTML = month + " " + year;


    //create the calendar table in HTML
    const calendar_table = document.createElement("table");
    calendar_table.className = calendar_attribute;

    //check if the display view setting is day
    let view_style = calendar.getSetting().getViewStyle();
    if(view_style==0){
        //create a table row for displaying the name of the day
        const day_name_row = document.createElement("tr");
        day_name_row.className = "day-label";

        //get the day
        let day = calendar.getDay();
         
        //create the table header for the day label, ie MON, TUE, etc.
        const day_header = document.createElement("th");
        //create a div row
        let day_row_div = document.createElement("div");
        day_row_div.className = "day-row";

        //create a span to display the day label
        let day_name_span = document.createElement("span");
        day_name_span.className = "day_name";
        day_name_span.innerHTML = day_name[day.getDay()];
        day_row_div.appendChild(day_name_span);
        day_header.appendChild(day_row_div);

        //create html for the date
        let date_div = document.createElement("div");
        if(day.isCurrentDay()){
            date_div.className = "calendar-date current";
        } else {
            date_div.className = "calendar-date";
        }
        date_div.innerHTML = day.getDate();
        day_row_div.appendChild(date_div);
        day_header.appendChild(day_row_div);
        
        //add the header to the calendar
        day_name_row.appendChild(day_header);
        calendar_table.appendChild(day_name_row);


        //create the html body of the day
        let week = document.createElement("tr");
        week.className = "week";
        let day_table_data = document.createElement("td");
        day_table_data.classList = day.getAttribute();
        day_table_data.id = day.getId();


        //load the events into an ul
        const event_list = createEventListNode(day);




        //add a listener to add an event to that day
        day_table_data.addEventListener('click', function (event) {
            console.log(event.target.tagName);

            //make sure the view day button was not clicked
            if(event.target.tagName == "LI" || event.target.tagName == "LABEL" || event.target.tagName == "STRONG"){
                //get the node of the event id of the event clicked

                //load the view event modal
                //TODO VVVVVVV
                document.getElementById("view-event-title").textContent;
                document.getElementById("view-event-date").textContent;
                document.getElementById("view-event-time").textContent;
                document.getElementById("view-event-location").textContent;

                document.getElementById("view-event-modal").style.display = "block";


               
            } else {
                //display the add event modal;
                document.getElementById("edit-event-modal").style.display = "block";
                document.getElementById("edit-event-date").value = day.getKey();
                let today = new Date();
                let nearest_hour = parseInt(today.getHours());
                if(nearest_hour == 24){
                    nearest_hour = 0;
                } else {
                    nearest_hour = nearest_hour + 1;
                }
                document.getElementById("edit-event-time").value = nearest_hour + ":00";
            }
        });


        let day_div = document.createElement("div");
        day_div.className = "day-div";
        day_div.appendChild(event_list);
    


        //add the events to the calendar
        day_table_data.appendChild(day_div);
        calendar_table.appendChild(day_table_data);

        
    } else {
        //create a table row for displaying the name of the days
        const day_name_row = document.createElement("tr");
        day_name_row.className = "day-label";

        let start_day_index = calendar.getSetting().getWeekStartDay();
        for(let i = 0; i<7; i++){
            //create the table header for the day label, ie MON, TUE, etc.
            const day_header = document.createElement("th");

            //get the index of the label based off the calendar setting of when the week start 
            let day_index = (i+start_day_index)%7;
        
            
            
            day_header.innerHTML = day_name[day_index];
            day_name_row.appendChild(day_header);
        }
        calendar_table.appendChild(day_name_row);

        //check if the display style is week
        if(view_style==1){
            //get the week
            let week = calendar.getWeek();
            

            let week_node = createWeekNode();
            for(let day in week){                    
                let day_node = createDayNode(week[day].getDate(), week[day].getAttribute(), week[day].getId());
                
                let day_div = day_node.getElementsByClassName("day-div");
                //load the events into an ul
                const event_list = createEventListNode(week[day]);
                day_div[0].appendChild(event_list);

                
                week_node.appendChild(day_node);

            }
            calendar_table.append(week_node);


        } else {
            //get the month
            let month = calendar.getMonth().getMonth();            
            
            //display month
            for(let week in month){
                let week_node = createWeekNode();
                for(let day in month[week]){                    
                    let day_node = createDayNode(month[week][day].getDate(), month[week][day].getAttribute(), month[week][day].getId());
                    
                    let day_div = day_node.getElementsByClassName("day-div");
                    //load the events into an ul
                    const event_list = createEventListNode(month[week][day]);
                    day_div[0].appendChild(event_list);
                    
                    week_node.appendChild(day_node);

                    

                }
                calendar_table.append(week_node);
            }
        }
       

    }
    


    //replace the old calendar with the new calendar table
    let old_calendar = document.getElementById("calendar-body").firstChild;
    document.getElementById("calendar-body").replaceChild(calendar_table, old_calendar);

    //load current date to tooltip
    document.getElementById("today-tooltip").innerHTML = calendar.getDate().toDateString(); 

}

function createWeekNode(){
    //create HTML calendar week
    let week = document.createElement("tr");
    week.className = "week";
    return week;
}

function createDayNode(date, day_attribute, day_id){
    //create HTML calendar day 
    let day = document.createElement("td");
    day.classList = day_attribute
    day.id = day_id;
    

    let day_div = document.createElement("div");
    day_div.className = "day-div";

    let day_header = document.createElement("h2");
    day_header.className = "day-number";
    day_header.innerHTML = date;

    //add a listener to add an event to that day
    day.addEventListener('click', function (event) {
        //make sure the view day button was not clicked
        if(event.target.tagName == "SPAN" || event.target.tagName == "STRONG" || event.target.tagName == "LABEL"){
            //load the view event modal
            //TODO VVVVVVV
            document.getElementById("view-event-title").textContent;
            document.getElementById("view-event-date").textContent;
            document.getElementById("view-event-time").textContent;
            document.getElementById("view-event-location").textContent;

            document.getElementById("view-event-modal").style.display = "block";
            
           
        } else {
            //get the id of the cell selected
            let week_index = parseInt(day_id[0]);
            let day_index = parseInt(day_id[1]);
            
            let key = calendar.getMonth().getMonth()[week_index][day_index].getKey();
            
            //display the add event modal;
            document.getElementById("edit-event-modal").style.display = "block";
            document.getElementById("edit-event-date").value = key;
            let today = new Date();
            let nearest_hour = parseInt(today.getHours());
            if(nearest_hour == 24){
                nearest_hour = 0;
            } else {
                nearest_hour = nearest_hour + 1;
            }
            document.getElementById("edit-event-time").value = nearest_hour + ":00";

        }
    });
    
    //add an event listener to view that day
    day_header.addEventListener('click', function () {
        //set the view style to day and update the settings
        calendar.getSetting().setViewStyle(0);
        document.getElementById("view-select").value = 0;
        document.getElementById("setting-view-select").value = 0;
        //update the tool tip text
        document.getElementById("previous-tooltip").innerHTML = "Previous " + VIEW_STYLE[0];
        document.getElementById("next-tooltip").innerHTML = "Next " + VIEW_STYLE[0];

        //get the id of the cell selected
        let week_index = parseInt(day_id[0]);
        let day_index = parseInt(day_id[1]);

        //set the day to the day selected
        calendar.setDay(calendar.getMonth().getMonth()[week_index][day_index]);

        //set the flag so the user can resume to previous view
        back_flag = true;
        back_index = calendar.getSetting().getViewStyle();

        //update the display with the proper calendar attributes
        calendar_attribute = getCalendarAttribute();
        loadCalendarData(); 
    });

    day_div.appendChild(day_header);
   

    day.appendChild(day_div);
    return day;
}

function createEventListNode(day){
    
    const event_list = document.createElement("ul");   
    let calendar_event_list = day.getCalendarEvent();
    
    for(event in calendar_event_list){
        
        const event_item = document.createElement("li");
        event_item.className = "event"
        //create a label for the event time
        const time_label = document.createElement("label");
        time_label.textContent = calendar_event_list[event].getTime();
        event_item.appendChild(time_label);
        //create a label for the event title
        const event_title = document.createElement("strong");
        event_title.textContent = calendar_event_list[event].getTitle();
        event_item.appendChild(event_title);
        event_list.appendChild(event_item);
    }

    return event_list;
}

function fetchCalendarEventList(date_key, day_id){

    //array to hold calendar events
    let calendar_event_list = new Array();

    //using the date_key make a php call to retrive the JSON data of events
    //make an AJAX request to the weather server.
    
    const data = { 'date_key': date_key, 'token': csrf_token};
        fetch("calendar_event_list_json.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(response => {
            calendar_event_list = processCalendarEventData(response, day_id);
            updateCalendarDisplay();
        })
        .catch(error => console.error('Error:',error));

}

function processCalendarEventData(response, day_id){

    //array to hold calendar events
    let calendar_event_list = new Array();

    //process JSON response add events to calendar
    
    for(let i=0; i<response.length; i++){
        let json_calendar_event = response[i];
        let event_title = json_calendar_event.event_title;
        let date = json_calendar_event.date;
        let starttime = json_calendar_event.starttime;
        let location = json_calendar_event.location;
        let calendar_event = new CalendarEvent(event_title, date, starttime, location, "owner", "id");
        calendar_event_list.push(calendar_event);        
    }

    let week_index = parseInt(day_id[0]);
    let day_index = parseInt(day_id[1]);
    
    calendar.getMonth().getMonth()[week_index][day_index].setCalendarEvent(calendar_event_list); 
    
}

function getCsrfToken(){
    fetch("csrfToken.php", {
        method: 'POST',
        headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(response => {
        csrf_token= response.token;
        console.log(csrf_token);
        
    })
    .catch(error => console.error('Error:',error));
    
}

function getCalendarSetting(){
    fetch("calendar_setting_json.php", {
        method: 'POST',
        headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(response => {
        calendar_event_list = processCalendarSetting(response);
    })
    .catch(error => console.error('Error:',error));

}
function processCalendarSetting(response){
    //get the values from the JSON response
    let start_week_index = parseInt(response.start_week_index);
    let view_format = parseInt(response.view_format);
    let time_format = parseInt(response.time_format);
 
    //set the calendar settings
    calendar.getSetting().setTimeFormat(time_format);
    calendar.getSetting().setViewStyle(view_format);
    calendar.getSetting().setWeekStartDay(start_week_index);
 
    //update the setting elements
    document.getElementById("setting-view-select").value = view_format;
    document.getElementById("view-select").value = view_format;
}


function loadCalendarData(){
    let month = calendar.getMonth().getMonth();
    for(let week in month){
        let week_list = month[week];
        for(day in week_list){
            let day_list = month[week][day]
            fetchCalendarEventList(day_list.getKey(), day_list.getId());
        }
    }
    
}

function fetchCalendarData(){
    calendar = new Calendar();


    //get the view style
    let view_index = calendar.getSetting().getViewStyle();
    //set the view type
    document.getElementById("view-select").value = view_index;
    document.getElementById("setting-view-select").value = view_index;

    //set the start day of the week
    document.getElementById("setting-start-day-select").value = calendar.getSetting().getWeekStartDay();

    //set the time format
    document.getElementById("setting-time-format-select").value = calendar.getSetting().getTimeFormat();


    //get the calendar display attributes
    calendar_attribute = getCalendarAttribute();

    //update the tool tip text
    document.getElementById("previous-tooltip").innerHTML = "Previous " + VIEW_STYLE[view_index];
    document.getElementById("next-tooltip").innerHTML = "Next " + VIEW_STYLE[view_index];

    getCsrfToken();
    // getCalendarSetting();
    loadCalendarData(); 
    
}

document.addEventListener("DOMContentLoaded", fetchCalendarData, false);