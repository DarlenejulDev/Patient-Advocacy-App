$("#login-button").click(function(event){
  $('h1.name').html("<b>Welcome Home</b><br>"+ $('#user').val());

  event.preventDefault();
    $('form').fadeOut(500);

  $('.wrapper').addClass('form-success');
});


<!doctype html>
<html>
<head>
    <title>Patient Advocacy</title>
  <!-- <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'> -->
  <link rel="stylesheet" href="/assets/css/login.css">
</head>
<body>

      <div class="wrapper">
      	<div class="container">
      		<h1 class="name">Welcome</h1>


      		<form class="login-form"  action="/login" method="post">
      			<input type="email" id="user" placeholder="Email" name="email"/>
      			<input type="password" placeholder="Password" name= "password">
      			<button type="submit" id="login-button">Login</button>
            <p class="message">Not registered? <a href="/signup">Create an account</a></p>
      		</form>
      	</div>

      	<ul class="bg-bubbles">
      		<li></li>
          <li></li>
      		<li></li>
      		<li></li>
      		<li></li>
      		<li></li>
      		<li></li>
      		<li></li>
      		<li></li>
      		<li></li>
      		<li></li>
      	</ul>
      </div>
  <script type="text/javascript" src="/assets/js/login_signup.js">
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
  </script>
</body>
</html>
