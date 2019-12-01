$("#login-button").click(function(event){
  $('h1.name').html("<b>Welcome Home</b><br>"+ $('#user').val());

  event.preventDefault();
    $('form').fadeOut(500);

  $('.wrapper').addClass('form-success');
});
