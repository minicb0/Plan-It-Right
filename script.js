// Declaring variables
//calender
var body = document.getElementsByTagName('body')
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

var firstDay;
var daysInMonth;

var today = new Date();
var currentDate = today.getDate();
var currentMonth = today.getMonth()
var currentYear = today.getFullYear();
var currentDay = today.getDay();
var tbl = document.getElementById('tbl')

var prevYear = document.getElementById("prevYearBtn");
var yearDisplay = document.getElementById("yearDisplay");
var nextYear = document.getElementById("nextYearBtn");
var prevMonth = document.getElementById("prevMonthBtn");
var monthDisplay = document.getElementById("monthDisplay");
var nextMonth = document.getElementById("nextMonthBtn");

var todayBtn = document.getElementById("todayBtn")

var cellArray;
var dayTodo = document.getElementById("dayClicked");

//todo
var taskInput = document.getElementById("taskInput")
var addBtn = document.getElementById("addBtn")
var taskList = document.getElementById("taskList")

//sounds
var taskDoneSound = document.getElementById("taskDoneSound");
var deleteSound = document.getElementById("deleteSound");

//local Storage
var listLocal;
if (localStorage.getItem("todoLocal") == null) {
    var listLocal = []
} else {
    listLocal = JSON.parse(localStorage.getItem("todoLocal"));
}

//clock - digital
function currentTime() {
    today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();

    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var midday;
    //Assigning AM/PM
    if (hour > 11) {
        midday = "PM"
    } else {
        midday = "AM"
    }

    //Making a 12 hour format clock
    if (hour == 0) {
        hour = 12;
    } else if (hour > 12) {
        hour = hour - 12
    } else {
        hour = hour;
    }

    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.getElementById("clock-day").innerHTML = "Today - " + day + " " + monthList[month] + " " + year;
    document.getElementById("clock-time").innerHTML = "Time - " + hour + ":" + min + ":" + sec + " " + midday;
    setTimeout(currentTime, 1000); /* setting timer */
}
function updateTime(k) {
    if (k < 10) {
        return "0" + k;
    }
    else {
        return k;
    }
}
currentTime();

//clock - analog - canvas
var numbersColor = document.getElementById("numbersColor");
var bgColor = document.getElementById("bgColor")
var handsColor = document.getElementById("handsColor")
var hourLength = document.getElementById("hourLength")
var minuteLength = document.getElementById("minuteLength")
var secondLength = document.getElementById("secondLength")

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9
setInterval(drawClock, 1000);

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = bgColor.value;
    ctx.fill();
    ctx.strokeStyle = handsColor.value;
    ctx.lineWidth = radius * 0.05;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = numbersColor.value;
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    var today = new Date();
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    //hour
    hour = hour % 12;

    //time to angle conversion
    hour = (hour * Math.PI / 6) + (min * Math.PI / (6 * 60)) + (sec * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * (hourLength.value) / 10, radius * 0.07);

    //minute
    min = (min * Math.PI / 30) + (sec * Math.PI / (30 * 60));
    drawHand(ctx, min, radius * (minuteLength.value) / 10, radius * 0.07);

    // second
    sec = (sec * Math.PI / 30);
    drawHand(ctx, sec, radius * (secondLength.value) / 10, radius * 0.02);
}

function drawHand(ctx, angle, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(angle);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-angle);
}

var clockType = document.getElementById("clockType");
clockType.addEventListener('click', () => {
    // console.log(clockType.innerHTML)
    if (clockType.innerHTML == "Analog Clock") {
        document.getElementById("canvas").classList.remove("hide")
        document.getElementById("clock-time").classList.add("hide")
        document.getElementById("inputsColor").classList.remove("hide")
        document.getElementById("inputsSize").classList.remove("hide")
        clockType.innerHTML = "Digital Clock"
    } else if (clockType.innerHTML == "Digital Clock") {
        document.getElementById("canvas").classList.add("hide")
        document.getElementById("clock-time").classList.remove("hide")
        document.getElementById("inputsColor").classList.add("hide")
        document.getElementById("inputsSize").classList.add("hide")
        clockType.innerHTML = "Analog Clock"
    }
})

//calender
function renderDate() {
    if (currentMonth === 12) {
        currentYear = currentYear + 1;
        currentMonth = 0
    }
    if (currentMonth === -1) {
        currentYear = currentYear - 1;
        currentMonth = 11
    }

    firstDay = (new Date(currentYear, currentMonth, 1)).getDay();
    if (firstDay === 0) {
        firstDay = 6
    } else {
        firstDay = firstDay - 1
    }

    daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    monthDisplay.innerHTML = monthList[currentMonth];
    yearDisplay.innerHTML = currentYear;

    cellFill();
}
renderDate();
dayTodo.innerHTML = today.getDate() + " " + monthList[currentMonth] + " " + currentYear;

