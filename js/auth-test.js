/**
 * Authentication System Test Suite
 * Paslios Auth sisteminin güvenlik testleri
 */

class AuthTest {
    constructor() {
        this.testResults = [];
        this.passed = 0;
        this.failed = 0;
    }

    // Test helper
    assert(condition, testName, errorMessage = '') {
        if (condition) {
            this.testResults.push(`✅ PASS: ${testName}`);
            this.passed++;
        } else {
            this.testResults.push(`❌ FAIL: ${testName} - ${errorMessage}`);
            this.failed++;
        }
    }

    // Email validation testi
    testEmailValidation() {
        console.log('\n🧪 Testing Email Validation...');
        
        this.assert(
            window.SecurityUtils.isValidEmail('test@example.com'),
            'Valid email should pass',
            'test@example.com should be valid'
        );
        
        this.assert(
            !window.SecurityUtils.isValidEmail('invalid.email'),
            'Invalid email should fail',
            'invalid.email should be invalid'
        );
        
        this.assert(
            !window.SecurityUtils.isValidEmail(''),
            'Empty email should fail',
            'Empty string should be invalid'
        );
    }

    // Password strength testi
    testPasswordStrength() {
        console.log('\n🧪 Testing Password Strength...');
        
        this.assert(
            window.SecurityUtils.isStrongPassword('StrongPass123'),
            'Strong password should pass',
            'StrongPass123 should be valid'
        );
        
        this.assert(
            !window.SecurityUtils.isStrongPassword('weak'),
            'Weak password should fail',
            'weak should be invalid'
        );
        
        this.assert(
            !window.SecurityUtils.isStrongPassword('12345678'),
            'Number-only password should fail',
            '12345678 should be invalid (no letters)'
        );
    }

    // Rate limiting testi
    testRateLimit() {
        console.log('\n🧪 Testing Rate Limiting...');
        
        // Test key temizle
        localStorage.removeItem('rate_limit_test');
        
        // İlk 3 deneme başarılı olmalı
        for (let i = 0; i < 3; i++) {
            const result = window.SecurityUtils.checkRateLimit('test', 3, 60000);
            this.assert(
                result.allowed,
                `Rate limit attempt ${i + 1} should be allowed`,
                `Attempt ${i + 1} was blocked`
            );
        }
        
        // 4. deneme başarısız olmalı
        const blockedResult = window.SecurityUtils.checkRateLimit('test', 3, 60000);
        this.assert(
            !blockedResult.allowed,
            'Rate limit should block after max attempts',
            'Rate limit did not block after 3 attempts'
        );
    }

    // Registration testi
    async testRegistration() {
        console.log('\n🧪 Testing User Registration...');
        
        // Test kullanıcısı
        const testUser = {
            name: 'Test User',
            email: 'test@paslios.com',
            password: 'TestPass123',
            position: 'Orta Saha',
            location: 'Ankara'
        };

        // Kayıt işlemi
        const result = pasliosData.registerUser(testUser);
        
        this.assert(
            result.success,
            'User registration should succeed',
            result.message || 'Registration failed'
        );

        if (result.success) {
            // Aynı email ile tekrar kayıt (başarısız olmalı)
            const duplicateResult = pasliosData.registerUser(testUser);
            this.assert(
                !duplicateResult.success,
                'Duplicate email registration should fail',
                'Duplicate email was allowed'
            );
        }
    }

    // Login testi
    async testLogin() {
        console.log('\n🧪 Testing User Login...');
        
        // Geçerli giriş
        const loginResult = pasliosData.loginUser('test@paslios.com', 'TestPass123');
        this.assert(
            loginResult.success,
            'Valid login should succeed',
            loginResult.message || 'Login failed'
        );

        // Geçersiz şifre
        const invalidResult = pasliosData.loginUser('test@paslios.com', 'wrongpass');
        this.assert(
            !invalidResult.success,
            'Invalid password should fail',
            'Wrong password was accepted'
        );

        // Geçersiz email
        const invalidEmailResult = pasliosData.loginUser('wrong@email.com', 'TestPass123');
        this.assert(
            !invalidEmailResult.success,
            'Invalid email should fail',
            'Non-existent email was accepted'
        );
    }

    // Password hashing testi
    testPasswordHashing() {
        console.log('\n🧪 Testing Password Hashing...');
        
        const password = 'TestPassword123';
        const hash1 = pasliosData.hashPassword(password);
        const hash2 = pasliosData.hashPassword(password);
        
        // Her hash farklı olmalı (salt kullanıldığı için)
        this.assert(
            hash1 !== hash2,
            'Each hash should be unique (salt)',
            'Hashes are identical'
        );
        
        // Verification çalışmalı
        this.assert(
            pasliosData.verifyPassword(password, hash1),
            'Password verification should work',
            'Password verification failed'
        );
        
        // Yanlış şifre başarısız olmalı
        this.assert(
            !pasliosData.verifyPassword('wrongpassword', hash1),
            'Wrong password should fail verification',
            'Wrong password was verified'
        );
    }

    // Session testi
    testSession() {
        console.log('\n🧪 Testing Session Management...');
        
        // Session oluştur
        const sessionData = {
            isLoggedIn: true,
            userId: 'test123',
            loginTime: Date.now(),
            expiresAt: Date.now() + (24 * 60 * 60 * 1000),
            fingerprint: 'test_fingerprint'
        };
        
        localStorage.setItem('paslios_session', JSON.stringify(sessionData));
        
        // Session validation
        this.assert(
            window.SecurityUtils.validateSession(sessionData),
            'Valid session should pass',
            'Valid session was rejected'
        );
        
        // Expired session
        const expiredSession = { ...sessionData, expiresAt: Date.now() - 1000 };
        this.assert(
            !window.SecurityUtils.validateSession(expiredSession),
            'Expired session should fail',
            'Expired session was accepted'
        );
    }

    // Tüm testleri çalıştır
    async runAllTests() {
        console.log('🚀 Starting Paslios Authentication Security Tests...\n');
        
        this.testEmailValidation();
        this.testPasswordStrength();
        this.testRateLimit();
        this.testPasswordHashing();
        this.testSession();
        await this.testRegistration();
        await this.testLogin();
        
        this.printResults();
    }

    // Sonuçları yazdır
    printResults() {
        console.log('\n' + '='.repeat(50));
        console.log('🧪 PASLIOS AUTH SECURITY TEST RESULTS');
        console.log('='.repeat(50));
        
        this.testResults.forEach(result => console.log(result));
        
        console.log('\n📊 SUMMARY:');
        console.log(`✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        console.log(`📈 Success Rate: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(1)}%`);
        
        if (this.failed === 0) {
            console.log('\n🎉 All tests passed! Auth system is secure.');
        } else {
            console.log('\n⚠️  Some tests failed. Review security implementation.');
        }
    }
}

// Global test runner
window.runAuthTests = function() {
    const testSuite = new AuthTest();
    testSuite.runAllTests();
};

// Auto-run in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 Development mode detected. Type runAuthTests() to run security tests.');
}
