// Toast Notification Sistemi
class ToastManager {
  constructor() {
    this.createContainer();
  }

  createContainer() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
  }

  show(message, type = 'info', title = '', duration = 4000) {
    const toast = this.createToast(message, type, title);
    const container = document.getElementById('toast-container');
    container.appendChild(toast);

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.remove(toast);
      }, duration);
    }

    return toast;
  }

  createToast(message, type, title) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
      success: `<svg viewBox="0 0 20 20" fill="currentColor" class="toast-icon" style="color: #10b981;">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>`,
      error: `<svg viewBox="0 0 20 20" fill="currentColor" class="toast-icon" style="color: #ef4444;">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>`,
      warning: `<svg viewBox="0 0 20 20" fill="currentColor" class="toast-icon" style="color: #f59e0b;">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>`,
      info: `<svg viewBox="0 0 20 20" fill="currentColor" class="toast-icon" style="color: #3b82f6;">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
      </svg>`
    };

    toast.innerHTML = `
      ${icons[type] || icons.info}
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="toastManager.remove(this.parentElement)">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 4.586L10.293.293a1 1 0 111.414 1.414L7.414 6l4.293 4.293a1 1 0 01-1.414 1.414L6 7.414l-4.293 4.293a1 1 0 01-1.414-1.414L4.586 6 .293 1.707A1 1 0 011.707.293L6 4.586z"/>
        </svg>
      </button>
      <div class="toast-progress"></div>
    `;

    return toast;
  }

  remove(toast) {
    toast.classList.add('removing');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  }

  success(message, title = 'Başarılı!') {
    return this.show(message, 'success', title);
  }

  error(message, title = 'Hata!') {
    return this.show(message, 'error', title);
  }

  warning(message, title = 'Uyarı!') {
    return this.show(message, 'warning', title);
  }

  info(message, title = 'Bilgi') {
    return this.show(message, 'info', title);
  }
}

// Global instance
window.toastManager = new ToastManager();
