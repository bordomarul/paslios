// Paslios Data Management System
// Gerçek kullanıcılar için temiz veri yönetimi

class PasliosData {
  constructor() {
    this.initializeDatabase();
  }

  // Temiz veritabanı başlatma
  initializeDatabase() {
    // Kullanıcılar - başlangıçta boş
    if (!localStorage.getItem('paslios_users')) {
      localStorage.setItem('paslios_users', JSON.stringify([]));
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
    const keys = ['users', 'posts', 'teams', 'matches', 'bookings'];
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
}

// Global instance
const pasliosData = new PasliosData();