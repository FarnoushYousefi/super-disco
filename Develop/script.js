var tasks = {};

$(document).ready(function () {
  var currentDay = $('#currentDay');
  var currentDate = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
  console.log(currentDate);
  currentDay.text(currentDate);

  tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks) {
    tasks = {
      description: [],
    };

    $.each(tasks, function (list, arr) {
      arr.forEach((task) => {
        createTask(task.text);
      });
    });
  }

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

    var saveButton = $('<div>')
      .addClass('col-2 btn saveBtn')
      .attr('dataid', numbers[i])
      .text('save')
      .click(function (event) {
        console.log(event.target);
        // console.log(event.target.getAttribute('dataid'));
        var dataid = event.target.getAttribute('dataid');
        var textValue = document.querySelector(
          `.description[dataid='${dataid}']`
        ).value;
        console.log(textValue);
        saveTask(textValue, dataid);
      });

    row.append(numbersEI, text, saveButton);
    //append in order to row

    $('.container').append(row);
  }
});

var saveTask = function (textValue, hour) {
  localStorage.setItem('hour' + hour, textValue);
};
