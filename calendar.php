<!doctype html>

<html lang="en">
<head>
    <!-- Set up settings -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Calendar">
    <meta name="keywords" content="Calendar">
    <meta name="author" content="Brad Hodkinson">
    <!-- Link javascript and css -->
    <link rel="stylesheet" href="calendar.css">
    <script src="calendarFunction.js"></script>
    <script src="calendarSetting.js"></script>
    <script src="month.js"></script>
    <script src="day.js"></script>
    <script src="calendarEvent.js"></script>



    <title>Calendar</title>
</head>
<body>
    <div class="calendar">
        <!-- NavBar -->
        <div class="calendar-header">
            <ul>
                <!-- Left side of navbar elements -->
                <li>
                    <img src="./assets/icons/calendar-1.png" id="calendar-home-button" alt="calendar home">
                </li>
                <li>
                    <h1>Calendar</h1>
                </li>
                <li>
                    <div class="button primary" id="today-button">
                        <span class="text">Today</span>
                        <span class="tooltip" id="today-tooltip"></span>
                    </div>
                </li>
                <li>
                    <div class="button secondary" id="previous-button">
                        <img src="./assets/icons/left-arrow.png" alt="left-arrow">
                        <span class="tooltip" id="previous-tooltip">Previous Month</span>
                    </div>
                </li>
                <li>
                    <div class="button secondary" id="next-button">
                        <span class="tooltip" id="next-tooltip">Next Month</span>
                        <img src="./assets/icons/right-arrow.png" alt="right-arrow">
                    </div>
                </li>
                <li>
                    <h1 id="calendar-header-title">Month Year</h1>
                </li>
                <!-- Right side of Navbar elements -->
                <li class="user-button right" id="sign-out">Sign Out</li>
                <li class="right">
                    <div class="calendar-select">
                        <select id="view-select">
                            <option value="0">Day</option>
                            <option value="1">Week</option>
                            <option value="2">Month</option>
                        </select>
                    </div>
                </li>
                <li class="right" id="setting-button">
                    <div class="setting">
                        <img src="./assets/icons/setting.png" alt="Settings">
                    </div>
                </li>
            </ul>
        </div>
        <!-- Main Part of calendar -->
        <div id="calendar-body">
            <div class="loading">
                <h2>Loading...</h2>
                <img src="./assets/icons/loading.gif" alt="Loading...">
            </div>
           
        </div>
        <div id="setting-modal" class="modal">
            <div class="modal-content">
                <span class="close close-modal">&times;</span>
                <span class="tooltip">Close</span>
                <h2>Settings</h2>
                <hr>
                <div class="row">
                    <h3>Start week on</h3>
                    <div class="calendar-select">
                        <select id="setting-start-day-select">
                            <option value="0">Sunday</option>
                            <option value="1">Monday</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <h3>View format</h3>
                    <div class="calendar-select">
                        <select id="setting-view-select">
                            <option value="0">Day</option>
                            <option value="1">Week</option>
                            <option value="2">Month</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <h3>Time format</h3>
                    <div class="calendar-select">
                        <select id="setting-time-format-select">
                            <option value="0">Standard(1:00 PM)</option>
                            <option value="1">Military(13:00)</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="save-button" id="setting-save-button">
                        <label>Save</label>
                    </div>
                </div> 
                
            </div>
        </div>

        <div id="view-event-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-header-button">
                        <span class="close close-modal">&times;</span>
                        <span class="tooltip">Close</span>
                    </div>
                    <div class="modal-header-button" id="delete-event-button">
                        <img src="./assets/icons/garbage.png" alt="delete">
                        <span class="tooltip">Delete</span>
                    </div>
                    <div class="modal-header-button" id="edit-event-button">
                        <img src="./assets/icons/pencil-edit-button.png" alt="edit">
                        <span class="tooltip">Edit</span>
                    </div>
                </div>
                <h2 id="view-event-title">Event Title</h2>
                <hr>
                <div class="row modal-row">
                    <img src="./assets/icons/time.png" alt="location">
                    <strong id="view-event-date">Day, Month dd </strong>
                    <span id="view-event-time">00:00</span>
                </div>
                <div class="row modal-row">
                    <img src="./assets/icons/location.png" alt="location">
                    <h3 id="view-event-location">Location</h3>
                </div>
            </div>
        </div>

        <div id="edit-event-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-header-button">
                        <span class="close close-modal">&times;</span>
                        <span class="tooltip">Close</span>
                    </div>
                </div>
                <form>
                    <div class="row modal-row">
                        <img src="./assets/icons/calendar-1.png" alt="title">
                        <input type="text" placeholder="Title" id="edit-event-title">
                    </div>
                    <div class="row modal-row">
                        <img src="./assets/icons/calendar-3.png" alt="date">
                        <input type="date"  id="edit-event-date">
                    </div>
                    <div class="row modal-row">
                        <img src="./assets/icons/time.png" alt="time">
                        <input type="time" id="edit-event-time">
                    </div>
                    <div class="row modal-row">
                        <img src="./assets/icons/location.png" alt="location">
                        <input type="text" placeholder="Location" id="edit-event-location">
                    </div>
                    <div class="save-button" id="edit-event-save-button">
                        <label>Save</label>
                    </div>
                </form>
                
            </div>
        </div>

    </div>
    
</body>

</html>



