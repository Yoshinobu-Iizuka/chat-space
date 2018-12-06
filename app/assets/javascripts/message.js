$(function() {
   function buildHTML(message){
    var html = `<p class="chat-main__body__name">${message.user_name}</p>
                <p class="chat-main__body__name__timestamp">${message.created_at}</p>
                <p class="chat-main__body__comment">${message.content}</p>`
    return html;
  }
   function buildImageHTML(message){
    var html = `<p class="chat-main__body__name">${message.user_name}</p>
                <p class="chat-main__body__name__timestamp">${message.created_at}</p>
                <p class="chat-main__body__comment">${message.content}</p>
                <img src='${message.image.url}'>`
    return html;
  }
   $('.form__message js-content').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      if (data.image.url == null) {
        var html = buildHTML(data);
      }
      else {
        var html = buildImageHTML(data);
      }
      $('.messages').append(html)
      $('.form__message js-content').val('');
      $(".messages").animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.form__submit').prop("disabled", false);
    })
    .fail(function(){
      alert('error');
    })
  })
})
