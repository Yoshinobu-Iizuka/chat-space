$(document).on('turbolinks:load', function() {
  var chatMain = '.chat-main__body'
  var buildHTML = function(message) {
  if ( message.image ) {
    var html =
    `<div class="chat-main__body__name">${message.user_name}</div>
    <div class="chat-main__body__name__timestamp">${message.created_at}</div>
    <div class="chat-main__body__comment">${message.content}<img class="image" src="${message.image}"></div>
    <div data-message-id="${message.id}"></div>`
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
    var chatMain = '.chat-main__body'
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
       $(chatMain).append(html);
       $(chatMain).animate({scrollTop: $(chatMain)[0].scrollHeight}, 2000, 'swing');
       $('form')[0].reset();
     })
      .fail(function(){
        alert('error');
      });
      return false;
  });
  setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
  var id = $('.chat-main__body__name').last().data('messageId');
  $.ajax({
    url: location.href,
    type: "GET",
    dataType: 'json',
    data: {id: id}
    })
    .done(function(messages){
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML += buildHTML(message);
        console.log(message);
      });
      $(chatMain).append(insertHTML);
      $(chatMain).animate({scrollTop: $(chatMain)[0].scrollHeight}, 2000, 'swing');
    })
    .fail(function(data){
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(interval);
    }} , 5000 );
});

