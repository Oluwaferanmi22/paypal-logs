// PayPal Login Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const emailForm = document.getElementById('emailForm');
    const passwordForm = document.getElementById('passwordForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nextBtn = document.querySelector('.btn-next');
    const loginBtn = document.querySelector('.btn-login');
    const changeEmailBtn = document.getElementById('changeEmailBtn');
    const displayEmail = document.getElementById('displayEmail');
    const signupBtn = document.getElementById('signupBtn');
    
    // Step elements
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    
    // Current step tracking
    let currentStep = 1;

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return emailRegex.test(email) || phoneRegex.test(email.replace(/\D/g, ''));
    }

    // Real-time email validation
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        
        if (email && !validateEmail(email)) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#e1e5e9';
        }
    });

    // Password strength indicator (simplified)
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        if (password.length > 0) {
            // Simple password validation
            if (password.length < 6) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#e1e5e9';
            }
        } else {
            this.style.borderColor = '#e1e5e9';
        }
    });

    // Step transition functions
    function goToStep(step) {
        if (step === 1) {
            step1.style.display = 'block';
            step2.style.display = 'none';
            step1.classList.remove('hidden');
            step1.classList.add('visible');
            step2.classList.add('hidden');
            step2.classList.remove('visible');
            currentStep = 1;
        } else if (step === 2) {
            step1.style.display = 'none';
            step2.style.display = 'block';
            step1.classList.add('hidden');
            step1.classList.remove('visible');
            step2.classList.remove('hidden');
            step2.classList.add('visible');
            currentStep = 2;
        }
    }

    // Email form submission (Step 1)
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validate email
        if (!email) {
            showNotification('Please enter your email or mobile number', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email or mobile number', 'error');
            return;
        }
        
        // Store email and move to step 2
        displayEmail.textContent = email;
        console.log('Moving to step 2...');
        
        // Immediately show step 2
        step1.style.display = 'none';
        step2.style.display = 'block';
        currentStep = 2;
        
        console.log('Step 2 should be visible now');
        
        // Focus on password field
        setTimeout(() => {
            passwordInput.focus();
        }, 50);
    });

    // Password form submission (Step 2)
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = displayEmail.textContent;
        const password = passwordInput.value;
        
        // Validate password
        if (!password) {
            showNotification('Please enter your password', 'error');
            return;
        }
        
        if (password.length < 6) {
            showNotification('Password must be at least 6 characters long', 'error');
            return;
        }
        
        // Simulate login process
        simulateLogin(email, password);
    });

    // Change email button
    changeEmailBtn.addEventListener('click', function() {
        // Go back to step 1
        step1.style.display = 'block';
        step2.style.display = 'none';
        currentStep = 1;
        emailInput.focus();
    });

    function simulateLogin(email, password) {
        // Disable form and show loading
        loginBtn.disabled = true;
        loginBtn.classList.add('loading');
        loginBtn.textContent = '';
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            loginBtn.disabled = false;
            loginBtn.classList.remove('loading');
            loginBtn.textContent = 'Log In';
            
            // Simulate success/failure
            const success = Math.random() > 0.3; // 70% success rate for demo
            
            if (success) {
                showNotification('Login successful! Redirecting...', 'success');
                // In a real app, you would redirect to dashboard
                setTimeout(() => {
                    alert('Login successful! (This is a demo)');
                }, 1500);
            } else {
                showNotification('Invalid credentials. Please try again.', 'error');
            }
        }, 2000);
    }

    // Sign up button handler
    signupBtn.addEventListener('click', function() {
        showNotification('Sign up clicked (Demo)', 'info');
        // In a real app, you would redirect to sign up page
    });

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db',
            warning: '#f39c12'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            font-weight: 500;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        
        // Add animation keyframes
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Remember email functionality
    function saveEmailToStorage(email) {
        localStorage.setItem('paypal_remember_email', email);
    }

    function loadEmailFromStorage() {
        return localStorage.getItem('paypal_remember_email');
    }

    // Load remembered email on page load
    const rememberedEmail = loadEmailFromStorage();
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
    }

    // Auto-save email as user types
    emailInput.addEventListener('input', function() {
        saveEmailToStorage(this.value);
    });

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Enter key on form inputs
        if (e.key === 'Enter') {
            if (currentStep === 1 && e.target === emailInput) {
                e.preventDefault();
                emailForm.dispatchEvent(new Event('submit'));
            } else if (currentStep === 2 && e.target === passwordInput) {
                e.preventDefault();
                passwordForm.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape key to close notifications or go back
        if (e.key === 'Escape') {
            const notifications = document.querySelectorAll('.notification');
            if (notifications.length > 0) {
                notifications.forEach(notification => notification.remove());
            } else if (currentStep === 2) {
                goToStep(1);
            }
        }
    });

    // Focus management for accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusableElement = document.querySelector(focusableElements);
    const focusableContent = document.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });

    // Remove the conflicting loading state that interferes with form submission
    // The loading state is now handled within the form submission functions

    // Add ripple effect to buttons
    function addRippleEffect(button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Add ripple effect to all buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(addRippleEffect);

    // Add ripple animation keyframes
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    console.log('PayPal Login Page loaded successfully!');
    
    // Test if elements exist
    console.log('Email form:', emailForm);
    console.log('Step 1:', step1);
    console.log('Step 2:', step2);
    console.log('Email input:', emailInput);
});
