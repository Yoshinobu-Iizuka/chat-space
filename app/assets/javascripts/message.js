$(document).on('turbolinks:load', function() {
  var buildHTML = function(message) {
  if ( message.image ) {
    var html =
    `<div class="chat-main__body__name">${message.user_name}</div>
    <div class="chat-main__body__name__timestamp">${message.created_at}</div>
    <div class="chat-main__body__comment">${message.content}</div>
    <div class="image">${message.image}</div>`
  } else {
    var html =
     `<div class="chat-main__body__name">${message.user_name}</div>
    <div class="chat-main__body__name__timestamp">${message.created_at}</div>
    <div class="chat-main__body__comment">${message.content}</div>`
  }
    return html;
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: './messages',
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.chat-main__body').append(html);
       $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 2000, 'swing');
       $('form')[0].reset();
     })
      .fail(function(){
        alert('error');
      });
      return false;
  });
})

