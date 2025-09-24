// Post İnteraksiyon Güvenlik Test Sistemi
class InteractionSecurityTest {
  constructor() {
    this.testResults = [];
    this.pasliosData = new PasliosData();
  }

  // Test sonuçlarını görüntüle
  displayResults() {
    console.log('\n🔒 POST İNTERAKSİYON GÜVENLİK TEST SONUÇLARI');
    console.log('===============================================');
    
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

  // 1. Yorum-Post ilişkilendirme testi
  testCommentPostRelation() {
    console.log('🔍 Test 1: Yorum-Post ilişkilendirme...');
    
    this.createTestUser();
    const testPost = this.createTestPost();
    
    // Geçerli post ID ile yorum
    const validResult = this.pasliosData.addComment(testPost.id, 'Test yorumu');
    const validPassed = validResult.success && validResult.comment.postId === testPost.id;
    
    // Geçersiz post ID ile yorum
    const invalidResult = this.pasliosData.addComment(999999, 'Test yorumu');
    const invalidPassed = !invalidResult.success;
    
    // Null/undefined post ID testi
    const nullResult = this.pasliosData.addComment(null, 'Test yorumu');
    const nullPassed = !nullResult.success;
    
    const allPassed = validPassed && invalidPassed && nullPassed;
    
    this.addTestResult(
      'Yorum-Post ilişkilendirme kontrolü',
      allPassed,
      allPassed ? 'Post ID validation çalışıyor' : 'Güvenlik açığı: Geçersiz post ID kabul ediliyor!'
    );
    
    return allPassed;
  }

  // 2. Boş yorum engelleme testi
  testEmptyCommentPrevention() {
    console.log('🔍 Test 2: Boş yorum engelleme...');
    
    this.createTestUser();
    const testPost = this.createTestPost();
    
    const emptyTests = [
      { content: '', desc: 'Tamamen boş' },
      { content: '   ', desc: 'Sadece boşluk' },
      { content: '\n\t', desc: 'Sadece whitespace' },
      { content: null, desc: 'Null değer' },
      { content: undefined, desc: 'Undefined değer' },
      { content: 'a', desc: 'Tek karakter (minimum 2)' }
    ];
    
    let allBlocked = true;
    
    emptyTests.forEach(test => {
      const result = this.pasliosData.addComment(testPost.id, test.content);
      if (result.success) {
        allBlocked = false;
        console.log(`   ❌ ${test.desc} içerikle yorum oluşturuldu!`);
      }
    });
    
    // Çok uzun yorum testi (500+ karakter)
    const longComment = 'A'.repeat(501);
    const longResult = this.pasliosData.addComment(testPost.id, longComment);
    if (longResult.success) {
      allBlocked = false;
      console.log(`   ❌ 500+ karakter yorum kabul edildi!`);
    }
    
    this.addTestResult(
      'Boş ve geçersiz yorum engelleme',
      allBlocked,
      allBlocked ? 'Tüm geçersiz yorumlar engellendi' : 'Güvenlik açığı: Bazı geçersiz yorumlar geçti!'
    );
    
    return allBlocked;
  }

  // 3. Yorum spam/flood kontrolü testi
  testCommentSpamControl() {
    console.log('🔍 Test 3: Yorum spam/flood kontrolü...');
    
    this.createTestUser();
    const testPost = this.createTestPost();
    
    let spamBlocked = true;
    
    // Aynı içerik spam testi
    const duplicateComment = 'Bu bir test yorumudur';
    this.pasliosData.addComment(testPost.id, duplicateComment);
    const duplicateResult = this.pasliosData.addComment(testPost.id, duplicateComment);
    
    if (duplicateResult.success) {
      spamBlocked = false;
      console.log('   ❌ Aynı yorum tekrar kabul edildi!');
    }
    
    // Hızlı yorum testi (rate limiting simulation)
    // Not: Gerçek zamanlı test için timestamp manipülasyonu gerekir
    
    this.addTestResult(
      'Yorum spam/flood kontrolü',
      spamBlocked,
      spamBlocked ? 'Spam kontrolü çalışıyor' : 'Güvenlik açığı: Spam yorumlar geçiyor!'
    );
    
    return spamBlocked;
  }

  // 4. XSS yorum koruması testi
  testCommentXSSProtection() {
    console.log('🔍 Test 4: Yorum XSS koruması...');
    
    this.createTestUser();
    const testPost = this.createTestPost();
    
    const xssPayloads = [
      '<script>alert("XSS")</script>',
      '<img src="x" onerror="alert(1)">',
      'javascript:alert("XSS")',
      '<iframe src="javascript:alert(1)"></iframe>',
      '<svg onload="alert(1)">'
    ];
    
    let allBlocked = true;
    
    xssPayloads.forEach(payload => {
      const result = this.pasliosData.addComment(testPost.id, payload);
      if (result.success) {
        // İçerik sanitize edildi mi kontrol et
        if (result.comment.content.includes('<script') || result.comment.content.includes('javascript:')) {
          allBlocked = false;
          console.log(`   ❌ XSS payload geçti: ${payload}`);
        }
      } else if (result.message.includes('güvenlik')) {
        console.log(`   ✅ Zararlı pattern engellendi: ${payload.substring(0, 30)}...`);
      }
    });
    
    this.addTestResult(
      'Yorum XSS saldırı koruması',
      allBlocked,
      allBlocked ? 'XSS payloadları başarıyla engellendi' : 'Güvenlik açığı: Bazı XSS payloadları geçti!'
    );
    
    return allBlocked;
  }

  // 5. Duplicate beğeni engelleme testi
  testDuplicateLikePrevention() {
    console.log('🔍 Test 5: Tekrarlı beğeni engelleme...');
    
    this.createTestUser();
    const testPost = this.createTestPost();
    
    // İlk beğeni
    const firstLike = this.pasliosData.togglePostLike(testPost.id);
    const firstPassed = firstLike.success && firstLike.isLiked === true;
    
    // İkinci beğeni (beğeniyi kaldırma)
    const secondLike = this.pasliosData.togglePostLike(testPost.id);
    const secondPassed = secondLike.success && secondLike.isLiked === false;
    
    // Kendi gönderisini beğenme testi
    const selfLike = this.pasliosData.togglePostLike(testPost.id);
    const selfBlocked = !selfLike.success && selfLike.message.includes('kendi');
    
    const allPassed = firstPassed && secondPassed && selfBlocked;
    
    this.addTestResult(
      'Tekrarlı beğeni ve self-like engelleme',
      allPassed,
      allPassed ? 'Beğeni sistemi doğru çalışıyor' : 'Güvenlik açığı: Beğeni kontrolünde hata!'
    );
    
    return allPassed;
  }

  // 6. Beğeni durumu feedback testi
  testLikeStatusFeedback() {
    console.log('🔍 Test 6: Beğeni durumu feedback...');
    
    this.createTestUser();
    const testPost = this.createTestPost();
    
    // Başlangıç durumu
    const initialStatus = this.pasliosData.isPostLikedByUser(testPost.id);
    const initialCount = this.pasliosData.getPostLikeCount(testPost.id);
    
    // Beğeni ekle
    const likeResult = this.pasliosData.togglePostLike(testPost.id);
    const afterLikeStatus = this.pasliosData.isPostLikedByUser(testPost.id);
    const afterLikeCount = this.pasliosData.getPostLikeCount(testPost.id);
    
    // Beğeniyi kaldır
    const unlikeResult = this.pasliosData.togglePostLike(testPost.id);
    const afterUnlikeStatus = this.pasliosData.isPostLikedByUser(testPost.id);
    const afterUnlikeCount = this.pasliosData.getPostLikeCount(testPost.id);
    
    const feedbackWorking = (
      initialStatus === false &&
      initialCount === 0 &&
      likeResult.isLiked === true &&
      afterLikeStatus === true &&
      afterLikeCount === 1 &&
      unlikeResult.isLiked === false &&
      afterUnlikeStatus === false &&
      afterUnlikeCount === 0
    );
    
    this.addTestResult(
      'Beğeni durumu feedback sistemi',
      feedbackWorking,
      feedbackWorking ? 'Feedback sistemi doğru çalışıyor' : 'Güvenlik açığı: Feedback sistemi hatalı!'
    );
    
    return feedbackWorking;
  }

  // 7. Geçersiz ID'ler ile test
  testInvalidIDHandling() {
    console.log('🔍 Test 7: Geçersiz ID handling...');
    
    this.createTestUser();
    
    const invalidIDs = [null, undefined, '', 'abc', -1, 0, NaN];
    let allBlocked = true;
    
    invalidIDs.forEach(id => {
      // Geçersiz ID ile yorum
      const commentResult = this.pasliosData.addComment(id, 'Test yorumu');
      if (commentResult.success) {
        allBlocked = false;
        console.log(`   ❌ Geçersiz ID ile yorum: ${id}`);
      }
      
      // Geçersiz ID ile beğeni
      const likeResult = this.pasliosData.togglePostLike(id);
      if (likeResult.success) {
        allBlocked = false;
        console.log(`   ❌ Geçersiz ID ile beğeni: ${id}`);
      }
    });
    
    this.addTestResult(
      'Geçersiz ID handling',
      allBlocked,
      allBlocked ? 'Geçersiz ID\'ler engellendi' : 'Güvenlik açığı: Geçersiz ID\'ler kabul ediliyor!'
    );
    
    return allBlocked;
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
    return testUser;
  }

  // Test gönderisi oluştur
  createTestPost() {
    const testPost = {
      id: 888888,
      authorId: 999999,
      authorName: 'Test User',
      content: 'Test gönderisi',
      type: 'text',
      timestamp: new Date().toISOString(),
      likedBy: [],
      comments: []
    };
    
    const posts = this.pasliosData.getData('posts');
    posts.unshift(testPost);
    this.pasliosData.setData('posts', posts);
    
    return testPost;
  }

  // Tüm testleri çalıştır
  runAllTests() {
    console.log('🚀 Post interaksiyon güvenlik testleri başlatılıyor...\n');
    
    this.testCommentPostRelation();
    this.testEmptyCommentPrevention();
    this.testCommentSpamControl();
    this.testCommentXSSProtection();
    this.testDuplicateLikePrevention();
    this.testLikeStatusFeedback();
    this.testInvalidIDHandling();
    
    this.displayResults();
    
    // Test verilerini temizle
    localStorage.removeItem('paslios_currentUser');
  }
}

// Test çalıştırma fonksiyonu
function runInteractionSecurityTests() {
  const tester = new InteractionSecurityTest();
  tester.runAllTests();
}

// API endpoint simulation fonksiyonları
const API = {
  // POST /api/posts/:postId/comments
  addComment: function(postId, commentData) {
    const pasliosData = new PasliosData();
    return pasliosData.addComment(postId, commentData.text);
  },
  
  // POST /api/posts/:postId/like
  toggleLike: function(postId) {
    const pasliosData = new PasliosData();
    return pasliosData.togglePostLike(postId);
  },
  
  // GET /api/posts/:postId/like-status
  getLikeStatus: function(postId) {
    const pasliosData = new PasliosData();
    return {
      isLiked: pasliosData.isPostLikedByUser(postId),
      likeCount: pasliosData.getPostLikeCount(postId)
    };
  }
};

// Sayfa yüklendiğinde hazırlık
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Post interaksiyon güvenlik test sistemi hazır. runInteractionSecurityTests() ile testleri çalıştırabilirsiniz.');
  });
}
