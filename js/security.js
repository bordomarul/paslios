/**
 * Security Utils - Production Ready
 * XSS koruması, input sanitization ve güvenlik fonksiyonları
 */

class SecurityUtils {
    /**
     * HTML karakterlerini escape et (XSS koruması)
     */
    static escapeHtml(text) {
        if (typeof text !== 'string') return text;
        
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * HTML'yi güvenli şekilde temizle
     */
    static sanitizeHtml(html) {
        if (typeof html !== 'string') return html;
        
        // Tehlikeli tagları kaldır
        const dangerousTags = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        html = html.replace(dangerousTags, '');
        
        // Inline script'leri kaldır
        html = html.replace(/on\w+="[^"]*"/gi, '');
        html = html.replace(/on\w+='[^']*'/gi, '');
        html = html.replace(/javascript:[^"']*/gi, '');
        
        return html;
    }
    
    /**
     * SQL Injection koruması için input temizle
     */
    static sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        // Tehlikeli karakterleri kaldır
        return input
            .replace(/[<>'"&]/g, '')
            .replace(/\0/g, '')
            .replace(/\\/g, '')
            .trim();
    }
    
    /**
     * Email validation
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Güçlü şifre kontrolü
     */
    static isStrongPassword(password) {
        // En az 8 karakter, 1 büyük harf, 1 küçük harf, 1 rakam
        const minLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        
        return minLength && hasUpper && hasLower && hasNumber;
    }
    
    /**
     * Rate limiting - basit implementasyon
     */
    static checkRateLimit(action, maxAttempts = 5, timeWindow = 300000) { // 5 dakika
        const key = `rate_limit_${action}`;
        const now = Date.now();
        
        let attempts = JSON.parse(localStorage.getItem(key) || '[]');
        
        // Eski denemeleri temizle
        attempts = attempts.filter(timestamp => now - timestamp < timeWindow);
        
        if (attempts.length >= maxAttempts) {
            return {
                allowed: false,
                message: `Çok fazla deneme. ${Math.ceil(timeWindow/60000)} dakika sonra tekrar deneyin.`,
                retryAfter: timeWindow - (now - attempts[0])
            };
        }
        
        // Yeni denemeyi kaydet
        attempts.push(now);
        localStorage.setItem(key, JSON.stringify(attempts));
        
        return {
            allowed: true,
            remainingAttempts: maxAttempts - attempts.length
        };
    }
    
    /**
     * CSRF token oluştur
     */
    static generateCSRFToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    
    /**
     * Güvenli ID oluştur
     */
    static generateSecureId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    /**
     * Session güvenliği kontrolü
     */
    static validateSession(sessionData) {
        if (!sessionData) return false;
        
        const now = Date.now();
        const sessionAge = now - (sessionData.loginTime || 0);
        const maxAge = 24 * 60 * 60 * 1000; // 24 saat
        
        // Session yaşı kontrolü
        if (sessionAge > maxAge) return false;
        
        // Expiry kontrolü
        if (sessionData.expiresAt && now > sessionData.expiresAt) return false;
        
        // Gerekli alanların varlığı
        if (!sessionData.userId || !sessionData.isLoggedIn) return false;
        
        return true;
    }
    
    /**
     * Güvenli veri depolama
     */
    static secureStorage = {
        set: function(key, value) {
            try {
                const data = {
                    value: value,
                    timestamp: Date.now(),
                    checksum: SecurityUtils.generateChecksum(JSON.stringify(value))
                };
                localStorage.setItem(`secure_${key}`, JSON.stringify(data));
                return true;
            } catch (e) {
                console.error('Secure storage set failed:', e);
                return false;
            }
        },
        
        get: function(key) {
            try {
                const stored = localStorage.getItem(`secure_${key}`);
                if (!stored) return null;
                
                const data = JSON.parse(stored);
                
                // Checksum doğrula
                const expectedChecksum = SecurityUtils.generateChecksum(JSON.stringify(data.value));
                if (data.checksum !== expectedChecksum) {
                    console.warn('Data integrity check failed for key:', key);
                    return null;
                }
                
                return data.value;
            } catch (e) {
                console.error('Secure storage get failed:', e);
                return null;
            }
        },
        
        remove: function(key) {
            localStorage.removeItem(`secure_${key}`);
        }
    };
    
    /**
     * Basit checksum oluştur
     */
    static generateChecksum(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // 32bit integer'a çevir
        }
        return hash.toString(36);
    }
    
    /**
     * Content Security Policy kontrolü
     */
    static enforceCSP() {
        // Meta tag olarak CSP ekle
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:";
        document.head.appendChild(meta);
    }
}

// Global olarak erişilebilir yap
window.SecurityUtils = SecurityUtils;

// Sayfa yüklendiğinde CSP'yi aktif et
document.addEventListener('DOMContentLoaded', function() {
    SecurityUtils.enforceCSP();
});
