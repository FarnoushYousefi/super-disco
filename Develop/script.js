var pageContentEl = document.querySelector('.container');

$(document).ready(function () {
  var currentDay = $('#currentDay');
  var currentDate = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
  console.log(currentDate);
  currentDay.text(currentDate);

  tasks = JSON.parse(localStorage.getItem('tasks'));

  var numbers = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  var currentHour = moment().hour();
  console.log(currentHour);

  for (var i = 0; i < numbers.length; i++) {
    var row = $('<div>').addClass('row');
    var numbersEI = $('<div>').addClass('col-2 col-2 hour').text(numbers[i]);
    // <div class="col-2 col-2 hour">${numbers[i]}</div>;

    var text = $('<textarea>')
      .addClass('col-7 description')
      .attr('dataid', numbers[i]);
    //past, present, or future
    //add addition class
    if (localStorage.getItem('hour' + numbers[i])) {
      text.val(localStorage.getItem('hour' + numbers[i]));
    }
    if (currentHour > numbers[i]) {
      $(text).addClass('past');
      // } else if (Math.abs(moment().diff(time, 'hour')) <= 2) {
      //   $(text).addClass('future');
    } else if (currentHour == numbers[i]) {
      $(text).addClass('present');
    } else if (currentHour < numbers[i]) {
      $(text).addClass('future');
    }

    var saveButton = $('<button>')
      .addClass('col-2 btn saveBtn fas fa-save')
      .attr('dataid', numbers[i]);

    row.append(numbersEI, text, saveButton);

    $('.container').append(row);
  }
});

var saveTask = function (textValue, hour) {
  localStorage.setItem('hour' + hour, textValue);
};

var taskButtonHandler = function (event) {
  var targetE1 = event.target;
  if (targetE1.matches('.saveBtn')) {
    var dataid = targetE1.getAttribute('dataid');
  }
  var textValue; //initialize as empty variable
  if (document.querySelector(".description[dataid='" + dataid + "']")) {
    textValue = document.querySelector(
      ".description[dataid='" + dataid + "']"
    ).value;
    console.log(textValue);
    saveTask(textValue, dataid);
  } else {
    console.log('document.querySelector() returned null.');
  }
};

pageContentEl.addEventListener('click', taskButtonHandler);
