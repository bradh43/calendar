class Day {
    constructor(date, month_index, year, day, week_index, day_index, attribute){
        this.date = date;
        this.month_index = month_index;
        
        this.year = year;
        this.day = day;
        this.week_index = week_index;
        this.day_index = day_index;

        let yyyy = this.year;
        let mm = this.month_index+1;
        let dd = this.date;
        this.calendar_event_list = new Array();
        if(mm<10){
            mm = "0"+mm;
        }
        if(dd<10){
            dd = "0"+dd;
        }

        this.key = yyyy+"-"+mm+"-"+dd;

        this.id = this.week_index+""+this.day_index;

        this.attribute = attribute;
        let current_date = new Date();
        //check if its the current day
        if(this.month_index === current_date.getMonth() && this.date === current_date.getDate() && this.year === current_date.getFullYear()){
            this.attribute += " current";
            this.current_day_flag = true;
        } else {
            this.current_day_flag = false;
        }
        //check if the event is old and in the past before current day
        if((this.month_index === current_date.getMonth() && this.date < current_date.getDate() && this.year === current_date.getFullYear())||(this.month_index < current_date.getMonth() && this.year === current_date.getFullYear())||(this.year<current_date.getFullYear())){
            this.attribute += " old";
        } 

        this.calendar_event_list = new Array();

    }

    setCalendarEvent(calendar_event_list){        
        this.calendar_event_list = calendar_event_list;
    }
    //retruns the day of the week with Sunday(0) and Monday(6)
    getDay(){
        return this.day;
    }
    //returns the calendar date of the day
    getDate(){
        return this.date;
    }
    //return the month the day currently belongs to
    getMonthIndex(){
        return this.month_index;
    }
    //returns the year the day belongs to
    getYear(){
        return this.year;
    }
    //returns the id of the day in YYYY-MM-DD format
    getId(){
        return this.id;
    }
    //return the class attributes for styling the day with CSS
    getAttribute(){
        return this.attribute;
    }
    //returns true if the day is currently today
    isCurrentDay(){
        return this.current_day_flag;
    }
    getWeekIndex(){
        return this.week_index;
    }
    getKey(){
        return this.key;
    }
    getCalendarEvent(){
        return this.calendar_event_list;
    }
    
}