//Event Listeners
nextMonth.addEventListener('click', () => {
    document.getElementById("tbl").remove();
    currentMonth = currentMonth + 1;
    renderDate();
})
prevMonth.addEventListener('click', () => {
    document.getElementById("tbl").remove();
    currentMonth = currentMonth - 1;
    renderDate();
})
nextYear.addEventListener('click', () => {
    document.getElementById("tbl").remove();
    currentYear = currentYear + 1
    renderDate();
})
prevYear.addEventListener('click', () => {
    document.getElementById("tbl").remove();
    currentYear = currentYear - 1
    renderDate();
})
todayBtn.addEventListener('click', () => {
    document.getElementById("tbl").remove();
    currentMonth = today.getMonth()
    currentYear = today.getFullYear();
    renderDate();
    dayTodo.innerHTML = today.getDate() + " " + monthList[currentMonth] + " " + currentYear;
    loadList();
})

function cellFill() {
    let date = 1;
    var calenderDiv = document.getElementById("calender-container")
    var table = document.createElement("table");
    table.id = "tbl";
    calenderDiv.appendChild(table);
    for (let i = 0; i < 7; i++) {
        // creates a table row
        let row = document.createElement("tr");
        table.appendChild(row);
        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0) {
                cell = document.createElement("td");
                cellText = document.createTextNode(dayList[j]);
                cell.classList.add("days")
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (i === 1 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.classList.add("cell")
                cell.appendChild(cellText);
            } else {
                cell = document.createElement("td");
                cellText = document.createTextNode(date);
                cell.id = date;
                cell.classList.add("cell")
                span = document.createElement("span");
                span.id = "indicator" + date

                // highlight today's date
                if (date === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth()) {
                    cell.classList.add("today-bg");
                    cell.classList.add("dayClicked");
                }

                cell.appendChild(cellText);
                cell.appendChild(span)
                row.appendChild(cell);
                date++;
            }
        }
    }
    indicatorFunc();
    clickCell();
}

function clickCell() {
    cellArray = document.querySelectorAll(".cell");
    cellArray = Array.from(cellArray)
    for (let i = 0; i < cellArray.length; i++) {
        cellArray[i].addEventListener('click', () => {
            if (document.getElementsByClassName('dayClicked').length == 0) {
            } else {
                document.getElementsByClassName('dayClicked')[0].classList.remove("dayClicked")
            }
            cellArray[i].classList.add("dayClicked")
            // console.log(cellArray[i].textContent);
            // console.log(`${cellArray[i].textContent}/${currentMonth + 1}/${currentYear}`)
            dayTodo.innerHTML = `${cellArray[i].textContent} ${monthList[currentMonth]} ${currentYear}`
            loadList();
        })
    }
}

//todo
function loadList() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    for (let i = 0; i < listLocal.length; i++) {
        if (listLocal[i].date == `${document.getElementsByClassName("dayClicked")[0].textContent}/${currentMonth + 1}/${currentYear}`) {
            var task = listLocal[i].text
            // console.log(task);
            if (listLocal[i].checked == true) {
                var checked = "checked"
                var completed = "completed"
            } else {
                checked = ""
                completed = ""
            }
            if (listLocal[i].trash == true) {
                var trash = "hide";
            } else {
                trash = ""
            }
            var item =
                `<div class="itemDiv"><li class="item ${trash}">
            <input type="checkbox" class="checkbox" ${checked}>
            <span class="text ${completed}">${task}</span>
            <img class="delete" src="./assets/images/delete.png">
            </li></div>`;

            taskList.insertAdjacentHTML('beforeend', item);
            taskInput.value = ""

        }
    }
    indicatorFunc();
    checkboxWorking();
    deleteWorking();
}
loadList();

function indicatorFunc() {
    for (let i = 0; i < listLocal.length; i++) {
        for (let j = 0; j < daysInMonth; j++) {
            if (listLocal[i].date == `${j + 1}/${currentMonth + 1}/${currentYear}`) {
                document.getElementById("indicator" + (j + 1)).classList.add("indicatorTrue")
            }
        }
    }
}
indicatorFunc();

addBtn.addEventListener('click', () => {
    if (taskInput.value == "") {
    } else {
        taskDoneSound.play();
        var task = taskInput.value
        // console.log(task);
        var item =
            `<div class="itemDiv"><li class="item">
            <input type="checkbox" class="checkbox">
            <span class="text">${task}</span>
            <img class="delete" src="./assets/images/delete.png">
            </li></div>`;

        taskList.insertAdjacentHTML('beforeend', item);
        taskInput.value = ""

        listLocal.push({
            id: `${document.getElementsByClassName("dayClicked")[0].textContent}${currentMonth + 1}${currentYear}${task}`,
            date: `${document.getElementsByClassName("dayClicked")[0].textContent}/${currentMonth + 1}/${currentYear}`,
            text: task,
            checked: false,
            trash: false
        });
        localStorage.setItem("todoLocal", JSON.stringify(listLocal))
        indicatorFunc();
        checkboxWorking();
        deleteWorking();
    }
})

