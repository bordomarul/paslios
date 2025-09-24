/**
 * Authentication Guard - Production Ready
 * Kullanıcı giriş kontrolü ve session yönetimi
 */

(function() {
    'use strict';
    
    // Browser fingerprint oluştur (session hijacking koruması)
    function generateFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Browser fingerprint', 2, 2);
        
        return btoa(
            navigator.userAgent + 
            navigator.language + 
            screen.width + 'x' + screen.height + 
            new Date().getTimezoneOffset() +
            canvas.toDataURL()
        ).slice(0, 32);
    }
    
    // Production authentication kontrolü
    function checkAuthentication() {
        try {
            const session = localStorage.getItem('paslios_session');
            let isLoggedIn = false;
            let userId = null;
            
            if (session) {
                const sessionData = JSON.parse(session);
                isLoggedIn = sessionData && sessionData.isLoggedIn && sessionData.userId;
                userId = sessionData.userId;
                
                // Session süresini kontrol et (24 saat)
                const now = new Date().getTime();
                if (sessionData.expiresAt && now > sessionData.expiresAt) {
                    // Session süresi dolmuş
                    clearAuthData();
                    isLoggedIn = false;
                }
                
                // Browser fingerprint kontrolü (session hijacking koruması)
                const currentFingerprint = generateFingerprint();
                if (sessionData.fingerprint && sessionData.fingerprint !== currentFingerprint) {
                    console.warn('Session hijacking attempt detected');
                    clearAuthData();
                    isLoggedIn = false;
                }
                
                // Session'ı yenile (her sayfa yüklemesinde)
                if (isLoggedIn) {
                    renewSession(sessionData);
                }
            }
            
            if (!isLoggedIn) {
                // Giriş gerekli - redirect
                const currentUrl = window.location.pathname + window.location.search;
                const redirectUrl = 'index.html?redirect=' + encodeURIComponent(currentUrl);
                window.location.href = redirectUrl;
                return false;
            }
            
            // Global olarak kullanıcı ID'sini ayarla
            window.currentUserId = userId;
            localStorage.setItem('currentUserId', userId);
            
            return true;
            
        } catch (error) {
            console.error('Authentication check failed:', error);
            // Hata durumunda güvenli taraf - giriş sayfasına yönlendir
            clearAuthData();
            window.location.href = '/';
            return false;
        }
    }
    
    // Session'ı yenile
    function renewSession(sessionData) {
        const newExpiry = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 saat
        sessionData.expiresAt = newExpiry;
        localStorage.setItem('paslios_session', JSON.stringify(sessionData));
    }
    
    // Auth verilerini temizle
    function clearAuthData() {
        localStorage.removeItem('paslios_session');
        localStorage.removeItem('currentUserId');
        
        // Diğer kullanıcı verilerini de temizle
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('paslios_')) {
                keysToRemove.push(key);
            }
        }
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }
    
    // Logout fonksiyonu
    window.logout = function() {
        clearAuthData();
        window.location.href = '/';
    };
    
    // Session durumunu kontrol et
    window.isAuthenticated = function() {
        try {
            const session = localStorage.getItem('paslios_session');
            if (!session) return false;
            
            const sessionData = JSON.parse(session);
            const now = new Date().getTime();
            
            return sessionData && 
                   sessionData.isLoggedIn && 
                   sessionData.userId &&
                   (!sessionData.expiresAt || now <= sessionData.expiresAt);
        } catch {
            return false;
        }
    };
    
    // Kullanıcı bilgilerini al
    window.getCurrentUser = function() {
        try {
            const session = localStorage.getItem('paslios_session');
            if (!session) return null;
            
            const sessionData = JSON.parse(session);
            return sessionData.user || null;
        } catch {
            return null;
        }
    };
    
    // Authentication kontrolünü çalıştır
    if (!checkAuthentication()) {
        return; // Redirect edildi
    }
    
})();