// Profil ve Takip Sistemi Güvenlik Test Sistemi
class ProfileSecurityTest {
  constructor() {
    this.testResults = [];
    this.pasliosData = new PasliosData();
  }

  // Test sonuçlarını görüntüle
  displayResults() {
    console.log('\n🔒 PROFİL VE TAKİP SİSTEMİ GÜVENLİK TEST SONUÇLARI');
    console.log('====================================================');
    
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

  // 1. Profil görüntüleme yetkileri testi
  testProfileViewPermissions() {
    console.log('🔍 Test 1: Profil görüntüleme yetkileri...');
    
    const testUser1 = this.createTestUser(1, 'Test User 1');
    const testUser2 = this.createTestUser(2, 'Test User 2');
    
    // Kendi profilini görüntüleme
    this.setCurrentUser(testUser1);
    const ownProfileResult = this.pasliosData.getUserProfile(testUser1.id);
    const ownProfilePassed = ownProfileResult.success && ownProfileResult.profile.isOwnProfile === true;
    
    // Başkasının profilini görüntüleme
    const otherProfileResult = this.pasliosData.getUserProfile(testUser2.id);
    const otherProfilePassed = otherProfileResult.success && otherProfileResult.profile.isOwnProfile === false;
    
    // Kendi profilinde hassas bilgiler var mı
    const hasEmail = ownProfileResult.profile.email !== undefined;
    const hasSettings = ownProfileResult.profile.settings !== undefined;
    
    // Başkasının profilinde hassas bilgiler yok mu
    const noEmailInOther = otherProfileResult.profile.email === undefined;
    const noSettingsInOther = otherProfileResult.profile.settings === undefined;
    
    // Geçersiz user ID testi
    const invalidResult = this.pasliosData.getUserProfile(999999);
    const invalidPassed = !invalidResult.success;
    
    const allPassed = ownProfilePassed && otherProfilePassed && hasEmail && hasSettings && 
                     noEmailInOther && noSettingsInOther && invalidPassed;
    
    this.addTestResult(
      'Profil görüntüleme yetki kontrolü',
      allPassed,
      allPassed ? 'Profil privacy kontrolü çalışıyor' : 'Güvenlik açığı: Profil privacy problemi!'
    );
    
    return allPassed;
  }

  // 2. Profil düzenleme güvenlik testi
  testProfileEditSecurity() {
    console.log('🔍 Test 2: Profil düzenleme güvenliği...');
    
    const testUser = this.createTestUser(1, 'Test User');
    this.setCurrentUser(testUser);
    
    let allPassed = true;
    
    // Geçerli güncelleme
    const validUpdate = this.pasliosData.updateProfile({
      name: 'Updated Name',
      bio: 'New bio content'
    });
    if (!validUpdate.success) {
      allPassed = false;
      console.log('   ❌ Geçerli profil güncellemesi başarısız!');
    }
    
    // XSS saldırı testi
    const xssUpdate = this.pasliosData.updateProfile({
      name: '<script>alert("XSS")</script>',
      bio: '<img src="x" onerror="alert(1)">'
    });
    if (xssUpdate.success) {
      // İçerik sanitize edildi mi kontrol et
      const profile = this.pasliosData.getUserProfile(testUser.id);
      if (profile.profile.name.includes('<script')) {
        allPassed = false;
        console.log('   ❌ XSS payload geçti!');
      }
    } else if (xssUpdate.message.includes('güvenlik')) {
      console.log('   ✅ XSS payload engellendi');
    }
    
    // Uzun içerik testi
    const longNameUpdate = this.pasliosData.updateProfile({
      name: 'A'.repeat(51) // 50 karakter limitini aş
    });
    if (longNameUpdate.success) {
      allPassed = false;
      console.log('   ❌ Uzun isim kabul edildi!');
    }
    
    const longBioUpdate = this.pasliosData.updateProfile({
      bio: 'A'.repeat(201) // 200 karakter limitini aş
    });
    if (longBioUpdate.success) {
      allPassed = false;
      console.log('   ❌ Uzun bio kabul edildi!');
    }
    
    // Geçersiz telefon formatı
    const invalidPhoneUpdate = this.pasliosData.updateProfile({
      phone: 'invalid-phone-123abc'
    });
    if (invalidPhoneUpdate.success) {
      allPassed = false;
      console.log('   ❌ Geçersiz telefon formatı kabul edildi!');
    }
    
    // İzin verilmeyen alan güncelleme
    const unauthorizedUpdate = this.pasliosData.updateProfile({
      email: 'hacker@evil.com', // İzin verilmeyen alan
      password: 'hacked123'      // İzin verilmeyen alan
    });
    if (unauthorizedUpdate.success) {
      // Email veya password değişti mi kontrol et
      const updatedProfile = this.pasliosData.getUserProfile(testUser.id);
      if (updatedProfile.profile.email === 'hacker@evil.com') {
        allPassed = false;
        console.log('   ❌ İzin verilmeyen email güncellemesi yapıldı!');
      }
    }
    
    this.addTestResult(
      'Profil düzenleme güvenlik kontrolü',
      allPassed,
      allPassed ? 'Profil güncelleme güvenliği çalışıyor' : 'Güvenlik açığı: Profil güncelleme problemi!'
    );
    
    return allPassed;
  }

  // 3. Şifre değişikliği güvenlik testi
  testPasswordChangeSecurity() {
    console.log('🔍 Test 3: Şifre değişikliği güvenliği...');
    
    const testUser = this.createTestUser(1, 'Test User', 'OldPassword123!');
    this.setCurrentUser(testUser);
    
    let allPassed = true;
    
    // Geçerli şifre değişikliği
    const validChange = this.pasliosData.changePassword('OldPassword123!', 'NewPassword456!');
    if (!validChange.success) {
      allPassed = false;
      console.log('   ❌ Geçerli şifre değişikliği başarısız!');
    }
    
    // Yanlış eski şifre
    const wrongOldPassword = this.pasliosData.changePassword('WrongPassword', 'NewPassword789!');
    if (wrongOldPassword.success) {
      allPassed = false;
      console.log('   ❌ Yanlış eski şifre ile değişiklik yapıldı!');
    }
    
    // Zayıf yeni şifre
    const weakPasswordTests = [
      '123456',           // Çok basit
      'password',         // Sadece harf
      'PASSWORD',         // Sadece büyük harf
      '12345678',         // Sadece rakam
      'Pass123'           // Özel karakter yok
    ];
    
    weakPasswordTests.forEach(weakPassword => {
      const result = this.pasliosData.changePassword('OldPassword123!', weakPassword);
      if (result.success) {
        allPassed = false;
        console.log(`   ❌ Zayıf şifre kabul edildi: ${weakPassword}`);
      }
    });
    
    // Eski şifre ile aynı yeni şifre
    const samePassword = this.pasliosData.changePassword('OldPassword123!', 'OldPassword123!');
    if (samePassword.success) {
      allPassed = false;
      console.log('   ❌ Eski şifre ile aynı yeni şifre kabul edildi!');
    }
    
    // Boş şifre testi
    const emptyPassword = this.pasliosData.changePassword('OldPassword123!', '');
    if (emptyPassword.success) {
      allPassed = false;
      console.log('   ❌ Boş şifre kabul edildi!');
    }
    
    this.addTestResult(
      'Şifre değişikliği güvenlik kontrolü',
      allPassed,
      allPassed ? 'Şifre güvenliği çalışıyor' : 'Güvenlik açığı: Şifre güvenlik problemi!'
    );
    
    return allPassed;
  }

  // 4. Duplicate takip engelleme testi
  testDuplicateFollowPrevention() {
    console.log('🔍 Test 4: Duplicate takip engelleme...');
    
    const testUser1 = this.createTestUser(1, 'User 1');
    const testUser2 = this.createTestUser(2, 'User 2');
    
    this.setCurrentUser(testUser1);
    
    // İlk takip
    const firstFollow = this.pasliosData.followUser(testUser2.id);
    const firstPassed = firstFollow.success;
    
    // Duplicate takip denemesi
    const duplicateFollow = this.pasliosData.followUser(testUser2.id);
    const duplicatePrevented = !duplicateFollow.success && duplicateFollow.message.includes('zaten');
    
    // Self-follow engelleme
    const selfFollow = this.pasliosData.followUser(testUser1.id);
    const selfFollowPrevented = !selfFollow.success && selfFollow.message.includes('kendinizi');
    
    // Geçersiz user ID
    const invalidFollow = this.pasliosData.followUser(999999);
    const invalidPrevented = !invalidFollow.success;
    
    // Null ID testi
    const nullFollow = this.pasliosData.followUser(null);
    const nullPrevented = !nullFollow.success;
    
    const allPassed = firstPassed && duplicatePrevented && selfFollowPrevented && 
                     invalidPrevented && nullPrevented;
    
    this.addTestResult(
      'Duplicate takip engelleme kontrolü',
      allPassed,
      allPassed ? 'Takip güvenliği çalışıyor' : 'Güvenlik açığı: Takip kontrolü problemi!'
    );
    
    return allPassed;
  }

  // 5. Takip sayısı doğruluk testi
  testFollowCountAccuracy() {
    console.log('🔍 Test 5: Takip sayısı doğruluğu...');
    
    const testUser1 = this.createTestUser(1, 'User 1');
    const testUser2 = this.createTestUser(2, 'User 2');
    const testUser3 = this.createTestUser(3, 'User 3');
    
    // Başlangıç sayıları
    let user2FollowersCount = this.pasliosData.getFollowersCount(testUser2.id);
    let user1FollowingCount = this.pasliosData.getFollowingCount(testUser1.id);
    
    // User1 -> User2 takip
    this.setCurrentUser(testUser1);
    this.pasliosData.followUser(testUser2.id);
    
    // Sayılar güncellendi mi
    const newUser2FollowersCount = this.pasliosData.getFollowersCount(testUser2.id);
    const newUser1FollowingCount = this.pasliosData.getFollowingCount(testUser1.id);
    
    const followCountIncreased = (
      newUser2FollowersCount === user2FollowersCount + 1 &&
      newUser1FollowingCount === user1FollowingCount + 1
    );
    
    // User3 -> User2 takip
    this.setCurrentUser(testUser3);
    this.pasliosData.followUser(testUser2.id);
    
    const finalUser2FollowersCount = this.pasliosData.getFollowersCount(testUser2.id);
    const multipleFollowersWork = finalUser2FollowersCount === newUser2FollowersCount + 1;
    
    // Unfollow test
    this.setCurrentUser(testUser1);
    this.pasliosData.unfollowUser(testUser2.id);
    
    const afterUnfollowCount = this.pasliosData.getFollowersCount(testUser2.id);
    const unfollowCountDecreased = afterUnfollowCount === finalUser2FollowersCount - 1;
    
    const allPassed = followCountIncreased && multipleFollowersWork && unfollowCountDecreased;
    
    this.addTestResult(
      'Takip sayısı doğruluk kontrolü',
      allPassed,
      allPassed ? 'Takip sayıları doğru güncelleniyor' : 'Güvenlik açığı: Takip sayısı problemi!'
    );
    
    return allPassed;
  }

  // 6. Takipten çıkma veri güncelleme testi
  testUnfollowDataUpdate() {
    console.log('🔍 Test 6: Takipten çıkma veri güncelleme...');
    
    const testUser1 = this.createTestUser(1, 'User 1');
    const testUser2 = this.createTestUser(2, 'User 2');
    
    this.setCurrentUser(testUser1);
    
    // Önce takip et
    this.pasliosData.followUser(testUser2.id);
    
    // Takip ilişkisi var mı kontrol et
    const isFollowingBefore = this.pasliosData.isFollowing(testUser1.id, testUser2.id);
    
    // Takipten çıkar
    const unfollowResult = this.pasliosData.unfollowUser(testUser2.id);
    
    // Takip ilişkisi kaldırıldı mı kontrol et
    const isFollowingAfter = this.pasliosData.isFollowing(testUser1.id, testUser2.id);
    
    // Zaten takip etmiyorken unfollow denemesi
    const duplicateUnfollow = this.pasliosData.unfollowUser(testUser2.id);
    const duplicateUnfollowPrevented = !duplicateUnfollow.success;
    
    // Geçersiz user ID ile unfollow
    const invalidUnfollow = this.pasliosData.unfollowUser(999999);
    const invalidUnfollowPrevented = !invalidUnfollow.success;
    
    const allPassed = isFollowingBefore && unfollowResult.success && !isFollowingAfter && 
                     duplicateUnfollowPrevented && invalidUnfollowPrevented;
    
    this.addTestResult(
      'Takipten çıkma veri güncelleme kontrolü',
      allPassed,
      allPassed ? 'Unfollow veri güncelleme çalışıyor' : 'Güvenlik açığı: Unfollow veri problemi!'
    );
    
    return allPassed;
  }

  // 7. Authentication kontrolleri
  testAuthenticationControls() {
    console.log('🔍 Test 7: Authentication kontrolleri...');
    
    // Oturumu kapat
    localStorage.removeItem('paslios_currentUser');
    
    // Oturum olmadan profil görüntüleme
    const profileResult = this.pasliosData.getUserProfile(1);
    const profileBlocked = !profileResult.success;
    
    // Oturum olmadan profil güncelleme
    const updateResult = this.pasliosData.updateProfile({ name: 'Test' });
    const updateBlocked = !updateResult.success;
    
    // Oturum olmadan şifre değişikliği
    const passwordResult = this.pasliosData.changePassword('old', 'new');
    const passwordBlocked = !passwordResult.success;
    
    // Oturum olmadan takip
    const followResult = this.pasliosData.followUser(1);
    const followBlocked = !followResult.success;
    
    // Oturum olmadan unfollow
    const unfollowResult = this.pasliosData.unfollowUser(1);
    const unfollowBlocked = !unfollowResult.success;
    
    const allPassed = profileBlocked && updateBlocked && passwordBlocked && 
                     followBlocked && unfollowBlocked;
    
    this.addTestResult(
      'Authentication kontrolleri',
      allPassed,
      allPassed ? 'Authentication kontrolleri çalışıyor' : 'Güvenlik açığı: Authentication bypass!'
    );
    
    return allPassed;
  }

  // Test kullanıcısı oluştur
  createTestUser(id, name, password = 'TestPassword123!') {
    const testUser = {
      id: id,
      name: name,
      email: `test${id}@test.com`,
      password: this.pasliosData.hashPassword(password),
      position: 'Forvet',
      location: 'Test City',
      bio: 'Test bio',
      avatar: '/images/default-avatar.png',
      matchesPlayed: 10,
      rating: 4.5,
      joinDate: new Date().toISOString()
    };
    
    const users = this.pasliosData.getData('users');
    const existingIndex = users.findIndex(u => u.id === id);
    
    if (existingIndex !== -1) {
      users[existingIndex] = testUser;
    } else {
      users.push(testUser);
    }
    
    this.pasliosData.setData('users', users);
    return testUser;
  }

  // Mevcut kullanıcıyı ayarla
  setCurrentUser(user) {
    localStorage.setItem('paslios_currentUser', JSON.stringify(user));
  }

  // Tüm testleri çalıştır
  runAllTests() {
    console.log('🚀 Profil ve takip sistemi güvenlik testleri başlatılıyor...\n');
    
    // Test verilerini temizle
    this.pasliosData.setData('follows', []);
    
    this.testProfileViewPermissions();
    this.testProfileEditSecurity();
    this.testPasswordChangeSecurity();
    this.testDuplicateFollowPrevention();
    this.testFollowCountAccuracy();
    this.testUnfollowDataUpdate();
    this.testAuthenticationControls();
    
    this.displayResults();
    
    // Test verilerini temizle
    localStorage.removeItem('paslios_currentUser');
  }
}

// Test çalıştırma fonksiyonu
function runProfileSecurityTests() {
  const tester = new ProfileSecurityTest();
  tester.runAllTests();
}

// API endpoint simulation fonksiyonları
const ProfileAPI = {
  // GET /api/users/:id
  getUser: function(userId) {
    const pasliosData = new PasliosData();
    return pasliosData.getUserProfile(userId);
  },
  
  // PUT /api/users/:id
  updateUser: function(userId, updateData) {
    const currentUser = JSON.parse(localStorage.getItem('paslios_currentUser') || '{}');
    
    // Sadece kendi profilini güncelleyebilir
    if (currentUser.id !== userId) {
      return { success: false, message: 'Yetkiniz yok!' };
    }
    
    const pasliosData = new PasliosData();
    return pasliosData.updateProfile(updateData);
  },
  
  // POST /api/users/:id/follow
  followUser: function(userId) {
    const pasliosData = new PasliosData();
    return pasliosData.followUser(userId);
  },
  
  // POST /api/users/:id/unfollow
  unfollowUser: function(userId) {
    const pasliosData = new PasliosData();
    return pasliosData.unfollowUser(userId);
  },
  
  // POST /api/users/change-password
  changePassword: function(passwordData) {
    const pasliosData = new PasliosData();
    return pasliosData.changePassword(passwordData.oldPassword, passwordData.newPassword);
  },
  
  // GET /api/users/:id/followers
  getFollowers: function(userId, limit = null) {
    const pasliosData = new PasliosData();
    return {
      success: true,
      followers: pasliosData.getFollowers(userId, limit),
      count: pasliosData.getFollowersCount(userId)
    };
  },
  
  // GET /api/users/:id/following
  getFollowing: function(userId, limit = null) {
    const pasliosData = new PasliosData();
    return {
      success: true,
      following: pasliosData.getFollowing(userId, limit),
      count: pasliosData.getFollowingCount(userId)
    };
  }
};

// Sayfa yüklendiğinde hazırlık
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Profil ve takip sistemi güvenlik test sistemi hazır. runProfileSecurityTests() ile testleri çalıştırabilirsiniz.');
  });
}