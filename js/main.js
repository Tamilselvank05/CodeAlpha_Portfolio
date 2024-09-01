(function ($) {
    "use strict";

    // Smooth scrolling to section
    $(".btn-scroll").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
        }
    });

    
    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
})(jQuery);


//contact me

// Validate email and show validation messages
// Function to validate form fields
function validate() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    document.getElementById('text1').style.visibility = 'hidden';
    document.getElementById('text2').style.visibility = 'hidden';

    // Validate Name (letters only and at least 3 characters long)
    const nameError = document.getElementById('text1');
    if (!/^[a-zA-Z]{3,}$/.test(name)) {
        nameError.textContent = 'Oops! Invalid Name';
        nameError.style.color = 'red';
        nameError.style.visibility = 'visible';
        isValid = false;
    }

    // Validate Email
    const emailError = document.getElementById('text2');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Invalid Email ID.';
        emailError.style.color = 'red';
        emailError.style.visibility = 'visible';
        isValid = false;
    }

    // Check if other fields are filled
    if (!subject || !message) {
        if (!subject) {
            nameError.textContent = 'Subject is required.';
            nameError.style.color = 'red';
            nameError.style.visibility = 'visible';
        }
        if (!message) {
            emailError.textContent = 'Message is required.';
            emailError.style.color = 'red';
            emailError.style.visibility = 'visible';
        }
        isValid = false;
    }

    return isValid;
}

// Function to send email
function sendMail(event) {
    if (event) event.preventDefault();  // Prevent default form submission

    // Validate form fields
    if (!validate()) {
        return;  // Exit function if validation fails
    }

    // Get form field values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Initialize EmailJS
    emailjs.init('4Tuu9DLGNpALJAdVx');

    const templateParams = {
        name: name,
        reply_to: email,
        subject: subject,
        message: message,
    };

    // Send email
    emailjs.send("service_zvj8h6q", "template_9b7opyd", templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status);
          

            // Clear the form fields
            document.getElementById("contactForm").reset();

            // Clear error messages
            document.getElementById('text1').style.visibility = 'hidden';
            document.getElementById('text2').style.visibility = 'hidden';
        }, function(error) {
            console.log('FAILED...', error);
            alert("Failed to send email. Please try again later.");
        });
}

// Attach the sendMail function to the form submit event
document.getElementById("contactForm").addEventListener("submit", sendMail);

    
