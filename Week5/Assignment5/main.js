document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const feedbackToggle = document.getElementById('feedbackToggle');
  const emailField = document.getElementById('emailField');
  const styleColor = document.getElementById('styleColor');
  const formContent = document.querySelector('.form-content');
  const colorPreview = document.getElementById('colorPreview');

  feedbackToggle.addEventListener('change', () => {
    emailField.style.display = feedbackToggle.checked ? 'block' : 'none';
  });

  styleColor.addEventListener('input', () => {
    const chosenColor = styleColor.value;
    formContent.style.border = `4px solid ${chosenColor}`;
    formContent.style.boxShadow = `0 0 20px ${chosenColor}`;
    formContent.style.transition = 'all 0.3s ease';
  });

  styleColor.addEventListener('input', () => {
    const chosenColor = styleColor.value;
    formContent.style.border = `4px solid ${chosenColor}`;
    formContent.style.boxShadow = `0 0 20px ${chosenColor}`;
    colorPreview.style.backgroundColor = chosenColor;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      alert('Please complete all required fields before submitting.');
      return;
    }

    const formData = new FormData(form);
    const responses = {};
    formData.forEach((value, key) => {
      if (responses[key]) {
        if (Array.isArray(responses[key])) {
          responses[key].push(value);
        } else {
          responses[key] = [responses[key], value];
        }
      } else {
        responses[key] = value;
      }
    });

    alert('Thanks for sharing your creative pulse! 🎉');
    console.log('Survey responses:', responses);

    form.reset();
  });
});
