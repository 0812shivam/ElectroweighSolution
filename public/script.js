document.getElementById("downloadBtn").addEventListener("click", function () {
	// Path to the PDF file
	const pdfUrl = "ELESOL Company catalogue.pdf";
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
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);

        fetch('/send-email', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.text();
        })
        .then(data => {
            messageDiv.style.display = 'block'; // Show the success message
            form.reset(); // Optionally reset the form
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('There was a problem with your submission. Please try again.');
        });
    });
});
