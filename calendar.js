class Calendar {
    constructor(){
        //init current date
        this.current_date = new Date();

        //init calendar settings
        this.setting = new CalendarSetting();

        //set current date variables
        this.current_year = this.current_date.getFullYear();
        this.current_month = this.current_date.getMonth();
        this.current_day = this.current_date.getDay();
        this.current_calendar_date = this.current_date.getDate();

        //set variables that will be used to display on the calendar
        this.year = this.current_year;
        this.month = new Month(this.current_year, this.current_month, this.setting.getWeekStartDay());

        this.week_index = this.month.getWeekIndex();
        this.week = this.month.getMonth()[this.week_index];

        this.day_index = this.month.getDayIndex();
        this.day = this.month.getMonth()[this.week_index][this.day_index];

        this.calendar_date = this.current_calendar_date;

    }
    //returns the currete date 
    getDate(){
        return this.current_date;
    }
    getSetting(){
        return this.setting;
    }
    //returns the current year
    getCurrentYear(){
        return this.current_year;
    }
    //returns the current month
    getCurrentMonth(){
        return this.current_month;
    }
    //returns the current day
    getCurrentDay(){
        return this.current_day;
    }
    //returns the current calendar day number ie. 17th -> 17
    getCurrentCalendarDay(){
        return this.current_calendar_date;
    }
    //returns the index of the day in the week, Sunday(0) and Monday(1), etc.
    getDay(){
        return this.day;
    }
    setDay(day){
        this.day = day;
        this.day_index = (this.day.getDay()+(7-this.setting.getWeekStartDay()))%7;
        this.year = this.day.getYear();

        this.month = new Month(this.year, this.day.getMonthIndex(), this.setting.getWeekStartDay());
        this.date = this.day.getDate();
        
        this.week_index = this.month.getWeekIndexOfDate(this.date);

        this.week = this.month.getMonth()[this.week_index];

        
    }
    //returns calendar year
    getYear(){
        return this.year;
    }
    getWeek(){
        return this.week;
    }
    getDayIndex(){
        return this.day_index;
    }
    getWeekIndex(){
        return this.week_index;
    }
    //returns calendar month
    getMonth(){
        return this.month;
    }
    //returns the next month
    getNextMonth(){
        return new Month(this.year + Math.floor((this.month.index+1)/12), (this.month.index+1) % 12, this.setting.getWeekStartDay());
    }
    //returns the previous month
    getPreviousMonth(){
        return new Month(this.year + Math.floor((this.month.index-1)/12), (this.month.index+11) % 12, this.setting.getWeekStartDay());
    }
    nextDay(){
        //check if last day in the week
        if(this.day_index == 6){
            this.week = this.nextWeek();
            this.day_index = 0;
        } else {            
            //check if its the last day of the month            
            if(this.month.getMonth()[this.week_index][this.day_index].getDate() == this.getMonth().getLastDay().getDate()){
                this.week = this.nextWeek();                
            }
            this.day_index = this.day_index+1;
        }
        this.day = this.month.getMonth()[this.week_index][this.day_index];  
        
    }
    previousDay(){
        //check if first day in the week
        if(this.day_index == 0){
            this.week = this.previousWeek();
            this.day_index = 6;
        } else {
            //check if its the first day of the month
            if(this.month.getMonth()[this.week_index][this.day_index].getDate() == 1){
                this.week = this.previousWeek();
            }
            this.day_index = this.day_index-1;
        }
        this.day = this.month.getMonth()[this.week_index][this.day_index];  
    }
    currentDay(){
        this.month = this.currentMonth();
        return this.day;
    }

    nextWeek(){
        //check if last week
        if(this.week_index == this.month.getMonth().length-1){
            this.month = this.nextMonth();
            this.week_index = 0;
        } else {
            this.week_index = this.week_index + 1;
        }
        
        this.week = this.month.getMonth()[this.week_index];
        
        return this.week;
    }
    previousWeek(){
        //check if first week
        if(this.week_index == 0){
            this.month = this.previousMonth();
            this.week_index = this.month.getMonth().length-1;
        } else {
            this.week_index = this.week_index - 1;
        }
        this.week = this.month.getMonth()[this.week_index];

        return this.week;
    }
    currentWeek(){
        this.month = this.currentMonth();
        return this.week;
    }

    //method to go forward a month, this both updates the calendar month and returns the next month
    nextMonth(){
        this.year += Math.floor((this.month.index+1)/12);
        this.month = new Month(this.year, (this.month.index+1) % 12, this.setting.getWeekStartDay());
        this.week = this.month.getMonth()[this.month.getWeekIndex()];
        this.day = this.month.getMonth()[this.month.getWeekIndex()][this.month.getDayIndex()];
        return this.month;
    }
    //method to go back a month, this both updates the calendar month and returns the previous month
    previousMonth(){
        this.year += Math.floor((this.month.index-1)/12)
        this.month = new Month(this.year, (this.month.index+11) % 12, this.setting.getWeekStartDay());
        this.week = this.month.getMonth()[this.month.getWeekIndex()];
        this.day = this.month.getMonth()[this.month.getWeekIndex()][this.month.getDayIndex()];
        return this.month;
    }
    //method to go to the current month, both updates calendar and returns current month
    currentMonth(){
        this.year = this.current_year;
        this.month = new Month(this.current_year, this.current_month, this.setting.getWeekStartDay());
        this.week = this.month.getMonth()[this.month.getWeekIndex()];
        this.day = this.month.getMonth()[this.month.getWeekIndex()][this.month.getDayIndex()];
        return this.month;
    }
    adjustIndex(){
        this.month = new Month(this.year, this.getMonth().getMonthIndex(), this.setting.getWeekStartDay());
        this.week = this.month.getMonth()[this.month.getWeekIndex()];
        this.day = this.month.getMonth()[this.month.getWeekIndex()][this.month.getDayIndex()];
        
    }
    
    
}
