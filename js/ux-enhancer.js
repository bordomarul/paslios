// Paslios Production-Ready UX Enhancements
class UXEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.addGlobalErrorHandling();
    this.enhanceFormValidation();
    this.addLoadingStates();
    this.improveUserFeedback();
    this.addOfflineSupport();
  }

  // Global error handling
  addGlobalErrorHandling() {
    // Catch unhandled errors
    window.addEventListener('error', (e) => {
      console.error('Global error:', e);
      this.showUserFriendlyError('Bir hata oluştu. Lütfen sayfayı yenileyin.');
    });

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e);
      this.showUserFriendlyError('Bağlantı hatası. Lütfen tekrar deneyin.');
      e.preventDefault();
    });

    // Network error handling
    window.addEventListener('offline', () => {
      this.showNetworkStatus(false);
    });

    window.addEventListener('online', () => {
      this.showNetworkStatus(true);
    });
  }

  // Enhanced form validation
  enhanceFormValidation() {
    document.querySelectorAll('form').forEach(form => {
      // Real-time validation
      form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('blur', () => this.validateField(field));
        field.addEventListener('input', () => this.clearFieldError(field));
      });

      // Form submission handling
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        } else {
          this.showFormLoading(form);
        }
      });
    });
  }

  // Validate individual field
  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Required field check
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Bu alan zorunludur';
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Geçerli bir email adresi girin';
      }
    }

    // Password validation
    if (field.type === 'password' && value) {
      if (value.length < 6) {
        isValid = false;
        errorMessage = 'Şifre en az 6 karakter olmalıdır';
      }
    }

    // Phone validation (Turkish format)
    if (field.type === 'tel' && value) {
      const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        isValid = false;
        errorMessage = 'Geçerli bir telefon numarası girin (05XX XXX XX XX)';
      }
    }

    this.showFieldError(field, isValid ? null : errorMessage);
    return isValid;
  }

  // Validate entire form
  validateForm(form) {
    let isValid = true;
    form.querySelectorAll('input[required], textarea[required], select[required]').forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      const firstError = form.querySelector('.field-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return isValid;
  }

  // Show field error
  showFieldError(field, message) {
    this.clearFieldError(field);
    
    if (message) {
      field.classList.add('error');
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.textContent = message;
      
      field.parentNode.appendChild(errorDiv);
    }
  }

  // Clear field error
  clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
  }

  // Loading states for forms
  showFormLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Gönderiliyor...';
      
      // Auto-remove after 30 seconds (timeout)
      setTimeout(() => {
        this.hideFormLoading(form, originalText);
      }, 30000);
    }
  }

  // Hide form loading
  hideFormLoading(form, originalText = null) {
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      
      if (originalText) {
        submitBtn.textContent = originalText;
      }
    }
  }

  // Add loading states
  addLoadingStates() {
    // Add CSS for loading states
    const style = document.createElement('style');
    style.textContent = `
      .loading {
        position: relative;
        pointer-events: none;
        opacity: 0.7;
      }
      
      .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 16px;
        margin: -8px 0 0 -8px;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      .field-error {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        animation: slideIn 0.2s ease-out;
      }
      
      .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 1px #ef4444 !important;
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-5px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .network-status {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ef4444;
        color: white;
        text-align: center;
        padding: 0.5rem;
        z-index: 9999;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
      }
      
      .network-status.show {
        transform: translateY(0);
      }
      
      .network-status.online {
        background: #10b981;
      }
      
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
      }
      
      @keyframes skeleton-loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // Improve user feedback
  improveUserFeedback() {
    // Add success animations for form submissions
    document.addEventListener('formSubmitSuccess', (e) => {
      const form = e.detail.form;
      this.hideFormLoading(form);
      this.showSuccessMessage('İşlem başarıyla tamamlandı!');
    });

    // Add click feedback for buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('button, .btn, .nav-item')) {
        e.target.classList.add('clicked');
        setTimeout(() => e.target.classList.remove('clicked'), 150);
      }
    });
  }

  // Show user-friendly error
  showUserFriendlyError(message) {
    if (window.toastManager) {
      window.toastManager.show(message, 'error', 'Hata');
    } else {
      alert(message);
    }
  }

  // Show success message
  showSuccessMessage(message) {
    if (window.toastManager) {
      window.toastManager.show(message, 'success', 'Başarılı');
    } else {
      alert(message);
    }
  }

  // Show network status
  showNetworkStatus(isOnline) {
    let statusBar = document.querySelector('.network-status');
    
    if (!statusBar) {
      statusBar = document.createElement('div');
      statusBar.className = 'network-status';
      document.body.appendChild(statusBar);
    }

    if (isOnline) {
      statusBar.textContent = 'Bağlantı yeniden kuruldu';
      statusBar.classList.add('online');
      statusBar.classList.add('show');
      
      setTimeout(() => {
        statusBar.classList.remove('show');
      }, 3000);
    } else {
      statusBar.textContent = 'İnternet bağlantısı yok';
      statusBar.classList.remove('online');
      statusBar.classList.add('show');
    }
  }

  // Basic offline support
  addOfflineSupport() {
    if ('serviceWorker' in navigator) {
      // Register service worker for offline support
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('Service worker registration failed:', err);
      });
    }

    // Cache critical data
    this.cacheImportantData();
  }

  // Cache important data for offline use
  cacheImportantData() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      // Cache user data
      localStorage.setItem('cachedUserData', currentUser);
    }
  }

  // Skeleton loading for slow content
  static showSkeleton(element) {
    element.classList.add('skeleton');
    element.innerHTML = '<div style="height: 20px; margin: 5px 0;"></div>'.repeat(3);
  }

  static hideSkeleton(element, originalContent) {
    element.classList.remove('skeleton');
    element.innerHTML = originalContent;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new UXEnhancer();
});

// Export for global use
window.UXEnhancer = UXEnhancer;
