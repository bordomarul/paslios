// Post Güvenlik Test Sistemi
class PostSecurityTest {
  constructor() {
    this.testResults = [];
    this.pasliosData = new PasliosData();
  }

  // Test sonuçlarını görüntüle
  displayResults() {
    console.log('\n🔒 POST GÜVENLİK TEST SONUÇLARI');
    console.log('=====================================');
    
    this.testResults.forEach((result, index) => {
      const status = result.passed ? '✅ BAŞARILI' : '❌ BAŞARISIZ';
      console.log(`${index + 1}. ${result.test}: ${status}`);
      if (result.details) console.log(`   → ${result.details}`);
    });

    const passedTests = this.testResults.filter(r => r.passed).length;
    const totalTests = this.testResults.length;
    console.log(`\n📊 SONUÇ: ${passedTests}/${totalTests} test başarılı`);
    
    if (passedTests === totalTests) {
      console.log('🎉 Tüm güvenlik testleri başarıyla geçildi!');
    } else {
      console.log('⚠️ Bazı güvenlik açıkları mevcut!');
    }
  }

  // Test kaydı
  addTestResult(test, passed, details = null) {
    this.testResults.push({ test, passed, details });
  }

  // 1. Giriş yapmadan post atma testi
  testUnauthenticatedPost() {
    console.log('🔍 Test 1: Giriş yapmadan post atma...');
    
    // Oturumu temizle
    localStorage.removeItem('paslios_currentUser');
    
    const result = this.pasliosData.createPost('Test post içeriği');
    const passed = !result.success && result.message.includes('giriş yap');
    
    this.addTestResult(
      'Kimlik doğrulaması olmadan post atma engelleniyor mu?',
      passed,
      passed ? 'Giriş kontrolü çalışıyor' : 'Güvenlik açığı: Giriş yapmadan post atılabiliyor!'
    );
    
    return passed;
  }

  // 2. Boş içerik testi
  testEmptyContent() {
    console.log('🔍 Test 2: Boş içerik kontrolü...');
    
    // Test kullanıcısı oluştur
    this.createTestUser();
    
    const tests = [
      { content: '', desc: 'Tamamen boş' },
      { content: '   ', desc: 'Sadece boşluk' },
      { content: '\n\t', desc: 'Sadece whitespace' },
      { content: null, desc: 'Null değer' },
      { content: undefined, desc: 'Undefined değer' }
    ];
    
    let allPassed = true;
    
    tests.forEach(test => {
      const result = this.pasliosData.createPost(test.content);
      if (result.success) {
        allPassed = false;
        console.log(`   ❌ ${test.desc} içerikle post oluşturuldu!`);
      }
    });
    
    this.addTestResult(
      'Boş içerik kontrolü',
      allPassed,
      allPassed ? 'Boş içerik engelleniyor' : 'Güvenlik açığı: Boş içerik kabul ediliyor!'
    );
    
    return allPassed;
  }

  // 3. XSS saldırı testi
  testXSSProtection() {
    console.log('🔍 Test 3: XSS koruma testi...');
    
    this.createTestUser();
    
    const xssPayloads = [
      '<script>alert("XSS")</script>',
      '<img src="x" onerror="alert(1)">',
      'javascript:alert("XSS")',
      '<iframe src="javascript:alert(1)"></iframe>',
      '<svg onload="alert(1)">',
      '"><script>alert("XSS")</script>',
      'onmouseover="alert(1)"'
    ];
    
    let allBlocked = true;
    
    xssPayloads.forEach(payload => {
      const result = this.pasliosData.createPost(payload);
      if (result.success) {
        // İçerik sanitize edildi mi kontrol et
        if (result.post.content.includes('<script') || result.post.content.includes('javascript:')) {
          allBlocked = false;
          console.log(`   ❌ XSS payload geçti: ${payload}`);
        }
      } else if (result.message.includes('güvenlik')) {
        console.log(`   ✅ Zararlı pattern engellendi: ${payload.substring(0, 30)}...`);
      }
    });
    
    this.addTestResult(
      'XSS saldırı koruması',
      allBlocked,
      allBlocked ? 'XSS payloadları başarıyla engellendi' : 'Güvenlik açığı: Bazı XSS payloadları geçti!'
    );
    
    return allBlocked;
  }

