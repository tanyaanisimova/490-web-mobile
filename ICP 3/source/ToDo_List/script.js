const wishes = ["Learn how to use JQuery", "Build a website", "Become a Web Developer"];
let count = 1;

function addToList(item) {
  $('#items').append("<li id="+count+" class='pending'>"+item+"<select id='select"+count+"' onChange='update("+count+")' class='dropdown'><option selected value='1'>Pending</option><option value='2'>Done</option><option value='3'>Delete</option></select></li>");
  count = count + 1;
}

function updateTotal() {
  const completed = $('.completed').length;
  const pending = $('.pending').length;

  if (completed > 0 || pending > 0) {
    $('.total').text(" Pending: " + pending + " Completed: " + completed);
  }
}

function update(index) {
  const item = $("#" + index);
  const action = $("#select" + index).val();
  if (action == 1) {
    item.removeClass("completed");
    if (!item.hasClass("pending")) {
      item.addClass("pending");
    }

  } else if (action == 2) {
    item.removeClass("pending");
    if (!item.hasClass("completed")) {
      item.addClass("completed");
    }

  } else if (action ==3) {
    item.remove();
  }
  updateTotal();
}

$(document).ready(function(){
  wishes.forEach(function(element) {
    addToList(element);
  });
  updateTotal();

  $(document).on('click','#add-to-list',function(){
    const item = $("#item").val();

    $("#item").val(""); /* clear value */
    $("#item").focus();

    addToList(item);
    updateTotal();
  });
});
