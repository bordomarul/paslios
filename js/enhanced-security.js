/**
 * Enhanced Security Utils - Production Grade
 * Gelişmiş güvenlik fonksiyonları ve açık düzeltmeleri
 */

class EnhancedSecurity {
    
    // CSRF Token Management
    static csrfTokens = new Map();
    
    /**
     * Form CSRF koruması - her form için unique token
     */
    static generateCSRFToken(formId) {
        const token = SecurityUtils.generateCSRFToken();
        const expiry = Date.now() + (30 * 60 * 1000); // 30 dakika
        
        this.csrfTokens.set(formId, {
            token: token,
            expiry: expiry
        });
        
        return token;
    }
    
    /**
     * CSRF token doğrulama
     */
    static validateCSRFToken(formId, providedToken) {
        const storedData = this.csrfTokens.get(formId);
        
        if (!storedData) {
            console.warn('CSRF: Token bulunamadı');
            return false;
        }
        
        if (Date.now() > storedData.expiry) {
            this.csrfTokens.delete(formId);
            console.warn('CSRF: Token süresi dolmuş');
            return false;
        }
        
        if (storedData.token !== providedToken) {
            console.warn('CSRF: Token uyuşmuyor');
            return false;
        }
        
        // Token kullanıldıktan sonra sil (one-time use)
        this.csrfTokens.delete(formId);
        return true;
    }
    
    /**
     * Form'a CSRF token hidden input ekle
     */
    static addCSRFToForm(formElement) {
        const formId = formElement.id || 'form_' + Date.now();
        const token = this.generateCSRFToken(formId);
        
        // Mevcut CSRF input'u varsa kaldır
        const existingToken = formElement.querySelector('input[name="csrf_token"]');
        if (existingToken) {
            existingToken.remove();
        }
        
        // Yeni CSRF input ekle
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrf_token';
        csrfInput.value = token;
        csrfInput.setAttribute('data-form-id', formId);
        
        formElement.appendChild(csrfInput);
        return token;
    }
    
    /**
     * Güçlü XSS koruması - whitelist yaklaşımı
     */
    static strictSanitize(input) {
        if (typeof input !== 'string') return input;
        
        // HTML taglarını tamamen kaldır
        let cleaned = input.replace(/<[^>]*>/g, '');
        
        // Tehlikeli karakterleri encode et
        cleaned = cleaned
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
        
        // Script injection girişimlerini temizle
        cleaned = cleaned.replace(/javascript:/gi, '');
        cleaned = cleaned.replace(/vbscript:/gi, '');
        cleaned = cleaned.replace(/on\w+=/gi, '');
        
        return cleaned.trim();
    }
    
    /**
     * Güvenli LocalStorage - Encryption ile
     */
    static secureStorage = {
        // Basit encryption key (production'da environment variable olmalı)
        getKey() {
            return 'paslios_secure_key_' + btoa(navigator.userAgent).slice(0, 16);
        },
        
        // Basit XOR encryption
        encrypt(data) {
            const key = this.getKey();
            const jsonString = JSON.stringify(data);
            let encrypted = '';
            
            for (let i = 0; i < jsonString.length; i++) {
                const charCode = jsonString.charCodeAt(i);
                const keyCode = key.charCodeAt(i % key.length);
                encrypted += String.fromCharCode(charCode ^ keyCode);
            }
            
            return btoa(encrypted);
        },
        
        decrypt(encryptedData) {
            try {
                const key = this.getKey();
                const encrypted = atob(encryptedData);
                let decrypted = '';
                
                for (let i = 0; i < encrypted.length; i++) {
                    const charCode = encrypted.charCodeAt(i);
                    const keyCode = key.charCodeAt(i % key.length);
                    decrypted += String.fromCharCode(charCode ^ keyCode);
                }
                
                return JSON.parse(decrypted);
            } catch (e) {
                console.error('Decryption failed:', e);
                return null;
            }
        },
        
        setItem(key, value) {
            const encrypted = this.encrypt(value);
            localStorage.setItem('sec_' + key, encrypted);
        },
        
        getItem(key) {
            const encrypted = localStorage.getItem('sec_' + key);
            if (!encrypted) return null;
            return this.decrypt(encrypted);
        },
        
        removeItem(key) {
            localStorage.removeItem('sec_' + key);
        }
    };
    
