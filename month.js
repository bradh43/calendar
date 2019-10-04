class Month {
    constructor(year, month_number, week_start_day){
        console.log("New Month Created");
        //year the month is from
        this.year = year;
        //index of the month ie. January = 0, Febuary = 1, etc.
        this.index = month_number;

        this.week_start_day = week_start_day;

        //array of all the weeks in the month
        this.month = new Array();

        this.current_week = 0;
        this.current_day = this.week_start_day;



        //get the last day of the previous month
        let previous_month_last_day = new Date(this.year,this.index,0);
        //get the last day of the current month
        let current_month_last_day = new Date(this.year+Math.floor((this.index+1)/12),(this.index+1) % 12,0);
        let current_date = new Date();

        //figure out what day of the week the previous month last day was on
        let last_day = (previous_month_last_day.getDay()+(7-this.week_start_day))%7;

        let day_index = this.week_start_day;
        
        let week_count = 0;
        let date_count = 1;
        //load first week
        //if its last day of the week then the 1st occurs at the start of the week
        //else display the previous months dates until the 1st
        
        if(last_day != 6){
            let first_week = new Array();
            //load previous month days 

            for(let i=0; i<=last_day; i++){
                
                let date = previous_month_last_day.getDate()-(last_day-i);
                let previous_month_year = this.year + Math.floor((this.index-1)/12);
                let previous_month = (this.index+11) % 12;
                //check if its the current day    
                first_week.push(new Day(date, previous_month, previous_month_year, day_index%7, week_count,i, "day other"));
                day_index++;
                //check if the current day 
                if(first_week[i].isCurrentDay()){
                    this.current_week = week_count;
                    this.current_day = i;
                } 
            }
            for(let i=0; i < (7-last_day)-1; i++){
                first_week.push(new Day(date_count, this.index, this.year, day_index%7, week_count,i+last_day+1, "day"));
                day_index++;
                //check if the current day 
                if(first_week[i].isCurrentDay()){
                    this.current_week = week_count;
                    this.current_day = last_day+i;
                } 
                date_count++;
            }
            this.month.push(first_week);
        } else {
            week_count--;
        }


        let next_month_date_count = 1;

        //load remaining weeks
        while(date_count <= current_month_last_day.getDate()){
            week_count++;
            let week = new Array()
            for(let i=0; i<7; i++){
                //check if its the next month
                if(date_count > current_month_last_day.getDate()){
                    let next_month_year = this.year + Math.floor((this.index+1)/12);
                    let next_month = (this.index+1) % 12;
                    week.push(new Day(next_month_date_count, next_month , next_month_year, day_index%7, week_count, i, "day other"));
                    if(week[i].isCurrentDay()){
                        this.current_week = week_count;
                        this.current_day = i;
                    } 
                    day_index++;
                    next_month_date_count++;
                } else {
                    
                    week.push(new Day(date_count, this.index, this.year, day_index%7, week_count,i, "day"));
                    day_index++;
                    //check if the current day 
                    if(week[i].isCurrentDay()){
                        this.current_week = week_count;
                        this.current_day = i;
                    } 
                    
                }
                date_count++;
            }
            this.month.push(week);
        }


     
    }
    //method that returns the first calendar day of the month
    getFirstDay(){
        return new Date(this.year, this.index, 1);
    }
    //method that returns the last calendar day of the month
    getLastDay(){
        return new Date(this.year+Math.floor((this.index+1)/12),(this.index+1) % 12,0);
    }
    getMonthIndex(){
        return this.index;
    }
    //method to return the month that contains all the weeks\
    getMonth(){
        return this.month;
    }
    //returns the index of the current week, if current week is not in month return 0
    getWeekIndex(){
        return this.current_week;
    }
    //returns the index of the current day, if current day is not in month or week returns first day of week
    getDayIndex(){
        return this.current_day;
    }
    getWeekIndexOfDate(date){
        //loop through the weeks
        for(let i=0; i<this.month.length; i++){
            for(let j=0; j<7; j++){
                let check_date = this.month[i][j].getDate();
                //check first week to make sure its not a day from a different month
                if(!(i==0 && check_date>7)){
                    //check if the date is a match
                    if(date == check_date){
                        return i;
                    }
                }
            }
        }
        //date not found in the month
        return -1;
    }
    
}