document.getElementById("downloadBtn").addEventListener("click", function () {
	// Path to the PDF file
	const pdfUrl = "ELESOL2024.pdf";
	// Create an invisible link element
	const link = document.createElement("a");
	link.href = pdfUrl;
	// Set the download attribute with the filename
	link.download = "ELESOL.pdf";
	// Append the link to the body
	document.body.appendChild(link);
	// Programmatically click the link to trigger the download
	link.click();
	// Remove the link from the document
	document.body.removeChild(link);
});

document.addEventListener("DOMContentLoaded", function () {
	const links = document.querySelectorAll(".navbar a");
	links.forEach((link) => {
		link.addEventListener("click", function () {
			links.forEach((l) => l.classList.remove("active")); // Remove active class from all links
			this.classList.add("active"); // Add active class to the clicked link
		});
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const sections = document.querySelectorAll("section");
	const navLinks = document.querySelectorAll(".navbar a");
	// Function to update active link
	function setActiveLink() {
		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.offsetHeight;

			if (window.scrollY >= sectionTop - sectionHeight / 5) {
				const currentId = section.getAttribute("id");
				navLinks.forEach((link) => {
					link.classList.remove("active");
					if (link.getAttribute("href").substring(1) === currentId) {
						link.classList.add("active");
					}
				});
			}
		});
	}
	// Initial active link
	setActiveLink();
	// Add scroll event listener
	window.addEventListener("scroll", setActiveLink);
});

// 


// Function to handle counting animation
function animateCount(counter) {
    const target = +counter.getAttribute('data-target');
    const increment = target / 800; // Adjust the divisor for desired speed

    const updateCounter = () => {
        const currentValue = +counter.innerText;

        if (currentValue < target) {
            counter.innerText = Math.ceil(currentValue + increment);
            setTimeout(updateCounter, 5); // Adjust the delay for desired speed
        } else {
            counter.innerText = target + "+"; // Add the + sign after reaching the target
        }
    };

    updateCounter();
}

// Create an IntersectionObserver to detect when the counters come into view
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            animateCount(counter);
            observer.unobserve(counter); // Stop observing after the animation has started
        }
    });
}, { threshold: 0.5 }); // Adjust the threshold for when the counter should start (0.5 means 50% visible)

// Start observing each counter
const counters = document.querySelectorAll('.count');
counters.forEach(counter => {
    observer.observe(counter);
});

//contact form message

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const formData = new FormData(this);
    const formMessage = document.getElementById('form-message');

    // Make the AJAX request
    fetch('/send-email', {
        method: 'POST',
        body: new URLSearchParams(formData), // Converts FormData to URL-encoded string
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        if (response.ok) {
            // Display custom success message
            formMessage.innerHTML = `<p style="color: rgb(16, 50, 105);">Enquiry received. Someone from our team will contact you shortly. Thank you!</p>`;
            this.reset(); // Reset the form fields
        } else {
            throw new Error('Error in sending email');
        }
    })
    .catch(error => {
        // Display error message
        formMessage.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
});

//contact form validation
document.getElementById('contactForm').addEventListener('submit', function(event) {
    const email = document.querySelector('input[name="email"]');
    const contact = document.querySelector('input[name="contact"]');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactPattern = /^[0-9]{10}$/;

    // Validate email
    if (!emailPattern.test(email.value)) {
        alert('Please enter a valid email address.');
        email.focus();
        event.preventDefault();
        return;
    }

    // Validate contact number
    if (!contactPattern.test(contact.value)) {
        alert('Please enter a valid 10-digit phone number.');
        contact.focus();
        event.preventDefault();
        return;
    }

    // If both are valid, the form will be submitted
});



