// Paslios Mobile UX Enhancement for Launch
class MobileUXEnhancer {
  constructor() {
    this.isTouch = 'ontouchstart' in window;
    this.init();
  }

  init() {
    this.enhanceTouchInteractions();
    this.optimizeScrolling();
    this.addVisualFeedback();
    this.improveTapTargets();
    this.handleOrientationChange();
  }

  // Touch interactions iyileştirmeleri
  enhanceTouchInteractions() {
    // Prevent double-tap zoom on buttons
    document.querySelectorAll('button, .btn, .tab, .nav-item').forEach(element => {
      element.style.touchAction = 'manipulation';
    });

    // Add ripple effect for touch feedback
    document.addEventListener('touchstart', (e) => {
      if (e.target.classList.contains('btn-primary') || e.target.classList.contains('nav-item')) {
        this.createRipple(e);
      }
    });

    // Improve tap responsiveness
    document.addEventListener('touchend', (e) => {
      e.target.classList.remove('active');
    }, { passive: true });
  }

  // Visual feedback sistemi
  addVisualFeedback() {
    const style = document.createElement('style');
    style.textContent = `
      .touch-feedback {
        position: relative;
        overflow: hidden;
      }
      
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.3s ease-out;
        pointer-events: none;
      }
      
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      /* Improved touch targets */
      .nav-item, .btn, button {
        min-height: 44px;
        min-width: 44px;
      }
      
      /* Loading states */
      .loading {
        position: relative;
        pointer-events: none;
      }
      
      .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid #fff;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      /* Better form feedback */
      .form-error {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: slideIn 0.2s ease-out;
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Ripple effect
  createRipple(e) {
    const button = e.target;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.touches[0].clientX - rect.left - size / 2;
    const y = e.touches[0].clientY - rect.top - size / 2;

    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    button.classList.add('touch-feedback');
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 300);
  }

  // Smooth scrolling optimization
  optimizeScrolling() {
    // Momentum scrolling for iOS
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Prevent overscroll bounce
    document.addEventListener('touchmove', (e) => {
      if (e.target === document.body) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  // Improved tap targets
  improveTapTargets() {
    const smallElements = document.querySelectorAll('a, button, input, select, textarea');
    smallElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.height < 44 || rect.width < 44) {
        element.style.padding = '0.75rem';
        element.style.minHeight = '44px';
      }
    });
  }

  // Orientation change handling
  handleOrientationChange() {
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        // Force layout recalculation
        document.body.style.height = window.innerHeight + 'px';
        
        // Scroll to top if needed
        if (window.scrollY > 0) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 200);
    });
  }

  // Form validation iyileştirmeleri
  static enhanceFormValidation() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function(e) {
        if (!this.checkValidity()) {
          e.preventDefault();
          
          // Show first invalid field
          const firstInvalid = this.querySelector(':invalid');
          if (firstInvalid) {
            firstInvalid.focus();
            
            // Add error styling
            const errorMsg = document.createElement('div');
            errorMsg.className = 'form-error';
            errorMsg.textContent = 'Lütfen bu alanı doğru doldurun';
            
            // Remove existing error
            const existingError = firstInvalid.parentNode.querySelector('.form-error');
            if (existingError) existingError.remove();
            
            firstInvalid.parentNode.appendChild(errorMsg);
            
            setTimeout(() => errorMsg.remove(), 3000);
          }
        }
      });
    });
  }

  // Loading states
  static showLoading(element) {
    element.classList.add('loading');
    element.disabled = true;
  }

  static hideLoading(element) {
    element.classList.remove('loading');
    element.disabled = false;
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MobileUXEnhancer();
  MobileUXEnhancer.enhanceFormValidation();
  
  // Add mobile-specific meta tag if missing
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, user-scalable=no';
    document.head.appendChild(viewport);
  }
});

// Export for use in other scripts
window.MobileUXEnhancer = MobileUXEnhancer;