    /**
     * Gelişmiş password hashing (PBKDF2-like)
     */
    static async hashPasswordSecure(password) {
        const salt = SecurityUtils.generateSecureId();
        const iterations = 10000; // Daha yüksek iteration count
        
        // TextEncoder ile binary'ye çevir
        const encoder = new TextEncoder();
        const data = encoder.encode(password + salt);
        
        // Web Crypto API ile hash
        let hash = await crypto.subtle.digest('SHA-256', data);
        
        // Multiple iterations
        for (let i = 0; i < iterations; i++) {
            const iterationData = encoder.encode(
                Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('') + 
                salt + 
                i
            );
            hash = await crypto.subtle.digest('SHA-256', iterationData);
        }
        
        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return {
            hash: hashHex,
            salt: salt,
            iterations: iterations,
            algorithm: 'PBKDF2-SHA256'
        };
    }
    
    /**
     * Güvenli password verification
     */
    static async verifyPasswordSecure(password, storedData) {
        if (!storedData || !storedData.hash || !storedData.salt) {
            return false;
        }
        
        const iterations = storedData.iterations || 10000;
        const salt = storedData.salt;
        
        const encoder = new TextEncoder();
        const data = encoder.encode(password + salt);
        
        let hash = await crypto.subtle.digest('SHA-256', data);
        
        for (let i = 0; i < iterations; i++) {
            const iterationData = encoder.encode(
                Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('') + 
                salt + 
                i
            );
            hash = await crypto.subtle.digest('SHA-256', iterationData);
        }
        
        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return hashHex === storedData.hash;
    }
    
    /**
     * Sensitive data için masking
     */
    static maskSensitiveData(data) {
        if (typeof data === 'object' && data !== null) {
            const masked = { ...data };
            
            // Hassas alanları maskele
            const sensitiveFields = ['password', 'hash', 'email', 'phone', 'ssn', 'creditCard'];
            
            for (const field of sensitiveFields) {
                if (masked[field]) {
                    const value = masked[field].toString();
                    if (value.length > 4) {
                        masked[field] = '***' + value.slice(-4);
                    } else {
                        masked[field] = '***';
                    }
                }
            }
            
            return masked;
        }
        
        return data;
    }
    
    /**
     * Content Security Policy headers (meta tag ile)
     */
    static setupCSP() {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'", // Geliştirme için, production'da kaldırılmalı
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self'",
            "connect-src 'self'",
            "frame-ancestors 'none'"
        ].join('; ');
        
        document.head.appendChild(meta);
    }
    
    /**
     * Security headers setup
     */
    static setupSecurityHeaders() {
        // CSP
        this.setupCSP();
        
        // X-Frame-Options
        const frameOptions = document.createElement('meta');
        frameOptions.httpEquiv = 'X-Frame-Options';
        frameOptions.content = 'DENY';
        document.head.appendChild(frameOptions);
        
        // X-Content-Type-Options
        const contentType = document.createElement('meta');
        contentType.httpEquiv = 'X-Content-Type-Options';
        contentType.content = 'nosniff';
        document.head.appendChild(contentType);
    }
}

// Auto-initialize security
document.addEventListener('DOMContentLoaded', function() {
    EnhancedSecurity.setupSecurityHeaders();
    
    // Tüm formlara otomatik CSRF koruması ekle
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (!form.querySelector('input[name="csrf_token"]')) {
            EnhancedSecurity.addCSRFToForm(form);
        }
    });
});

// Global error handling - security events
window.addEventListener('error', function(e) {
    // XSS girişimlerini logla
    if (e.message && e.message.includes('script')) {
        console.warn('Potential XSS attempt detected:', e);
    }
});

// Export for use
window.EnhancedSecurity = EnhancedSecurity;
