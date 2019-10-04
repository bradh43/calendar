class CalendarEvent {
    constructor(title, date_key, time, location, owner, id){
        this.title = title;
        this.date_key = date_key;
        this.time = time;
        this.location = location;
        this.owner = owner
        this.id = id;
    }

    getTitle(){
        return this.title;
    }
    getDateKey(){
        return this.date_key;
    }
    getTime(){
        return this.time;
    }
    getLocation(){
        return this.location;
    }
    getOwner(){
        return this.owner;
    }
    getId(){
        return this.id;
    }

    setTitle(title){
        this.title = title;
    }
    setDateKey(date_key){
        this.date_key = date_key;
    }
    setTime(time){
        this.time = time;
    }
    setLocation(location){
        this.location = location;
    }
    setOwner(owner){
        this.owner = owner;
    }
    editEvent(title, date_key, time, location, owner){
        this.title = title;
        this.date_key = date_key;
        this.time = time;
        this.location = location;
        this.owner = owner;
    }
    
}