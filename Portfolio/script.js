// Smooth scroll for navigation links
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Adjust offset for navbar height
        behavior: "smooth",
      });
    }
  });
});

// Animation for projects section
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("slide-in");
        observer.unobserve(entry.target); // To trigger the animation only once
      }
    });
  },
  {
    threshold: 0.2, // Trigger animation when 20% of the element is visible
  }
);

const projectItems = document.querySelectorAll(".project-item");

projectItems.forEach((item) => observer.observe(item));
// JavaScript for Contact Form
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validate fields
    if (name && email && message) {
      sendEmail(name, email, message);
    } else {
      document.getElementById("response-message").innerText =
        "Please fill out all fields.";
      document.getElementById("response-message").style.color = "red";
    }
  });

// Send email using EmailJS
function sendEmail(name, email, message) {
  // Use your EmailJS service and template IDs here
  const serviceID = "your_service_id";
  const templateID = "your_template_id";

  emailjs
    .send(serviceID, templateID, {
      name: name,
      email: email,
      message: message,
    })
    .then(() => {
      document.getElementById("response-message").innerText =
        "Your message has been sent successfully!";
      document.getElementById("response-message").style.color = "green";
      document.getElementById("contact-form").reset();
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
      document.getElementById("response-message").innerText =
        "Failed to send message. Please try again.";
      document.getElementById("response-message").style.color = "red";
    });
}