document.addEventListener("keyup", function (event) {
    if (taskInput.value == "") {
    } else {
        if (event.keyCode == 13) {
            taskDoneSound.play();
            var task = taskInput.value
            // console.log(task);
            var item =
                `<div class="itemDiv"><li class="item">
            <input type="checkbox" class="checkbox">
            <span class="text">${task}</span>
            <img class="delete" src="./assets/images/delete.png">
            </li></div>`;

            taskList.insertAdjacentHTML('beforeend', item);
            taskInput.value = ""

            listLocal.push({
                id: `${document.getElementsByClassName("dayClicked")[0].textContent}${currentMonth + 1}${currentYear}${task}`,
                date: `${document.getElementsByClassName("dayClicked")[0].textContent}/${currentMonth + 1}/${currentYear}`,
                text: task,
                checked: false,
                trash: false
            });
            localStorage.setItem("todoLocal", JSON.stringify(listLocal))
            indicatorFunc();
            checkboxWorking();
            deleteWorking();
        }
    }
})

function checkboxWorking() {
    for (let i = 0; i < document.getElementsByClassName("checkbox").length; i++) {
        document.getElementsByClassName("checkbox")[i].addEventListener('click', () => {
            taskDoneSound.play();
            if (document.getElementsByClassName("checkbox")[i].checked) {
                // console.log("true")
                document.getElementsByClassName("text")[i].classList.add("completed")
                // console.log(document.getElementsByClassName("text")[i].textContent)
                listLocal.forEach((element, index) => {
                    // console.log(`${document.getElementsByClassName("dayClicked")[0].textContent}${currentMonth + 1}${currentYear}` + listLocal[i].text)
                    if (element.id === (`${document.getElementsByClassName("dayClicked")[0].textContent}${currentMonth + 1}${currentYear}` + document.getElementsByClassName("text")[i].textContent)) {
                        listLocal[index].checked = true
                        // console.log(listLocal[index])
                    }
                });
            } else {
                // console.log("false")
                listLocal.forEach((element, index) => {
                    if (element.id === (`${document.getElementsByClassName("dayClicked")[0].textContent}${currentMonth + 1}${currentYear}` + document.getElementsByClassName("text")[i].textContent)) {
                        listLocal[index].checked = false
                        // console.log(listLocal[index])
                    }
                });
                document.getElementsByClassName("text")[i].classList.remove("completed")
            }
            localStorage.setItem("todoLocal", JSON.stringify(listLocal))
        })
    }
}
checkboxWorking();

function deleteWorking() {
    for (let i = 0; i < document.getElementsByClassName("delete").length; i++) {
        document.getElementsByClassName("delete")[i].addEventListener('mouseover', () => {
            document.getElementsByClassName("delete")[i].setAttribute('src', './assets/images/delete-red.png')
            document.getElementsByClassName("delete")[i].style.width = '25px'
            document.getElementsByClassName("delete")[i].style.height = '25px'
        })
        document.getElementsByClassName("delete")[i].addEventListener('mouseout', () => {
            document.getElementsByClassName("delete")[i].setAttribute('src', './assets/images/delete.png')
            document.getElementsByClassName("delete")[i].style.width = '20px'
            document.getElementsByClassName("delete")[i].style.height = '20px'
        })

        document.getElementsByClassName("delete")[i].addEventListener('click', () => {
            deleteSound.play();
            document.getElementsByClassName("delete")[i].parentElement.classList.add("hide")
            listLocal.forEach((element, index) => {
                if (element.id === (`${document.getElementsByClassName("dayClicked")[0].textContent}${currentMonth + 1}${currentYear}` + document.getElementsByClassName("text")[i].textContent)) {
                    listLocal[index].trash = true;
                }
            });
            localStorage.setItem("todoLocal", JSON.stringify(listLocal))
        })
    }
}
deleteWorking();

//sounds 
var unmute = document.getElementById("unmute");
var mute = document.getElementById("mute")
unmute.addEventListener('click', () => {
    mute.classList.remove("hide")
    unmute.classList.add("hide")
    taskDoneSound.muted = true;
    deleteSound.muted = true;
})
mute.addEventListener('click', () => {
    mute.classList.add("hide")
    unmute.classList.remove("hide")
    taskDoneSound.muted = false;
    taskDoneSound.play();
    deleteSound.muted = false;
})