window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
      navbar.classList.add('custom-blue', 'navbar-light');
      navbar.classList.remove('bg-light', 'navbar-light');
  } else {
      navbar.classList.add('navbar-light');
      navbar.classList.remove('custom-blue', 'navbar-light');
  }
});


$(window).on("scroll", function() {
  $(".fade-in").each(function() {
      if ($(this).offset().top < $(window).scrollTop() + $(window).height()) {
          $(this).addClass("visible");
      }
  });
});


app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
      service: 'gmail', // Replace with your email service
      auth: {
          user: 'your-email@gmail.com', // Replace with your email
          pass: 'your-email-password' // Replace with your email password
      }
  });

  // Define email options
  const mailOptions = {
      from: email,
      to: 'your-email@gmail.com', // Where you want to receive emails
      subject: `New message from ${name}`,
      text: message
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          return res.status(500).send('An error occurred');
      }
      res.status(200).send('Message sent successfully');
  });
});
