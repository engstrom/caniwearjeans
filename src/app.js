$(document).ready(function jeansDay() {
  var whitelist = 'data/whitelist.json'
  var blacklist = 'data/blacklist.json'
  var currentDate = getCurrentDate();
  var dayOfWeek = new Date().getDay();
  var answer = '';
  
  if ((dayOfWeek === 0 || dayOfWeek >= 5) && !onList(blacklist, currentDate)) {
    answer = 'YES!';
  } else if (onList(whitelist, currentDate)) {
    answer = 'YES!';
  } else {
    answer = 'NO';
  }

  $("p").text(answer);
});

function onList(listPath, currentDate) {
  var json = getJsonData(listPath);
  var result = false;
  
  $.each(json, function(i, item) {
    if (json[i].date === currentDate) {
      result = true;
    }
  });

  return result;
}

function getJsonData(path) {
  var json = [];

  $.ajax({
    url: path,
    async: false,
    dataType: 'json',
    success: function (response) {
      json = response;
    }
  });

  return json;
}

function getCurrentDate() {
  // This function comes from http://stackoverflow.com/a/4929629/1451531
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
    dd='0'+dd
  } 

  if(mm<10) {
    mm='0'+mm
  } 

  today = mm+'/'+dd+'/'+yyyy;
  return today;
}