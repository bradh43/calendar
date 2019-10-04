class CalendarSetting {
    constructor(){
        //make the start of the week Monday(1), Sunday would be 0 
        this.week_start_day = 1;
        //set view style Day(0) Week(1) Month(2)
        this.view_style = 2;
        //time format style 0 - Normal(1:00 PM), and 1 - Military(13:00)
        this.time_format = 1;
    }
    getWeekStartDay(){
        return this.week_start_day;
    }
    setWeekStartDay(week_start_day){
        this.week_start_day = week_start_day;
    }
    getViewStyle(){
        return this.view_style;
    }
    setViewStyle(view_style){
        this.view_style = view_style;
    }
    getTimeFormat(){
        return this.time_format;
    }
    setTimeFormat(time_format){
        this.time_format = time_format;
    }
}
