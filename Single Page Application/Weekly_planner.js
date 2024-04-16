// ----------------------------------------------BUTTON FUNCTIONS---------------------------------------------------------------------------------------------

var month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var current_month = 0;
var week_name = ["Week 1", "Week 2", "Week 3", "Week 4"];
var current_week = 0;


function saveState() {
	localStorage.setItem('currentMonth', current_month);
	localStorage.setItem('currentWeek', current_week);
	console.log('State saved:', current_month, current_week);
}

window.addEventListener('load', function() {
var saved_month_data = localStorage.getItem('currentMonth');
var saved_week_data = localStorage.getItem('currentWeek');

if ((saved_month_data !== null) && (saved_week_data !== null)) {
	current_month = parseInt(saved_month_data);
	current_week = parseInt(saved_week_data);
	
	console.log('State restored:', current_month, current_week);
	month_id.innerHTML = month_name[current_month];
	week_id.innerHTML = week_name[current_week];
}
else {
	console.log('No saved state found. Using default values.');
}
});

function ChangeMonthLeft() {
document.getElementById("month_id");
if (current_month > 0) {
current_month--;
month_id.innerHTML = month_name[current_month];
saveState();
}
}
function ChangeMonthRight() {
document.getElementById("month_id");
if (current_month < month_name.length -1) {
current_month++;
month_id.innerHTML = month_name[current_month];
saveState();
}
}
function ChangeWeekLeft() {
document.getElementById("week_id");
if (current_week > 0) {
current_week--;
week_id.innerHTML = week_name[current_week];
saveState();
}
}
function ChangeWeekRight() {
document.getElementById("week_id");
if (current_week < week_name.length -1) {
current_week++;
week_id.innerHTML = week_name[current_week];
saveState();
}
}



//---------------------------------------------editing content and saving------------------------------------------------------------------




window.addEventListener('load', function () {
    loadData();
    addContentEditableListeners();
    document.getElementById('plannerTable').addEventListener('input', function () {
        saveData();
    });
});
 
function addContentEditableListeners() {
    var cells = document.querySelectorAll('#plannerTable [contenteditable="true"]');
    cells.forEach(function (cell) {
        cell.addEventListener('focus', function () {
            cell.dataset.originalContent = cell.innerHTML;
        });
        cell.addEventListener('blur', function () {
            if (cell.innerHTML !== cell.dataset.originalContent) {
                saveData();
            }
        });
    });
}



function saveData() {
var tableData = [];
var cells = document.querySelectorAll('#plannerTable [contenteditable ="true"]');
cells.forEach(function (cell) {
tableData.push(cell.innerHTML.replace(/<br>/g, '\n'));
});
localStorage.setItem('tableData', JSON.stringify(tableData));
}

function loadData() {
	var tableData = localStorage.getItem('tableData');
	if (tableData) {
		tableData = JSON.parse(tableData);
		var cells = document.querySelectorAll('#plannerTable [contenteditable ="true"]');
		for (var i = 0; i < cells.length && i < tableData.length; i++) {
			cells[i].innerHTML = String(tableData[i]).replace(/\n/g , '<br>');
		}
	}
}

