document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.quote-form');

    if (!form) return;

    const nameInput = document.getElementById('full-name');
    const messageInput = document.getElementById('message');

    const showError = (input, message) => {
        const field = input.closest('.field');
        if (!field) return;

        let errorText = field.querySelector('.field-error');

        if (!errorText) {
            errorText = document.createElement('small');
            errorText.className = 'field-error';
            field.appendChild(errorText);
        }

        errorText.textContent = message;
        input.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
    };

    const clearError = (input) => {
        const field = input.closest('.field');
        if (!field) return;

        const errorText = field.querySelector('.field-error');

        if (errorText) {
            errorText.textContent = '';
        }

        input.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
    };

    const validateForm = () => {
        let isValid = true;

        if (!nameInput.value.trim()) {
            showError(nameInput, 'Please add your name.');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        if (!messageInput.value.trim()) {
            showError(messageInput, 'Please add your message.');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        return isValid;
    };

    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim()) {
            clearError(nameInput);
        }
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim()) {
            clearError(messageInput);
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const successText = document.createElement('p');
        successText.className = 'field-error';
        successText.style.color = '#1f8f5f';
        successText.textContent = 'Your message has been sent successfully.';

        const existingSuccess = form.querySelector('.form-success');
        if (existingSuccess) {
            existingSuccess.remove();
        }

        successText.classList.add('form-success');
        form.appendChild(successText);
        form.reset();
    });
});
