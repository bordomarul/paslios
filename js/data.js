// Paslios Data Management System
// Gerçek kullanıcılar için temiz veri yönetimi

class PasliosData {
  constructor() {
    this.initializeDatabase();
  }

  // Temiz veritabanı başlatma
  initializeDatabase() {
    // Kullanıcılar - demo hesaplarla başlat
    if (!localStorage.getItem('paslios_users')) {
      const demoUsers = [
        {
          id: 'demo_001',
          email: 'demo@paslios.com',
          password: '123456',
          name: 'Demo Kullanıcı',
          username: 'demo_user',
          position: 'Orta Saha',
          level: 'Orta',
          phone: '0555 123 4567',
          location: 'Ankara',
          bio: 'Paslios demo hesabı - Test için kullanabilirsiniz!',
          profileImage: 'https://via.placeholder.com/150/10b981/white?text=Demo',
          joinDate: new Date().toISOString(),
          stats: {
            matchesPlayed: 25,
            goals: 12,
            assists: 8,
            rating: 4.2
          },
          badges: ['welcome', 'first_post'],
          followers: [],
          following: [],
          isVerified: true
        },
        {
          id: 'test_002', 
          email: 'test@paslios.com',
          password: 'test123',
          name: 'Test Oyuncu',
          username: 'test_player',
          position: 'Forvet',
          level: 'İleri',
          phone: '0555 987 6543',
          location: 'İstanbul',
          bio: 'Test hesabı - Futbol tutkunu!',
          profileImage: 'https://via.placeholder.com/150/059669/white?text=Test',
          joinDate: new Date().toISOString(),
          stats: {
            matchesPlayed: 45,
            goals: 28,
            assists: 15,
            rating: 4.5
          },
          badges: ['welcome', 'first_post', 'goal_scorer'],
          followers: [],
          following: [],
          isVerified: false
        },
        {
          id: 'admin_003',
          email: 'admin@paslios.com', 
          password: 'admin123',
          name: 'Admin Kullanıcı',
          username: 'admin',
          position: 'Kaleci',
          level: 'Profesyonel',
          phone: '0555 000 0000',
          location: 'Ankara',
          bio: 'Paslios yönetici hesabı',
          profileImage: 'https://via.placeholder.com/150/047857/white?text=Admin',
          joinDate: new Date().toISOString(),
          stats: {
            matchesPlayed: 100,
            goals: 2,
            assists: 45,
            rating: 4.8
          },
          badges: ['welcome', 'first_post', 'team_captain', 'veteran'],
          followers: [],
          following: [],
          isVerified: true,
          isAdmin: true
        }
      ];
      localStorage.setItem('paslios_users', JSON.stringify(demoUsers));
    }
    
    // Gönderiler - başlangıçta boş
    if (!localStorage.getItem('paslios_posts')) {
      localStorage.setItem('paslios_posts', JSON.stringify([]));
    }
    
    // Takımlar - başlangıçta boş
    if (!localStorage.getItem('paslios_teams')) {
      localStorage.setItem('paslios_teams', JSON.stringify([]));
    }
    
    // Maçlar - başlangıçta boş
    if (!localStorage.getItem('paslios_matches')) {
      localStorage.setItem('paslios_matches', JSON.stringify([]));
    }
    
    // Rezervasyonlar - başlangıçta boş
    if (!localStorage.getItem('paslios_bookings')) {
      localStorage.setItem('paslios_bookings', JSON.stringify([]));
    }
    
    // Mesajlar - başlangıçta boş
    if (!localStorage.getItem('paslios_messages')) {
      localStorage.setItem('paslios_messages', JSON.stringify([]));
    }
    
    // Konuşmalar - başlangıçta boş
    if (!localStorage.getItem('paslios_conversations')) {
      localStorage.setItem('paslios_conversations', JSON.stringify([]));
    }
    
    // Bildirimler - başlangıçta boş
    if (!localStorage.getItem('paslios_notifications')) {
      localStorage.setItem('paslios_notifications', JSON.stringify([]));
    }
    
    // Sahalar - demo sahalar
    if (!localStorage.getItem('paslios_venues')) {
      const venues = [
        {
          id: 1,
          name: 'Arena Spor Kompleksi',
          address: 'Çankaya, Ankara',
          hourlyRate: 250,
          features: ['Soyunma Odası', 'Duş', 'Otopark'],
          type: 'futsal'
        },
        {
          id: 2,
          name: 'Champions League Sahası',
          address: 'Kızılay, Ankara',
          hourlyRate: 300,
          features: ['Soyunma Odası', 'Duş', 'Otopark', 'Kafeterya'],
          type: 'football'
        },
        {
          id: 3,
          name: 'Goal Futsal Center',
          address: 'Bahçelievler, Ankara',
          hourlyRate: 200,
          features: ['Soyunma Odası', 'Otopark'],
          type: 'futsal'
        }
      ];
      localStorage.setItem('paslios_venues', JSON.stringify(venues));
    }
    
    // Sistem rozetleri - başarı sistemi için gerekli
    if (!localStorage.getItem('paslios_badges')) {
      const systemBadges = [
        {
          id: 1,
          name: 'Hoş Geldin',
          description: 'Paslios\'a katıldığın için tebrikler!',
          icon: '🎉',
          type: 'welcome',
          rarity: 'common',
          points: 50
        },
        {
          id: 2,
          name: 'İlk Gönderi',
          description: 'İlk gönderini paylaştın!',
          icon: '📝',
          type: 'social',
          rarity: 'common',
          points: 25
        },
        {
          id: 3,
          name: 'İlk Maç',
          description: 'İlk maçını oynadın!',
          icon: '⚽',
          type: 'match',
          rarity: 'common',
          points: 100
        },
        {
          id: 4,
          name: 'Takım Oyuncusu',
          description: 'Bir takıma katıldın!',
          icon: '👥',
          type: 'team',
          rarity: 'common',
          points: 150
        },
        {
          id: 5,
          name: 'Aktif Kullanıcı',
          description: '7 gün üst üste giriş yaptın!',
          icon: '🔥',
          type: 'activity',
          rarity: 'uncommon',
          points: 200
        }
      ];
      localStorage.setItem('paslios_badges', JSON.stringify(systemBadges));
    }
  }

  // GÜVENLIK FONKSİYONLARI
  
  // Browser fingerprint oluştur (session hijacking koruması)
  generateFingerprint() {
    try {
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
    } catch {
      // Fallback fingerprint
      return btoa(navigator.userAgent + navigator.language + screen.width).slice(0, 32);
    }
  }
  
  // Improved password hashing with salt (production'da bcrypt kullanılmalı)
  hashPassword(password) {
    // Salt oluştur (her kullanıcı için farklı)
    const salt = this.generateSalt();
    
    // PBKDF2 benzeri iterative hashing
    let hash = password + salt;
    for (let i = 0; i < 1000; i++) {
      let newHash = 0;
      for (let j = 0; j < hash.length; j++) {
        const char = hash.charCodeAt(j);
        newHash = ((newHash << 5) - newHash) + char;
        newHash = newHash & newHash;
      }
      hash = newHash.toString(36) + salt.charAt(i % salt.length);
    }
    
    return `hash_${Math.abs(parseInt(hash.slice(0, 10), 36)).toString(36)}_${salt}_${password.length}`;
  }
  
  // Salt generator
  generateSalt() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let salt = '';
    for (let i = 0; i < 16; i++) {
      salt += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return salt;
  }
  
  // Password doğrulama
  verifyPassword(password, hash) {
    if (!hash || !hash.includes('_')) return false;
    
    const parts = hash.split('_');
    if (parts.length < 4) return false;
    
    const salt = parts[2];
    const originalLength = parseInt(parts[3]);
    
    // Aynı salt ile hash'i yeniden oluştur
    let testHash = password + salt;
    for (let i = 0; i < 1000; i++) {
      let newHash = 0;
      for (let j = 0; j < testHash.length; j++) {
        const char = testHash.charCodeAt(j);
        newHash = ((newHash << 5) - newHash) + char;
        newHash = newHash & newHash;
      }
      testHash = newHash.toString(36) + salt.charAt(i % salt.length);
    }
    
    const expectedHash = `hash_${Math.abs(parseInt(testHash.slice(0, 10), 36)).toString(36)}_${salt}_${originalLength}`;
    return expectedHash === hash;
  }

