document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('submit-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(form);
        const searchParams = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
            searchParams.append(key, value);
        }
        const url = 'https://script.google.com/macros/s/AKfycbyHgoqIxtH_oli5UqHSX4JkJzd7WPHIFa6xoPJTdWBdfGRYzuHMhGuTZg9GxOImrZhH/exec' + '?' + searchParams.toString();
        fetch(url, {
            method: 'GET',
            mode: 'no-cors'
        })
            .then(response => {
                console.log('Form submitted successfully');
                alert('Thank you for your quote request. We will get back to you soon!');
                form.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Oops! There was a problem submitting your form. Please check the console for more details.');
            });
    });

    // Image slider code
    let currentImage = 0;
    const images = document.querySelectorAll('.image-slider img');
    function changeImage() {
        images[currentImage].classList.remove('active');
        currentImage = (currentImage + 1) % images.length;
        images[currentImage].classList.add('active');
    }
    setInterval(changeImage, 5000);

    // Scroll to form functionality
    function scrollToForm() {
        document.getElementById('quoteForm').scrollIntoView({ behavior: 'smooth' });
    }

    // Add click event listener to the button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', scrollToForm);
    }
});
