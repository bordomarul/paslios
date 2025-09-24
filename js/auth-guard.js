/**
 * Authentication Guard - Simplified Version
 * Basit ve güvenilir kullanıcı giriş kontrolü
 */

(function() {
    'use strict';
    
    // Basit authentication kontrolü
    function checkAuthentication() {
        try {
            const currentUser = localStorage.getItem('currentUser');
            const session = localStorage.getItem('paslios_session');
            
            // Hiç auth data yoksa giriş sayfasına yönlendir
            if (!currentUser && !session) {
                console.log('No authentication data found, redirecting to login');
                redirectToLogin();
                return false;
            }
            
            // Session kontrolü
            if (session) {
                try {
                    const sessionData = JSON.parse(session);
                    const now = new Date().getTime();
                    
                    // Session süresi kontrolü
                    if (sessionData.expiresAt && now > sessionData.expiresAt) {
                        console.log('Session expired, clearing auth data');
                        clearAuthData();
                        redirectToLogin();
                        return false;
                    }
                    
                    // Session geçerli, user ID'yi ayarla
                    if (sessionData.userId) {
                        window.currentUserId = sessionData.userId;
                        localStorage.setItem('currentUserId', sessionData.userId);
                    }
                    
                    return true;
                    
                } catch (e) {
                    console.error('Invalid session data:', e);
                    clearAuthData();
                    redirectToLogin();
                    return false;
                }
            }
            
            // Sadece currentUser varsa (eski sistem uyumluluğu)
            if (currentUser) {
                try {
                    const userData = JSON.parse(currentUser);
                    if (userData && userData.id) {
                        window.currentUserId = userData.id;
                        localStorage.setItem('currentUserId', userData.id);
                        return true;
                    }
                } catch (e) {
                    console.error('Invalid user data:', e);
                    clearAuthData();
                    redirectToLogin();
                    return false;
                }
            }
            
            redirectToLogin();
            return false;
            
        } catch (error) {
            console.error('Authentication check failed:', error);
            clearAuthData();
            redirectToLogin();
            return false;
        }
    }
    
    // Giriş sayfasına yönlendir (döngü önleme ile)
    function redirectToLogin() {
        const currentPath = window.location.pathname;
        
        // Zaten giriş sayfasındaysak döngüyü önle
        if (currentPath === '/' || currentPath === '/index.html') {
            console.log('Already on login page, preventing redirect loop');
            return;
        }
        
        console.log('Redirecting to login page from:', currentPath);
        window.location.href = '/';
    }
    
    // Auth verilerini temizle
    function clearAuthData() {
        localStorage.removeItem('paslios_session');
        localStorage.removeItem('currentUser');
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