  // KULLANICI YÖNETİMİ
  
  // İçerik temizleme ve güvenlik
  sanitizeContent(input) {
    if (!input || typeof input !== 'string') return '';
    
    // HTML karakterlerini encode et
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .trim();
  }
  
  // Zararlı pattern kontrolü
  containsMaliciousPatterns(content) {
    const maliciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /data:text\/html/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      /vbscript:/i
    ];
    
    return maliciousPatterns.some(pattern => pattern.test(content));
  }
  
  // Yorum spam/flood kontrolü
  checkCommentSpam(userId, commentText) {
    const allComments = this.getAllComments();
    const userComments = allComments.filter(c => c.authorId === userId);
    
    // Son 5 dakikadaki yorumları kontrol et
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentComments = userComments.filter(c => new Date(c.timestamp) > fiveMinutesAgo);
    
    // Rate limiting: 5 dakikada maksimum 10 yorum
    if (recentComments.length >= 10) {
      return {
        allowed: false,
        message: 'Çok hızlı yorum yapıyorsunuz! Lütfen 5 dakika bekleyin.'
      };
    }
    
    // Son 1 dakikadaki yorumları kontrol et
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const lastMinuteComments = userComments.filter(c => new Date(c.timestamp) > oneMinuteAgo);
    
    // Flood kontrolü: 1 dakikada maksimum 3 yorum
    if (lastMinuteComments.length >= 3) {
      return {
        allowed: false,
        message: 'Çok hızlı yorum yapıyorsunuz! Lütfen biraz bekleyin.'
      };
    }
    
    // Aynı içerik kontrolü (son 10 yorum)
    const lastTenComments = userComments.slice(-10);
    const duplicateComment = lastTenComments.find(c => 
      c.content.toLowerCase() === commentText.toLowerCase()
    );
    
    if (duplicateComment) {
      return {
        allowed: false,
        message: 'Bu yorumu zaten yaptınız!'
      };
    }
    
    // Çok kısa aralıklarla yorum kontrolü (son 30 saniye)
    const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);
    const veryRecentComments = userComments.filter(c => new Date(c.timestamp) > thirtySecondsAgo);
    
    if (veryRecentComments.length >= 2) {
      return {
        allowed: false,
        message: 'Lütfen yorumlar arasında en az 30 saniye bekleyin.'
      };
    }
    
    return { allowed: true };
  }
  
  // Yeni kullanıcı kaydı
  registerUser(userData) {
    // Input validation ve sanitization
    if (!userData.name || !userData.email || !userData.password) {
      return { success: false, message: 'Tüm zorunlu alanları doldurun!' };
    }
    
    // Security validation
    if (!window.SecurityUtils.isValidEmail(userData.email)) {
      return { success: false, message: 'Geçerli bir email adresi girin!' };
    }
    
    if (!window.SecurityUtils.isStrongPassword(userData.password)) {
      return { success: false, message: 'Şifre en az 8 karakter olmalı ve büyük harf, küçük harf, rakam içermelidir!' };
    }
    
    // Rate limiting kontrolü
    const rateLimitCheck = window.SecurityUtils.checkRateLimit('register', 3, 300000); // 5 dakikada 3 deneme
    if (!rateLimitCheck.allowed) {
      return { success: false, message: rateLimitCheck.message };
    }
    
    const users = this.getData('users');
    
    // Email kontrolü
    if (users.find(u => u.email === userData.email.toLowerCase())) {
      return { success: false, message: 'Bu email adresi zaten kullanılıyor!' };
    }
    
    // Sanitize inputs
    const sanitizedData = {
      name: window.SecurityUtils.sanitizeInput(userData.name),
      email: userData.email.toLowerCase().trim(),
      phone: window.SecurityUtils.sanitizeInput(userData.phone || ''),
      position: window.SecurityUtils.sanitizeInput(userData.position || 'Belirsiz'),
      location: window.SecurityUtils.sanitizeInput(userData.location || '')
    };
    
    // Yeni kullanıcı objesi
    const newUser = {
      id: window.SecurityUtils.generateSecureId(),
      name: sanitizedData.name,
      email: sanitizedData.email,
      password: this.hashPassword(userData.password), // Password hash'le
      phone: sanitizedData.phone,
      position: sanitizedData.position,
      rating: 0,
      avatar: null,
      bio: '',
      location: sanitizedData.location,
      matchesPlayed: 0,
      matchesWon: 0,
      goals: 0,
      assists: 0,
      cleanSheets: 0,
      mvpAwards: 0,
      joinDate: new Date().toISOString(),
      lastLoginDate: new Date().toISOString(),
      teamId: null,
      friendIds: [],
      stats: {
        totalPoints: 50, // Hoş geldin rozeti puanı
        weeklyPoints: 50,
        monthlyPoints: 50,
        level: 1,
        xp: 50,
        badgeIds: [1] // Hoş geldin rozeti
      }
    };
    
    // Kullanıcıyı ekle
    users.push(newUser);
    this.setData('users', users);
    
    // Mevcut kullanıcı olarak ayarla
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return { success: true, user: newUser };
  }
  
  // Kullanıcı girişi
  loginUser(email, password) {
    // Input validation
    if (!email || !password) {
      return { success: false, message: 'Email ve şifre gereklidir!' };
    }
    
    // Rate limiting kontrolü
    const rateLimitCheck = window.SecurityUtils.checkRateLimit('login', 5, 900000); // 15 dakikada 5 deneme
    if (!rateLimitCheck.allowed) {
      return { success: false, message: rateLimitCheck.message };
    }
    
    // Email validation
    if (!window.SecurityUtils.isValidEmail(email)) {
      return { success: false, message: 'Geçerli bir email adresi girin!' };
    }
    
    const users = this.getData('users');
    const user = users.find(u => u.email === email.toLowerCase());
    
    if (user && this.verifyPassword(password, user.password)) {
      // Son giriş tarihini güncelle
      user.lastLoginDate = new Date().toISOString();
      this.updateData('users', user.id, { lastLoginDate: user.lastLoginDate });
      
      // Session oluştur (güvenli)
      const sessionData = {
        isLoggedIn: true,
        userId: user.id,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          position: user.position,
          rating: user.rating
        },
        loginTime: new Date().getTime(),
        expiresAt: new Date().getTime() + (24 * 60 * 60 * 1000), // 24 saat
        fingerprint: this.generateFingerprint() // Session hijacking koruması
      };
      
      // Session'ı storage'a kaydet
      localStorage.setItem('paslios_session', JSON.stringify(sessionData));
      localStorage.setItem('currentUserId', user.id);
      
      return { success: true, user: user };
    } else {
      return { success: false, message: 'Email veya şifre hatalı!' };
    }
  }
  
  // Mevcut kullanıcıyı getir
  getCurrentUser() {
    const currentUserData = localStorage.getItem('currentUser');
    return currentUserData ? JSON.parse(currentUserData) : null;
  }
  
  // Mevcut kullanıcıyı güncelle
  updateCurrentUser(updates) {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Kullanıcılar listesinde de güncelle
      this.updateData('users', currentUser.id, updates);
      
      return updatedUser;
    }
    return null;
  }
  
  // Kullanıcı çıkışı
  logoutUser() {
    localStorage.removeItem('currentUser');
    return true;
  }
  
  // Kimlik doğrulama kontrolü
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  // GÖNDERİ YÖNETİMİ
  
  // Yeni gönderi oluştur
  createPost(content, type = 'text') {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Gönderi oluşturmak için giriş yapmalısınız!' };
    }
    
    // Input validation ve sanitization
    if (!content || typeof content !== 'string') {
      return { success: false, message: 'Geçersiz gönderi içeriği!' };
    }
    
    // Zararlı pattern kontrolü
    if (this.containsMaliciousPatterns(content)) {
      return { success: false, message: 'Güvenlik nedeniyle gönderi reddedildi!' };
    }
    
    // Content length kontrolü (max 2000 karakter)
    if (content.length > 2000) {
      return { success: false, message: 'Gönderi çok uzun! (Maksimum 2000 karakter)' };
    }
    
    // Type validation
    const validTypes = ['text', 'image', 'video'];
    if (!validTypes.includes(type)) {
      return { success: false, message: 'Geçersiz gönderi türü!' };
    }
    
    // Content sanitization - XSS koruması
    const sanitizedContent = this.sanitizeContent(content);
    if (sanitizedContent.trim().length === 0) {
      return { success: false, message: 'Gönderi içeriği boş olamaz!' };
    }
    
    const posts = this.getData('posts');
    const newPost = {
      id: Date.now(),
      authorId: currentUser.id,
      authorName: this.sanitizeContent(currentUser.name),
      authorAvatar: currentUser.avatar,
      content: sanitizedContent,
      type: type,
      timestamp: new Date().toISOString(),
      likedBy: [],
      comments: [],
      visibility: 'public',
      reported: false,
      reportCount: 0
    };
    
    // Gönderiyi ekle (en üste)
    posts.unshift(newPost);
    this.setData('posts', posts);
    
    // İlk gönderi rozeti kontrolü
    if (posts.filter(p => p.authorId === currentUser.id).length === 1) {
      this.awardBadge(currentUser.id, 2); // İlk gönderi rozeti
    }
    
    return { success: true, post: newPost };
  }
  
  // Gönderileri getir
  getPosts(limit = null) {
    const posts = this.getData('posts');
    return limit ? posts.slice(0, limit) : posts;
  }
  
  // Kullanıcının gönderilerini getir
  getUserPosts(userId, limit = null) {
    const posts = this.getData('posts').filter(p => p.authorId === userId);
    return limit ? posts.slice(0, limit) : posts;
  }
  
  // Gönderiyi beğen/beğenme
  togglePostLike(postId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Beğenmek için giriş yapmalısınız!' };
    }
    
    // Post ID validation
    if (!postId || typeof postId !== 'number') {
      return { success: false, message: 'Geçersiz gönderi ID!' };
    }
    
    const posts = this.getData('posts');
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      return { success: false, message: 'Gönderi bulunamadı!' };
    }
    
    // Kullanıcının kendi gönderisini beğenmesini engelle
    if (post.authorId === currentUser.id) {
      return { success: false, message: 'Kendi gönderinizi beğenemezsiniz!' };
    }
    
    let isLiked = false;
    let likeCount = 0;
    
    if (post.likedBy.includes(currentUser.id)) {
      // Beğeniyi kaldır
      post.likedBy = post.likedBy.filter(id => id !== currentUser.id);
      isLiked = false;
    } else {
      // Beğeni ekle
      post.likedBy.push(currentUser.id);
      isLiked = true;
    }
    
    likeCount = post.likedBy.length;
    this.setData('posts', posts);
    
    // Beğeni bildirimi oluştur (sadece beğeni eklendiğinde)
    if (isLiked) {
      this.createNotification(post.authorId, {
        type: 'like',
        title: 'Gönderin beğenildi',
        message: `${currentUser.name} gönderinizi beğendi`,
        data: {
          postId: postId,
          postContent: post.content.substring(0, 50) + (post.content.length > 50 ? '...' : '')
        }
      });
    }
    
    return { 
      success: true, 
      isLiked: isLiked, 
      likeCount: likeCount,
      message: isLiked ? 'Gönderi beğenildi!' : 'Beğeni kaldırıldı!'
    };
  }
  
  // Kullanıcının gönderiyi beğenip beğenmediğini kontrol et
  isPostLikedByUser(postId, userId = null) {
    const currentUser = userId || (this.getCurrentUser() && this.getCurrentUser().id);
    if (!currentUser) return false;
    
    const posts = this.getData('posts');
    const post = posts.find(p => p.id === postId);
    
    return post ? post.likedBy.includes(currentUser) : false;
  }
  
  // Gönderinin beğeni sayısını getir
  getPostLikeCount(postId) {
    const posts = this.getData('posts');
    const post = posts.find(p => p.id === postId);
    
    return post ? post.likedBy.length : 0;
  }
  
  // Gönderi sil
  deletePost(postId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;
    
    const posts = this.getData('posts');
    const postIndex = posts.findIndex(p => p.id === postId && p.authorId === currentUser.id);
    
    if (postIndex !== -1) {
      posts.splice(postIndex, 1);
      this.setData('posts', posts);
      return true;
    }
    
    return false;
  }

  // YORUM SİSTEMİ
  
  // Yorum ekle
  addComment(postId, commentText) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Yorum yapmak için giriş yapmalısınız!' };
    }
    
    // Input validation
    if (!commentText || typeof commentText !== 'string') {
      return { success: false, message: 'Geçersiz yorum içeriği!' };
    }
    
    // Zararlı pattern kontrolü
    if (this.containsMaliciousPatterns(commentText)) {
      return { success: false, message: 'Güvenlik nedeniyle yorum reddedildi!' };
    }
    
    // Content sanitization
    const sanitizedComment = this.sanitizeContent(commentText);
    if (sanitizedComment.trim().length === 0) {
      return { success: false, message: 'Yorum boş olamaz!' };
    }
    
    // Minimum uzunluk kontrolü
    if (sanitizedComment.trim().length < 2) {
      return { success: false, message: 'Yorum çok kısa! (Minimum 2 karakter)' };
    }
    
    // Maximum uzunluk kontrolü
    if (sanitizedComment.length > 500) {
      return { success: false, message: 'Yorum çok uzun! (Maksimum 500 karakter)' };
    }
    
    // Post ID validation
    if (!postId || typeof postId !== 'number') {
      return { success: false, message: 'Geçersiz gönderi ID!' };
    }
    
    const posts = this.getData('posts');
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      return { success: false, message: 'Gönderi bulunamadı!' };
    }
    
    // Spam/flood kontrolü
    const spamCheck = this.checkCommentSpam(currentUser.id, sanitizedComment);
    if (!spamCheck.allowed) {
      return { success: false, message: spamCheck.message };
    }
    
    const newComment = {
      id: Date.now(),
      postId: postId,
      authorId: currentUser.id,
      authorName: this.sanitizeContent(currentUser.name),
      authorAvatar: currentUser.avatar,
      content: sanitizedComment,
      timestamp: new Date().toISOString(),
      likedBy: [],
      reported: false,
      reportCount: 0
    };
    
    // Yorumu gönderinin comments dizisine ekle
    if (!post.comments) {
      post.comments = [];
    }
    post.comments.push(newComment);
    
    // Veritabanını güncelle
    this.setData('posts', posts);
    
    // İlk yorum rozeti kontrolü
    const allComments = this.getAllComments().filter(c => c.authorId === currentUser.id);
    if (allComments.length === 1) {
      this.awardBadge(currentUser.id, 5); // İlk yorum rozeti (ID: 5)
    }
    
    // Yorum bildirimi oluştur (kendi gönderisine yorum yapmadıysa)
    if (post.authorId !== currentUser.id) {
      this.createNotification(post.authorId, {
        type: 'comment',
        title: 'Gönderine yorum yapıldı',
        message: `${currentUser.name} gönderinize yorum yaptı: "${sanitizedComment.substring(0, 30)}${sanitizedComment.length > 30 ? '...' : ''}"`,
        data: {
          postId: postId,
          commentId: newComment.id,
          postContent: post.content.substring(0, 50) + (post.content.length > 50 ? '...' : ''),
          commentContent: sanitizedComment
        }
      });
    }
    
    return { success: true, comment: newComment };
  }
  
  // Gönderinin yorumlarını getir
  getPostComments(postId) {
    const posts = this.getData('posts');
    const post = posts.find(p => p.id === postId);
    return post ? (post.comments || []) : [];
  }
  
  // Tüm yorumları getir
  getAllComments() {
    const posts = this.getData('posts');
    const allComments = [];
    
    posts.forEach(post => {
      if (post.comments && post.comments.length > 0) {
        allComments.push(...post.comments);
      }
    });
    
    return allComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
  
  // Yorum sil
  deleteComment(postId, commentId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;
    
    const posts = this.getData('posts');
    const post = posts.find(p => p.id === postId);
    
    if (!post || !post.comments) return false;
    
    const commentIndex = post.comments.findIndex(c => 
      c.id === commentId && c.authorId === currentUser.id
    );
    
    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1);
      this.setData('posts', posts);
      return true;
    }
    
    return false;
  }
  
  // Yorumu beğen/beğenme
  toggleCommentLike(postId, commentId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;
    
    const posts = this.getData('posts');
    const post = posts.find(p => p.id === postId);
    
    if (!post || !post.comments) return false;
    
    const comment = post.comments.find(c => c.id === commentId);
    
    if (comment) {
      if (!comment.likedBy) comment.likedBy = [];
      
      if (comment.likedBy.includes(currentUser.id)) {
        // Beğeniyi kaldır
        comment.likedBy = comment.likedBy.filter(id => id !== currentUser.id);
      } else {
        // Beğeni ekle
        comment.likedBy.push(currentUser.id);
      }
      
      this.setData('posts', posts);
      return true;
    }
    
    return false;
  }

  // TAKIM YÖNETİMİ
  
  // Yeni takım oluştur
  createTeam(teamData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Takım oluşturmak için giriş yapmalısınız!' };
    }
    
    const teams = this.getData('teams');
    const newTeam = {
      id: Date.now(),
      name: teamData.name,
      description: teamData.description || '',
      captainId: currentUser.id,
      members: [currentUser.id],
      memberCount: 1,
      location: teamData.location || '',
      privacy: teamData.privacy || 'public',
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      points: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    teams.push(newTeam);
    this.setData('teams', teams);
    
    // Kullanıcının takım ID'sini güncelle
    this.updateCurrentUser({ teamId: newTeam.id });
    
    // Takım oyuncusu rozeti
    this.awardBadge(currentUser.id, 4);
    
    return { success: true, team: newTeam };
  }
  
  // Takımları getir
  getTeams() {
    return this.getData('teams');
  }
  
  // Kullanıcının takımını getir
  getUserTeam(userId = null) {
    const targetUserId = userId || this.getCurrentUser()?.id;
    if (!targetUserId) return null;
    
    const teams = this.getData('teams');
    return teams.find(t => t.members.includes(targetUserId));
  }

  // MAÇ YÖNETİMİ
  
  // Yeni maç oluştur
  createMatch(matchData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Maç oluşturmak için giriş yapmalısınız!' };
    }
    
    const matches = this.getData('matches');
    const newMatch = {
      id: Date.now(),
      title: matchData.title,
      date: matchData.date,
      time: matchData.time,
      location: matchData.location,
      organizerId: currentUser.id,
      participants: [currentUser.id],
      maxPlayers: matchData.maxPlayers || 10,
      currentPlayers: 1,
      price: matchData.price || 0,
      status: 'upcoming',
      description: matchData.description || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    matches.push(newMatch);
    this.setData('matches', matches);
    
    return { success: true, match: newMatch };
  }
  
  // Maçları getir
  getMatches() {
    return this.getData('matches');
  }
  
  // Yaklaşan maçları getir
  getUpcomingMatches(limit = 5) {
    const matches = this.getData('matches');
    const upcoming = matches.filter(m => m.status === 'upcoming');
    return limit ? upcoming.slice(0, limit) : upcoming;
  }

  // ROZET SİSTEMİ
  
  // Kullanıcıya rozet ver
  awardBadge(userId, badgeId) {
    const users = this.getData('users');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1 && !users[userIndex].stats.badgeIds.includes(badgeId)) {
      users[userIndex].stats.badgeIds.push(badgeId);
      
      // Rozet puanını ekle
      const badges = this.getData('badges');
      const badge = badges.find(b => b.id === badgeId);
      if (badge) {
        users[userIndex].stats.totalPoints += badge.points;
        users[userIndex].stats.weeklyPoints += badge.points;
        users[userIndex].stats.monthlyPoints += badge.points;
      }
      
      this.setData('users', users);
      
      // Mevcut kullanıcıysa güncelle
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
      }
      
      return true;
    }
    
    return false;
  }
  
  // Rozetleri getir
  getBadges() {
    return this.getData('badges');
  }

  // GENEL VERİ YÖNETİMİ
  
  // Veri kaydet
  setData(key, data) {
    try {
      localStorage.setItem(`paslios_${key}`, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('LocalStorage yazma hatası:', error);
      return false;
    }
  }
  
  // Veri oku
  getData(key) {
    try {
      const data = localStorage.getItem(`paslios_${key}`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('LocalStorage okuma hatası:', error);
      return [];
    }
  }
  
  // Veri güncelle
  updateData(type, id, updates) {
    const data = this.getData(type);
    const index = data.findIndex(item => item.id === id);
    
    if (index !== -1) {
      data[index] = { ...data[index], ...updates };
      return this.setData(type, data);
    }
    
    return false;
  }
  
  // Veri sil
  deleteData(type, id) {
    const data = this.getData(type);
    const filteredData = data.filter(item => item.id !== id);
    return this.setData(type, filteredData);
  }
  
  // Tüm verileri temizle (geliştirme amaçlı)
  clearAllData() {
    const keys = ['users', 'posts', 'teams', 'matches', 'bookings', 'messages', 'conversations', 'notifications'];
    keys.forEach(key => localStorage.removeItem(`paslios_${key}`));
    localStorage.removeItem('currentUser');
    this.initializeDatabase();
    return true;
  }
  
  // Kullanıcı istatistikleri
  getUserStats(userId) {
    const user = this.getData('users').find(u => u.id === userId);
    if (!user) return null;
    
    const userPosts = this.getData('posts').filter(p => p.authorId === userId);
    const userMatches = this.getData('matches').filter(m => m.participants.includes(userId));
    
    return {
      postsCount: userPosts.length,
      matchesCount: userMatches.length,
      totalLikes: userPosts.reduce((sum, post) => sum + post.likedBy.length, 0),
      ...user.stats
    };
  }

  // SAHA YÖNETİMİ
  
  // Tüm sahaları getir
  getAllVenues() {
    return this.getData('venues');
  }
  
  // Saha bilgisi getir
  getVenue(venueId) {
    const venues = this.getData('venues');
    return venues.find(v => v.id === venueId);
  }

  // YARDIMCI FONKSİYONLAR
  
  // Zaman farkını formatla (örn: "2 saat önce")
  static formatTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMs = now - time;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInDays > 0) {
      return `${diffInDays} gün önce`;
    } else if (diffInHours > 0) {
      return `${diffInHours} saat önce`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} dakika önce`;
    } else {
      return 'Az önce';
    }
  }

  // Team maçları getir
  getTeamMatches() {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) return [];
      
      const userTeam = this.getCurrentUserTeam();
      if (!userTeam) return [];
      
      const allMatches = JSON.parse(localStorage.getItem('paslios_matches') || '[]');
      return allMatches.filter(match => 
        match.type === 'team' && 
        (match.homeTeam === userTeam.name || match.awayTeam === userTeam.name)
      );
    } catch (error) {
      console.error('Error getting team matches:', error);
      return [];
    }
  }

  // Kullanıcının takımını getir
  getCurrentUserTeam() {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) return null;
      
      const teams = JSON.parse(localStorage.getItem('paslios_teams') || '[]');
      return teams.find(team => team.ownerId === currentUser.id || 
                              (team.members && team.members.some(member => member.id === currentUser.id)));
    } catch (error) {
      console.error('Error getting current user team:', error);
      return null;
    }
  }

  // PROFİL YÖNETİMİ
  
  // Kullanıcı profili getir
  getUserProfile(userId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Profil görmek için giriş yapmalısınız!' };
    }
    
    // User ID validation
    if (!userId || typeof userId !== 'number') {
      return { success: false, message: 'Geçersiz kullanıcı ID!' };
    }
    
    const users = this.getData('users');
    const targetUser = users.find(u => u.id === userId);
    
    if (!targetUser) {
      return { success: false, message: 'Kullanıcı bulunamadı!' };
    }
    
    // Kendi profilini mi yoksa başkasının profilini mi görüntülüyor
    const isOwnProfile = currentUser.id === userId;
    
    // Public profile data
    const publicProfile = {
      id: targetUser.id,
      name: this.sanitizeContent(targetUser.name),
      position: targetUser.position || 'Genel',
      location: targetUser.location || 'Konum belirtilmemiş',
      bio: targetUser.bio ? this.sanitizeContent(targetUser.bio) : '',
      avatar: targetUser.avatar,
      matchesPlayed: targetUser.matchesPlayed || 0,
      rating: targetUser.rating || 0,
      teamId: targetUser.teamId,
      joinDate: targetUser.joinDate,
      isOwnProfile: isOwnProfile
    };
    
    // Kendi profiliyse hassas bilgileri de ekle
    if (isOwnProfile) {
      publicProfile.email = targetUser.email;
      publicProfile.phone = targetUser.phone;
      publicProfile.settings = targetUser.settings;
    }
    
    // Takip durumu kontrolü (başkasının profili için)
    if (!isOwnProfile) {
      publicProfile.isFollowing = this.isFollowing(currentUser.id, userId);
      publicProfile.isFollowedBy = this.isFollowing(userId, currentUser.id);
    }
    
    // Takipçi/takip sayıları
    publicProfile.followersCount = this.getFollowersCount(userId);
    publicProfile.followingCount = this.getFollowingCount(userId);
    
    return { success: true, profile: publicProfile };
  }
  
  // Profil güncelle
  updateProfile(updates) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Profil güncellemek için giriş yapmalısınız!' };
    }
    
    // Input validation
    if (!updates || typeof updates !== 'object') {
      return { success: false, message: 'Geçersiz güncelleme verisi!' };
    }
    
    const allowedFields = ['name', 'bio', 'position', 'location', 'phone'];
    const sanitizedUpdates = {};
    
    // Sadece izin verilen alanları güncelle
    for (const [key, value] of Object.entries(updates)) {
      if (!allowedFields.includes(key)) {
        continue;
      }
      
      if (typeof value !== 'string') {
        continue;
      }
      
      // İçerik validation
      if (key === 'name') {
        if (value.length < 2 || value.length > 50) {
          return { success: false, message: 'İsim 2-50 karakter arasında olmalı!' };
        }
      }
      
      if (key === 'bio' && value.length > 200) {
        return { success: false, message: 'Bio 200 karakterden uzun olamaz!' };
      }
      
      if (key === 'phone' && value && !/^[0-9+\-\s()]{10,15}$/.test(value)) {
        return { success: false, message: 'Geçersiz telefon numarası formatı!' };
      }
      
      // Zararlı pattern kontrolü
      if (this.containsMaliciousPatterns(value)) {
        return { success: false, message: 'Güvenlik nedeniyle güncelleme reddedildi!' };
      }
      
      // Content sanitization
      sanitizedUpdates[key] = this.sanitizeContent(value);
    }
    
    if (Object.keys(sanitizedUpdates).length === 0) {
      return { success: false, message: 'Güncellenecek geçerli alan bulunamadı!' };
    }
    
    // Kullanıcı verilerini güncelle
    const updated = this.updateData('users', currentUser.id, sanitizedUpdates);
    
    if (updated) {
      // Session'daki kullanıcı bilgilerini de güncelle
      const updatedUser = { ...currentUser, ...sanitizedUpdates };
      localStorage.setItem('paslios_currentUser', JSON.stringify(updatedUser));
      
      return { success: true, message: 'Profil başarıyla güncellendi!' };
    }
    
    return { success: false, message: 'Profil güncellenirken hata oluştu!' };
  }
  
  // Şifre değiştir
  changePassword(oldPassword, newPassword) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Şifre değiştirmek için giriş yapmalısınız!' };
    }
    
    // Input validation
    if (!oldPassword || !newPassword) {
      return { success: false, message: 'Eski ve yeni şifre gerekli!' };
    }
    
    if (typeof oldPassword !== 'string' || typeof newPassword !== 'string') {
      return { success: false, message: 'Geçersiz şifre formatı!' };
    }
    
    // Eski şifre doğrulama
    const users = this.getData('users');
    const user = users.find(u => u.id === currentUser.id);
    
    if (!user || !this.verifyPassword(oldPassword, user.password)) {
      return { success: false, message: 'Eski şifre hatalı!' };
    }
    
    // Yeni şifre güvenlik kontrolü
    if (!this.isStrongPassword(newPassword)) {
      return { success: false, message: 'Yeni şifre güvenlik gereksinimlerini karşılamıyor!' };
    }
    
    // Eski şifre ile aynı olamaz
    if (oldPassword === newPassword) {
      return { success: false, message: 'Yeni şifre eski şifre ile aynı olamaz!' };
    }
    
    // Yeni şifreyi hash'le
    const hashedNewPassword = this.hashPassword(newPassword);
    
    // Şifreyi güncelle
    const updated = this.updateData('users', currentUser.id, { 
      password: hashedNewPassword,
      passwordChangedAt: new Date().toISOString()
    });
    
    if (updated) {
      return { success: true, message: 'Şifre başarıyla değiştirildi!' };
    }
    
    return { success: false, message: 'Şifre değiştirilirken hata oluştu!' };
  }
  
  // Güçlü şifre kontrolü
  isStrongPassword(password) {
    if (!password || password.length < 8) return false;
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  }

  // TAKİP SİSTEMİ
  
  // Kullanıcıyı takip et
  followUser(targetUserId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Takip etmek için giriş yapmalısınız!' };
    }
    
    // User ID validation
    if (!targetUserId || typeof targetUserId !== 'number') {
      return { success: false, message: 'Geçersiz kullanıcı ID!' };
    }
    
    // Kendini takip etmeyi engelle
    if (currentUser.id === targetUserId) {
      return { success: false, message: 'Kendinizi takip edemezsiniz!' };
    }
    
    // Hedef kullanıcı var mı kontrol et
    const users = this.getData('users');
    const targetUser = users.find(u => u.id === targetUserId);
    
    if (!targetUser) {
      return { success: false, message: 'Kullanıcı bulunamadı!' };
    }
    
    // Zaten takip ediyor mu kontrol et
    if (this.isFollowing(currentUser.id, targetUserId)) {
      return { success: false, message: 'Bu kullanıcıyı zaten takip ediyorsunuz!' };
    }
    
    // Takip ilişkisini ekle
    const follows = this.getData('follows');
    const newFollow = {
      id: Date.now(),
      followerId: currentUser.id,
      followingId: targetUserId,
      timestamp: new Date().toISOString()
    };
    
    follows.push(newFollow);
    this.setData('follows', follows);
    
    // Takip bildirimi oluştur
    this.createNotification(targetUserId, {
      type: 'follow',
      title: 'Yeni takipçin var',
      message: `${currentUser.name} seni takip etmeye başladı`,
      data: {
        followerId: currentUser.id,
        followerName: currentUser.name,
        followerAvatar: currentUser.avatar
      }
    });
    
    return { 
      success: true, 
      message: `${targetUser.name} takip edildi!`,
      followersCount: this.getFollowersCount(targetUserId),
      followingCount: this.getFollowingCount(currentUser.id)
    };
  }
  
  // Kullanıcıyı takipten çıkar
  unfollowUser(targetUserId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'İşlem için giriş yapmalısınız!' };
    }
    
    // User ID validation
    if (!targetUserId || typeof targetUserId !== 'number') {
      return { success: false, message: 'Geçersiz kullanıcı ID!' };
    }
    
    // Takip ediyor mu kontrol et
    if (!this.isFollowing(currentUser.id, targetUserId)) {
      return { success: false, message: 'Bu kullanıcıyı takip etmiyorsunuz!' };
    }
    
    // Takip ilişkisini kaldır
    const follows = this.getData('follows');
    const updatedFollows = follows.filter(f => 
      !(f.followerId === currentUser.id && f.followingId === targetUserId)
    );
    
    this.setData('follows', updatedFollows);
    
    const users = this.getData('users');
    const targetUser = users.find(u => u.id === targetUserId);
    
    return { 
      success: true, 
      message: `${targetUser ? targetUser.name : 'Kullanıcı'} takipten çıkarıldı!`,
      followersCount: this.getFollowersCount(targetUserId),
      followingCount: this.getFollowingCount(currentUser.id)
    };
  }
  
  // Takip ediyor mu kontrol et
  isFollowing(followerId, followingId) {
    const follows = this.getData('follows');
    return follows.some(f => f.followerId === followerId && f.followingId === followingId);
  }
  
  // Takipçi sayısını getir
  getFollowersCount(userId) {
    const follows = this.getData('follows');
    return follows.filter(f => f.followingId === userId).length;
  }
  
  // Takip edilen sayısını getir
  getFollowingCount(userId) {
    const follows = this.getData('follows');
    return follows.filter(f => f.followerId === userId).length;
  }
  
  // Takipçileri listele
  getFollowers(userId, limit = null) {
    const follows = this.getData('follows');
    const users = this.getData('users');
    
    const followerIds = follows
      .filter(f => f.followingId === userId)
      .map(f => f.followerId);
    
    const followers = followerIds
      .map(id => users.find(u => u.id === id))
      .filter(user => user)
      .map(user => ({
        id: user.id,
        name: this.sanitizeContent(user.name),
        avatar: user.avatar,
        position: user.position || 'Genel'
      }));
    
    return limit ? followers.slice(0, limit) : followers;
  }
  
  // Takip edilenleri listele
  getFollowing(userId, limit = null) {
    const follows = this.getData('follows');
    const users = this.getData('users');
    
    const followingIds = follows
      .filter(f => f.followerId === userId)
      .map(f => f.followingId);
    
    const following = followingIds
      .map(id => users.find(u => u.id === id))
      .filter(user => user)
      .map(user => ({
        id: user.id,
        name: this.sanitizeContent(user.name),
        avatar: user.avatar,
        position: user.position || 'Genel'
      }));
    
    return limit ? following.slice(0, limit) : following;
  }

  // MESAJLAŞMA SİSTEMİ
  
  // Mesaj gönder
  sendMessage(receiverId, text) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Mesaj göndermek için giriş yapmalısınız!' };
    }
    
    // Input validation
    if (!receiverId || typeof receiverId !== 'number') {
      return { success: false, message: 'Geçersiz alıcı ID!' };
    }
    
    if (!text || typeof text !== 'string') {
      return { success: false, message: 'Geçersiz mesaj içeriği!' };
    }
    
    // Kendine mesaj gönderme engelleme
    if (currentUser.id === receiverId) {
      return { success: false, message: 'Kendinize mesaj gönderemezsiniz!' };
    }
    
    // Alıcı kullanıcı var mı kontrol et
    const users = this.getData('users');
    const receiver = users.find(u => u.id === receiverId);
    
    if (!receiver) {
      return { success: false, message: 'Alıcı kullanıcı bulunamadı!' };
    }
    
    // Zararlı pattern kontrolü
    if (this.containsMaliciousPatterns(text)) {
      return { success: false, message: 'Güvenlik nedeniyle mesaj reddedildi!' };
    }
    
    // Content sanitization
    const sanitizedText = this.sanitizeContent(text);
    if (sanitizedText.trim().length === 0) {
      return { success: false, message: 'Mesaj boş olamaz!' };
    }
    
    // Minimum uzunluk kontrolü
    if (sanitizedText.trim().length < 1) {
      return { success: false, message: 'Mesaj çok kısa!' };
    }
    
    // Maximum uzunluk kontrolü
    if (sanitizedText.length > 1000) {
      return { success: false, message: 'Mesaj çok uzun! (Maksimum 1000 karakter)' };
    }
    
    // Spam/flood kontrolü
    const spamCheck = this.checkMessageSpam(currentUser.id, sanitizedText);
    if (!spamCheck.allowed) {
      return { success: false, message: spamCheck.message };
    }
    
    // Conversation ID oluştur (küçük ID + büyük ID)
    const conversationId = currentUser.id < receiverId ? 
      `${currentUser.id}_${receiverId}` : `${receiverId}_${currentUser.id}`;
    
    // Yeni mesaj oluştur
    const newMessage = {
      id: Date.now(),
      conversationId: conversationId,
      senderId: currentUser.id,
      receiverId: receiverId,
      senderName: this.sanitizeContent(currentUser.name),
      receiverName: this.sanitizeContent(receiver.name),
      text: sanitizedText,
      timestamp: new Date().toISOString(),
      isRead: false,
      isDelivered: true,
      messageType: 'text'
    };
    
    // Mesajı kaydet
    const messages = this.getData('messages');
    messages.push(newMessage);
    this.setData('messages', messages);
    
    // Conversation güncelle
    this.updateConversation(conversationId, currentUser.id, receiverId, sanitizedText);
    
    // Real-time event trigger
    this.triggerMessageEvent('newMessage', {
      message: newMessage,
      senderId: currentUser.id,
      receiverId: receiverId,
      conversationId: conversationId
    });
    
    // Mesaj bildirimi oluştur
    this.createNotification(receiverId, {
      type: 'message',
      title: 'Yeni mesaj',
      message: `${currentUser.name} size mesaj gönderdi: "${sanitizedText.substring(0, 30)}${sanitizedText.length > 30 ? '...' : ''}"`,
      data: {
        messageId: newMessage.id,
        conversationId: conversationId,
        senderId: currentUser.id,
        senderName: currentUser.name,
        messagePreview: sanitizedText.substring(0, 100)
      }
    });
    
    return { 
      success: true, 
      message: 'Mesaj gönderildi!',
      messageId: newMessage.id,
      conversationId: conversationId
    };
  }
  
  // Real-time mesajlaşma için event trigger
  triggerMessageEvent(eventType, data) {
    // Custom event oluştur
    const event = new CustomEvent('pasliosMessage', {
      detail: { type: eventType, data: data }
    });
    
    // LocalStorage event ile diğer tab/pencereler bilgilendir
    localStorage.setItem('paslios_message_event', JSON.stringify({
      type: eventType,
      data: data,
      timestamp: Date.now()
    }));
    
    // Event'i trigger et
    window.dispatchEvent(event);
  }
  
  // Mesaj spam/flood kontrolü
  checkMessageSpam(userId, messageText) {
    const messages = this.getData('messages');
    const userMessages = messages.filter(m => m.senderId === userId);
    
    // Son 5 dakikadaki mesajları kontrol et
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentMessages = userMessages.filter(m => new Date(m.timestamp) > fiveMinutesAgo);
    
    // Rate limiting: 5 dakikada maksimum 50 mesaj
    if (recentMessages.length >= 50) {
      return {
        allowed: false,
        message: 'Çok hızlı mesaj gönderiyorsunuz! Lütfen 5 dakika bekleyin.'
      };
    }
    
    // Son 1 dakikadaki mesajları kontrol et
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const lastMinuteMessages = userMessages.filter(m => new Date(m.timestamp) > oneMinuteAgo);
    
    // Flood kontrolü: 1 dakikada maksimum 15 mesaj
    if (lastMinuteMessages.length >= 15) {
      return {
        allowed: false,
        message: 'Çok hızlı mesaj gönderiyorsunuz! Lütfen biraz bekleyin.'
      };
    }
    
    // Aynı içerik kontrolü (son 10 mesaj)
    const lastTenMessages = userMessages.slice(-10);
    const duplicateMessage = lastTenMessages.find(m => 
      m.text.toLowerCase() === messageText.toLowerCase()
    );
    
    if (duplicateMessage) {
      // Son 5 dakika içinde aynı mesaj var mı
      const duplicateTime = new Date(duplicateMessage.timestamp);
      if (duplicateTime > fiveMinutesAgo) {
        return {
          allowed: false,
          message: 'Bu mesajı yakın zamanda gönderdiniz!'
        };
      }
    }
    
    // Çok kısa aralıklarla mesaj kontrolü (son 10 saniye)
    const tenSecondsAgo = new Date(Date.now() - 10 * 1000);
    const veryRecentMessages = userMessages.filter(m => new Date(m.timestamp) > tenSecondsAgo);
    
    if (veryRecentMessages.length >= 3) {
      return {
        allowed: false,
        message: 'Lütfen mesajlar arasında en az 3 saniye bekleyin.'
      };
    }
    
    return { allowed: true };
  }
  
  // Conversation güncelle
  updateConversation(conversationId, senderId, receiverId, lastMessage) {
    const conversations = this.getData('conversations');
    const existingIndex = conversations.findIndex(c => c.id === conversationId);
    
    const conversationData = {
      id: conversationId,
      participants: [senderId, receiverId],
      lastMessage: lastMessage,
      lastMessageTime: new Date().toISOString(),
      lastSenderId: senderId,
      unreadCount: existingIndex !== -1 ? conversations[existingIndex].unreadCount + 1 : 1,
      updatedAt: new Date().toISOString()
    };
    
    if (existingIndex !== -1) {
      conversations[existingIndex] = conversationData;
    } else {
      conversations.push(conversationData);
    }
    
    this.setData('conversations', conversations);
  }
  
  // Conversation mesajlarını getir
  getConversationMessages(conversationId, limit = null) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Mesajları görüntülemek için giriş yapmalısınız!' };
    }
    
    if (!conversationId || typeof conversationId !== 'string') {
      return { success: false, message: 'Geçersiz conversation ID!' };
    }
    
    // Conversation'a erişim var mı kontrol et
    const [userId1, userId2] = conversationId.split('_').map(Number);
    if (!userId1 || !userId2 || (currentUser.id !== userId1 && currentUser.id !== userId2)) {
      return { success: false, message: 'Bu konuşmaya erişim yetkiniz yok!' };
    }
    
    const messages = this.getData('messages');
    const conversationMessages = messages
      .filter(m => m.conversationId === conversationId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    const result = limit ? conversationMessages.slice(-limit) : conversationMessages;
    
    return { 
      success: true, 
      messages: result,
      count: conversationMessages.length
    };
  }
  
  // Kullanıcının tüm konuşmalarını getir
  getUserConversations(userId = null) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Konuşmaları görüntülemek için giriş yapmalısınız!' };
    }
    
    const targetUserId = userId || currentUser.id;
    
    // Sadece kendi konuşmalarını görebilir
    if (currentUser.id !== targetUserId) {
      return { success: false, message: 'Başkasının konuşmalarını görüntüleyemezsiniz!' };
    }
    
    const conversations = this.getData('conversations');
    const userConversations = conversations
      .filter(c => c.participants.includes(targetUserId))
      .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
    
    // Partner bilgilerini ekle
    const users = this.getData('users');
    const enrichedConversations = userConversations.map(conv => {
      const partnerId = conv.participants.find(p => p !== targetUserId);
      const partner = users.find(u => u.id === partnerId);
      
      return {
        ...conv,
        partner: partner ? {
          id: partner.id,
          name: this.sanitizeContent(partner.name),
          avatar: partner.avatar
        } : null
      };
    });
    
    return { 
      success: true, 
      conversations: enrichedConversations,
      count: enrichedConversations.length
    };
  }
  
  // Mesajı okundu olarak işaretle
  markMessageAsRead(messageId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'İşlem için giriş yapmalısınız!' };
    }
    
    if (!messageId || typeof messageId !== 'number') {
      return { success: false, message: 'Geçersiz mesaj ID!' };
    }
    
    const messages = this.getData('messages');
    const messageIndex = messages.findIndex(m => m.id === messageId);
    
    if (messageIndex === -1) {
      return { success: false, message: 'Mesaj bulunamadı!' };
    }
    
    const message = messages[messageIndex];
    
    // Sadece alıcı mesajı okundu olarak işaretleyebilir
    if (message.receiverId !== currentUser.id) {
      return { success: false, message: 'Bu mesajı okundu olarak işaretleme yetkiniz yok!' };
    }
    
    if (message.isRead) {
      return { success: false, message: 'Mesaj zaten okundu!' };
    }
    
    messages[messageIndex].isRead = true;
    messages[messageIndex].readAt = new Date().toISOString();
    this.setData('messages', messages);
    
    return { success: true, message: 'Mesaj okundu olarak işaretlendi!' };
  }
  
  // Conversation'ı okundu olarak işaretle
  markConversationAsRead(conversationId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'İşlem için giriş yapmalısınız!' };
    }
    
    // Conversation'daki tüm okunmamış mesajları okundu yap
    const messages = this.getData('messages');
    const conversationMessages = messages.filter(m => 
      m.conversationId === conversationId && 
      m.receiverId === currentUser.id && 
      !m.isRead
    );
    
    conversationMessages.forEach(message => {
      const messageIndex = messages.findIndex(m => m.id === message.id);
      if (messageIndex !== -1) {
        messages[messageIndex].isRead = true;
        messages[messageIndex].readAt = new Date().toISOString();
      }
    });
    
    this.setData('messages', messages);
    
    // Conversation unread count sıfırla
    const conversations = this.getData('conversations');
    const conversationIndex = conversations.findIndex(c => c.id === conversationId);
    
    if (conversationIndex !== -1) {
      conversations[conversationIndex].unreadCount = 0;
      this.setData('conversations', conversations);
    }
    
    return { 
      success: true, 
      message: 'Konuşma okundu olarak işaretlendi!',
      markedCount: conversationMessages.length
    };
  }
  
  // Okunmamış mesaj sayısını getir
  getUnreadMessageCount(userId = null) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return 0;
    
    const targetUserId = userId || currentUser.id;
    
    const messages = this.getData('messages');
    return messages.filter(m => 
      m.receiverId === targetUserId && !m.isRead
    ).length;
  }
  
  // Mesaj ara
  searchMessages(query, conversationId = null) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Arama için giriş yapmalısınız!' };
    }
    
    if (!query || typeof query !== 'string' || query.trim().length < 2) {
      return { success: false, message: 'Arama terimi en az 2 karakter olmalı!' };
    }
    
    const messages = this.getData('messages');
    let searchMessages = messages;
    
    // Sadece kullanıcının erişebileceği mesajları ara
    searchMessages = searchMessages.filter(m => 
      m.senderId === currentUser.id || m.receiverId === currentUser.id
    );
    
    // Belirli bir conversation'da ara
    if (conversationId) {
      searchMessages = searchMessages.filter(m => m.conversationId === conversationId);
    }
    
    // Arama yap
    const sanitizedQuery = this.sanitizeContent(query.toLowerCase());
    const results = searchMessages.filter(m => 
      m.text.toLowerCase().includes(sanitizedQuery)
    ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return { 
      success: true, 
      results: results,
      count: results.length,
      query: sanitizedQuery
    };
  }

  // BİLDİRİM SİSTEMİ
  
  // Bildirim oluştur
  createNotification(receiverId, notificationData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Bildirim oluşturmak için giriş yapmalısınız!' };
    }
    
    // Kendine bildirim gönderme engelleme
    if (currentUser.id === receiverId) {
      return { success: false, message: 'Kendinize bildirim gönderemezsiniz!' };
    }
    
    // Input validation
    if (!receiverId || typeof receiverId !== 'number') {
      return { success: false, message: 'Geçersiz alıcı ID!' };
    }
    
    if (!notificationData || typeof notificationData !== 'object') {
      return { success: false, message: 'Geçersiz bildirim verisi!' };
    }
    
    // Alıcı kullanıcı var mı kontrol et
    const users = this.getData('users');
    const receiver = users.find(u => u.id === receiverId);
    
    if (!receiver) {
      return { success: false, message: 'Alıcı kullanıcı bulunamadı!' };
    }
    
    // Type validation
    const validTypes = ['like', 'comment', 'follow', 'message', 'match', 'team', 'system'];
    if (!notificationData.type || !validTypes.includes(notificationData.type)) {
      return { success: false, message: 'Geçersiz bildirim tipi!' };
    }
    
    // Content sanitization
    const sanitizedTitle = notificationData.title ? 
      this.sanitizeContent(notificationData.title) : this.generateNotificationTitle(notificationData.type, currentUser.name);
    const sanitizedMessage = notificationData.message ? 
      this.sanitizeContent(notificationData.message) : this.generateNotificationMessage(notificationData.type, currentUser.name);
    
    // Spam kontrolü - aynı bildirim kontrolü (son 5 dakika)
    const spamCheck = this.checkNotificationSpam(currentUser.id, receiverId, notificationData.type);
    if (!spamCheck.allowed) {
      return { success: false, message: spamCheck.message };
    }
    
    // Yeni bildirim oluştur
    const newNotification = {
      id: Date.now(),
      receiverId: receiverId,
      senderId: currentUser.id,
      senderName: this.sanitizeContent(currentUser.name),
      senderAvatar: currentUser.avatar || '👤',
      type: notificationData.type,
      title: sanitizedTitle,
      message: sanitizedMessage,
      data: notificationData.data || {},
      read: false,
      createdAt: new Date().toISOString(),
      timestamp: Date.now()
    };
    
    // Bildirim kaydet
    const notifications = this.getData('notifications');
    notifications.push(newNotification);
    this.setData('notifications', notifications);
    
    // Real-time event trigger
    this.triggerNotificationEvent('newNotification', {
      notification: newNotification,
      receiverId: receiverId
    });
    
    return { 
      success: true, 
      message: 'Bildirim oluşturuldu!',
      notificationId: newNotification.id
    };
  }
  
  // Bildirim spam kontrolü
  checkNotificationSpam(senderId, receiverId, type) {
    const notifications = this.getData('notifications');
    
    // Son 5 dakikadaki aynı tip bildirimleri kontrol et
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentSimilar = notifications.filter(n => 
      n.senderId === senderId && 
      n.receiverId === receiverId && 
      n.type === type &&
      new Date(n.createdAt) > fiveMinutesAgo
    );
    
    // Aynı tip bildirim sayısı kontrolü
    if (recentSimilar.length >= 3) {
      return {
        allowed: false,
        message: 'Çok sık aynı tip bildirim gönderiyorsunuz! Lütfen bekleyin.'
      };
    }
    
    // Genel bildirim sayısı kontrolü (son 1 dakika)
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const recentAll = notifications.filter(n => 
      n.senderId === senderId && 
      new Date(n.createdAt) > oneMinuteAgo
    );
    
    if (recentAll.length >= 10) {
      return {
        allowed: false,
        message: 'Çok hızlı bildirim gönderiyorsunuz! Lütfen bekleyin.'
      };
    }
    
    return { allowed: true };
  }
  
  // Bildirim başlığı oluştur
  generateNotificationTitle(type, senderName) {
    const titles = {
      'like': 'Gönderin beğenildi',
      'comment': 'Gönderine yorum yapıldı',
      'follow': 'Seni takip ediyor',
      'message': 'Yeni mesaj',
      'match': 'Maç bildirimi',
      'team': 'Takım bildirimi',
      'system': 'Sistem bildirimi'
    };
    
    return titles[type] || 'Bildirim';
  }
  
  // Bildirim mesajı oluştur
  generateNotificationMessage(type, senderName) {
    const messages = {
      'like': `${senderName} gönderinizi beğendi`,
      'comment': `${senderName} gönderinize yorum yaptı`,
      'follow': `${senderName} sizi takip etmeye başladı`,
      'message': `${senderName} size mesaj gönderdi`,
      'match': `${senderName} maç düzenledi`,
      'team': `${senderName} takım etkinliği`,
      'system': 'Sistem bildirimi'
    };
    
    return messages[type] || 'Yeni bildirim';
  }
  
  // Kullanıcının bildirimlerini getir
  getNotifications(userId = null, limit = null) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Bildirimleri görüntülemek için giriş yapmalısınız!' };
    }
    
    const targetUserId = userId || currentUser.id;
    
    // Sadece kendi bildirimlerini görebilir
    if (currentUser.id !== targetUserId) {
      return { success: false, message: 'Başkasının bildirimlerini görüntüleyemezsiniz!' };
    }
    
    const notifications = this.getData('notifications');
    const userNotifications = notifications
      .filter(n => n.receiverId === targetUserId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const result = limit ? userNotifications.slice(0, limit) : userNotifications;
    
    return { 
      success: true, 
      notifications: result,
      count: userNotifications.length,
      unreadCount: userNotifications.filter(n => !n.read).length
    };
  }
  
  // Bildirimi okundu olarak işaretle
  markNotificationAsRead(notificationId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'İşlem için giriş yapmalısınız!' };
    }
    
    if (!notificationId || typeof notificationId !== 'number') {
      return { success: false, message: 'Geçersiz bildirim ID!' };
    }
    
    const notifications = this.getData('notifications');
    const notificationIndex = notifications.findIndex(n => n.id === notificationId);
    
    if (notificationIndex === -1) {
      return { success: false, message: 'Bildirim bulunamadı!' };
    }
    
    const notification = notifications[notificationIndex];
    
    // Sadece alıcı bildirimi okundu olarak işaretleyebilir
    if (notification.receiverId !== currentUser.id) {
      return { success: false, message: 'Bu bildirimi okundu olarak işaretleme yetkiniz yok!' };
    }
    
    if (notification.read) {
      return { success: false, message: 'Bildirim zaten okundu!' };
    }
    
    notifications[notificationIndex].read = true;
    notifications[notificationIndex].readAt = new Date().toISOString();
    this.setData('notifications', notifications);
    
    return { success: true, message: 'Bildirim okundu olarak işaretlendi!' };
  }
  
  // Tüm bildirimleri okundu olarak işaretle
  markAllNotificationsAsRead(userId = null) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'İşlem için giriş yapmalısınız!' };
    }
    
    const targetUserId = userId || currentUser.id;
    
    if (currentUser.id !== targetUserId) {
      return { success: false, message: 'Sadece kendi bildirimlerinizi işaretleyebilirsiniz!' };
    }
    
    const notifications = this.getData('notifications');
    let markedCount = 0;
    
    notifications.forEach((notification, index) => {
      if (notification.receiverId === targetUserId && !notification.read) {
        notifications[index].read = true;
        notifications[index].readAt = new Date().toISOString();
        markedCount++;
      }
    });
    
    this.setData('notifications', notifications);
    
    return { 
      success: true, 
      message: `${markedCount} bildirim okundu olarak işaretlendi!`,
      markedCount: markedCount
    };
  }
  
  // Okunmamış bildirim sayısını getir
  getUnreadNotificationCount(userId = null) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return 0;
    
    const targetUserId = userId || currentUser.id;
    
    const notifications = this.getData('notifications');
    return notifications.filter(n => 
      n.receiverId === targetUserId && !n.read
    ).length;
  }
  
  // Bildirimi sil
  deleteNotification(notificationId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'İşlem için giriş yapmalısınız!' };
    }
    
    const notifications = this.getData('notifications');
    const notificationIndex = notifications.findIndex(n => n.id === notificationId);
    
    if (notificationIndex === -1) {
      return { success: false, message: 'Bildirim bulunamadı!' };
    }
    
    const notification = notifications[notificationIndex];
    
    // Sadece alıcı bildirimi silebilir
    if (notification.receiverId !== currentUser.id) {
      return { success: false, message: 'Bu bildirimi silme yetkiniz yok!' };
    }
    
    notifications.splice(notificationIndex, 1);
    this.setData('notifications', notifications);
    
    return { success: true, message: 'Bildirim silindi!' };
  }
  
  // Real-time bildirim event'i trigger et
  triggerNotificationEvent(eventType, data) {
    // Custom event oluştur
    const event = new CustomEvent('pasliosNotification', {
      detail: { type: eventType, data: data }
    });
    
    // LocalStorage event ile diğer tab/pencereler bilgilendir
    localStorage.setItem('paslios_notification_event', JSON.stringify({
      type: eventType,
      data: data,
      timestamp: Date.now()
    }));
    
    // Event'i trigger et
    window.dispatchEvent(event);
  }
}

// Global instance
const pasliosData = new PasliosData();