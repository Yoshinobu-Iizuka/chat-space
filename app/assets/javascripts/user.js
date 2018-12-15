$(function(){
  var user_list = $("#user-search-result");
  var chat_member = $(".chat-group-member");
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix" id="chat-member">
              <p class="chat-group-user__name">${user.name}</p>
              <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
          </div>`
    user_list.append(html);
  }
  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
              ${ user }
          </div>`
    user_list.append(html);
  }
  function appendGroupUser(user_id, user_name){
    var html =`<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-8">
            <input name='group[user_ids][]' type='hidden' value='${user_id}'>
              <p class="chat-group-user__name">${user_name}</p>
              <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
          </div>`
    chat_member.append(html);
  }
    $("#user-search-field").on("keyup",function() {
      var input = $("#user-search-field").val();
      $.ajax({
          type: "GET",
          url: '/users',
          data: { name: input },
          dataType: 'json'
      })
        .done(function(users) {
      user_list.empty();
        if (users.length !==0) {
        users.forEach(function(user){
              appendUser(user);
            })
        }else{
        appendNoUser("一致するメンバーがいません");
        }
      })
      .fail(function(){
          alert('error');
      })
  });
    $("#user-search-result").on("click",".user-search-add",function(){
      $(this).parent().remove();
      var user_id = $(this).attr("data-user-id");
      var user_name = $(this).attr("data-user-name");
      appendGroupUser(user_id, user_name);
    })
    $(document).on("click",".user-search-remove",function(){
      $("#chat-group-user-8").remove();
    })
});
