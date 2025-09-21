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
  
  // Basit password hashing (production'da bcrypt kullanılmalı)
  hashPassword(password) {
    // Bu sadece demo amaçlı basit hash - gerçek projede bcrypt kullanın
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32bit integer'a çevir
    }
    return 'hash_' + Math.abs(hash).toString(36) + '_' + password.length;
  }
  
  // Password doğrulama
  verifyPassword(password, hash) {
    return this.hashPassword(password) === hash;
  }

  // KULLANICI YÖNETİMİ
  
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
        expiresAt: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 saat
      };
      
      // Session'ı güvenli storage'a kaydet
      window.SecurityUtils.secureStorage.set('paslios_session', sessionData);
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
    
    const posts = this.getData('posts');
    const newPost = {
      id: Date.now(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content: content,
      type: type,
      timestamp: new Date().toISOString(),
      likedBy: [],
      comments: [],
      visibility: 'public'
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
    if (!currentUser) return false;
    
    const posts = this.getData('posts');
    const post = posts.find(p => p.id === postId);
    
    if (post) {
      if (post.likedBy.includes(currentUser.id)) {
        // Beğeniyi kaldır
        post.likedBy = post.likedBy.filter(id => id !== currentUser.id);
      } else {
        // Beğeni ekle
        post.likedBy.push(currentUser.id);
      }
      
      this.setData('posts', posts);
      return true;
    }
    
    return false;
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
    
    if (!commentText || commentText.trim().length === 0) {
      return { success: false, message: 'Yorum boş olamaz!' };
    }
    
    const posts = this.getData('posts');
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      return { success: false, message: 'Gönderi bulunamadı!' };
    }
    
    const newComment = {
      id: Date.now(),
      postId: postId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content: commentText.trim(),
      timestamp: new Date().toISOString(),
      likedBy: []
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
}

// Global instance
const pasliosData = new PasliosData();