// AfriPharma Health Systems - Main JavaScript
// Includes: Mobile Menu, Form Validation, Smooth Scrolling, Plausible Analytics Setup

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Toggle icon
      const icon = this.textContent;
      this.textContent = icon === '☰' ? '✕' : '☰';
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu && !navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      if (mobileMenuToggle) {
        mobileMenuToggle.textContent = '☰';
      }
    }
  });
  
  // Active Navigation Link
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation || 
        (currentLocation.includes(link.getAttribute('href')) && link.getAttribute('href') !== '/')) {
      link.classList.add('active');
    }
  });
  
  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      // Basic validation
      let isValid = true;
      const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
      
      requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input || !input.value.trim()) {
          isValid = false;
          if (input) {
            input.style.borderColor = '#E63946';
          }
        } else if (input) {
          input.style.borderColor = '';
        }
      });
      
      // Email validation
      const emailInput = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && !emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.style.borderColor = '#E63946';
        alert('Please enter a valid email address.');
        return;
      }
      
      if (!isValid) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Submit form (you'll need to integrate with your backend)
      console.log('Form data:', data);
      alert('Thank you for your inquiry! We will respond within 48 business hours.');
      
      // Reset form
      this.reset();
      
      // In production, you would send this to your backend:
      // fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
    });
  }
  
  // Fade-in Animation on Scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all cards and sections
  document.querySelectorAll('.card, .impact-card, .team-member, .product-card').forEach(el => {
    observer.observe(el);
  });
  
  // Current Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Portal Login
  const portalForm = document.getElementById('portal-login-form');
  const portalCheckbox = document.getElementById('portal-terms-acceptance');
  const portalButton = document.getElementById('portal-submit-btn');
  
  if (portalCheckbox && portalButton) {
    portalCheckbox.addEventListener('change', function() {
      portalButton.disabled = !this.checked;
    });
  }
  
  if (portalForm) {
    portalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('portal-email').value;
      const password = document.getElementById('portal-password').value;
      
      // In production, authenticate with backend
      console.log('Portal login attempt:', email);
      alert('Portal authentication would be handled by your backend system. Please contact invest@afripharma-health.com for access.');
      
      // Example backend call:
      // fetch('/api/portal/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      // .then(response => response.json())
      // .then(data => {
      //   if (data.success) {
      //     window.location.href = '/portal/dashboard.html';
      //   }
      // });
    });
  }
  
  // Sticky Header
  let lastScroll = 0;
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
      }
      
      lastScroll = currentScroll;
    });
  }
  
  // Print-friendly pages
  const legalPages = document.querySelector('.legal-page');
  if (legalPages) {
    // Add print button functionality
    const printButton = document.getElementById('print-page');
    if (printButton) {
      printButton.addEventListener('click', function() {
        window.print();
      });
    }
  }
  
  // Cookie Consent (Simple implementation - optional)
  function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show cookie banner (if you implement one)
      // For now, we're using Plausible which doesn't require consent
      localStorage.setItem('cookieConsent', 'accepted');
    }
  }
  
  checkCookieConsent();
  
  // Track outbound links (if using Plausible)
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.host)) {
      link.addEventListener('click', function() {
        if (window.plausible) {
          plausible('Outbound Link: Click', {props: {url: this.href}});
        }
      });
    }
  });
  
  // Track file downloads
  document.querySelectorAll('a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".xlsx"]').forEach(link => {
    link.addEventListener('click', function() {
      if (window.plausible) {
        plausible('File Download', {props: {file: this.href.split('/').pop()}});
      }
    });
  });
  
});

// Plausible Analytics Event Tracking Helper
function trackEvent(eventName, props = {}) {
  if (window.plausible) {
    window.plausible(eventName, {props: props});
  }
}

// Form submission tracking
function trackFormSubmission(formName) {
  trackEvent('Form Submission', {form: formName});
}

// Button click tracking
function trackButtonClick(buttonName) {
  trackEvent('Button Click', {button: buttonName});
}

// Export functions for use in HTML
window.afripharma = {
  trackEvent,
  trackFormSubmission,
  trackButtonClick
};