  // 4. İçerik uzunluk testi
  testContentLength() {
    console.log('🔍 Test 4: İçerik uzunluk kontrolü...');
    
    this.createTestUser();
    
    // 2000+ karakter içerik oluştur
    const longContent = 'A'.repeat(2001);
    const result = this.pasliosData.createPost(longContent);
    
    const passed = !result.success && result.message.includes('uzun');
    
    this.addTestResult(
      'Maksimum içerik uzunluğu kontrolü',
      passed,
      passed ? '2000 karakter limiti çalışıyor' : 'Güvenlik açığı: Uzun içerik kabul ediliyor!'
    );
    
    return passed;
  }

  // 5. Geçerli post türü testi
  testValidPostTypes() {
    console.log('🔍 Test 5: Post türü validasyonu...');
    
    this.createTestUser();
    
    const validTypes = ['text', 'image', 'video'];
    const invalidTypes = ['script', 'executable', 'malware', '', null, undefined];
    
    let allPassed = true;
    
    // Geçerli türleri test et
    validTypes.forEach(type => {
      const result = this.pasliosData.createPost('Test içerik', type);
      if (!result.success) {
        allPassed = false;
        console.log(`   ❌ Geçerli tür reddedildi: ${type}`);
      }
    });
    
    // Geçersiz türleri test et
    invalidTypes.forEach(type => {
      const result = this.pasliosData.createPost('Test içerik', type);
      if (result.success) {
        allPassed = false;
        console.log(`   ❌ Geçersiz tür kabul edildi: ${type}`);
      }
    });
    
    this.addTestResult(
      'Post türü validasyonu',
      allPassed,
      allPassed ? 'Tür kontrolü çalışıyor' : 'Güvenlik açığı: Geçersiz türler kabul ediliyor!'
    );
    
    return allPassed;
  }

  // 6. Post veri yapısı testi
  testPostDataStructure() {
    console.log('🔍 Test 6: Post veri yapısı kontrolü...');
    
    this.createTestUser();
    
    const result = this.pasliosData.createPost('Test içerik', 'text');
    
    if (!result.success) {
      this.addTestResult(
        'Post veri yapısı',
        false,
        'Post oluşturulamadı'
      );
      return false;
    }
    
    const post = result.post;
    const requiredFields = [
      'id', 'authorId', 'authorName', 'authorAvatar', 'content', 
      'type', 'timestamp', 'likedBy', 'comments', 'visibility',
      'reported', 'reportCount'
    ];
    
    let allFieldsPresent = true;
    const missingFields = [];
    
    requiredFields.forEach(field => {
      if (!(field in post)) {
        allFieldsPresent = false;
        missingFields.push(field);
      }
    });
    
    // Veri tiplerini kontrol et
    const typeChecks = [
      { field: 'id', type: 'number' },
      { field: 'authorId', type: 'number' },
      { field: 'content', type: 'string' },
      { field: 'type', type: 'string' },
      { field: 'likedBy', check: Array.isArray },
      { field: 'comments', check: Array.isArray },
      { field: 'reported', type: 'boolean' },
      { field: 'reportCount', type: 'number' }
    ];
    
    typeChecks.forEach(check => {
      if (check.type && typeof post[check.field] !== check.type) {
        allFieldsPresent = false;
        missingFields.push(`${check.field} (wrong type)`);
      } else if (check.check && !check.check(post[check.field])) {
        allFieldsPresent = false;
        missingFields.push(`${check.field} (wrong type)`);
      }
    });
    
    this.addTestResult(
      'Post veri yapısı doğruluğu',
      allFieldsPresent,
      allFieldsPresent ? 'Tüm gerekli alanlar mevcut ve doğru tipte' : `Eksik/hatalı alanlar: ${missingFields.join(', ')}`
    );
    
    return allFieldsPresent;
  }

  // Test kullanıcısı oluştur
  createTestUser() {
    const testUser = {
      id: 999999,
      name: 'Test User',
      email: 'test@test.com',
      avatar: '/images/default-avatar.png'
    };
    localStorage.setItem('paslios_currentUser', JSON.stringify(testUser));
  }

  // Tüm testleri çalıştır
  runAllTests() {
    console.log('🚀 Post güvenlik testleri başlatılıyor...\n');
    
    this.testUnauthenticatedPost();
    this.testEmptyContent();
    this.testXSSProtection();
    this.testContentLength();
    this.testValidPostTypes();
    this.testPostDataStructure();
    
    this.displayResults();
    
    // Test verilerini temizle
    localStorage.removeItem('paslios_currentUser');
  }
}

// Test çalıştırma fonksiyonu
function runPostSecurityTests() {
  const tester = new PostSecurityTest();
  tester.runAllTests();
}

// Sayfa yüklendiğinde otomatik test
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Post güvenlik test sistemi hazır. runPostSecurityTests() ile testleri çalıştırabilirsiniz.');
  });
}