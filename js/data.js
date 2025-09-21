// Paslios Data Management System
// LocalStorage tabanlı veri yönetimi

class pasliosData {
  constructor() {
    this.initializeDatabase();
  }

  // Veritabanını başlat
  initializeDatabase() {
    // Kullanıcı verileri
    if (!localStorage.getItem('paslios_users')) {
      const defaultUsers = [
        {
          id: 1,
          name: 'Ahmet Yılmaz',
          email: 'ahmet@example.com',
          phone: '0555 123 45 67',
          position: 'Forvet',
          rating: 4.8,
          avatar: 'AY',
          bio: 'Serbest çalışan yazılım geliştirici ve futbol tutkunu',
          location: 'Ankara, Türkiye',
          matchesPlayed: 87,
          goals: 23,
          assists: 12,
          isCurrentUser: true,
          teamId: 1,
          joinDate: '2024-01-15'
        },
        {
          id: 2,
          name: 'Mehmet Kaya',
          email: 'mehmet@example.com',
          phone: '0555 234 56 78',
          position: 'Orta Saha',
          rating: 4.6,
          avatar: 'MK',
          bio: 'Futbol aşığı mühendis',
          location: 'Ankara, Türkiye',
          matchesPlayed: 65,
          goals: 8,
          assists: 15,
          teamId: 1
        },
        {
          id: 3,
          name: 'Ali Demir',
          email: 'ali@example.com',
          phone: '0555 345 67 89',
          position: 'Defans',
          rating: 4.5,
          avatar: 'AD',
          bio: 'Profesyonel defans oyuncusu',
          location: 'Ankara, Türkiye',
          matchesPlayed: 92,
          goals: 3,
          assists: 7,
          teamId: 1
        }
      ];
      this.setData('users', defaultUsers);
    }

    // Takım verileri
    if (!localStorage.getItem('paslios_teams')) {
      const defaultTeams = [
        {
          id: 1,
          name: 'Çankaya Tigers',
          avatar: 'CT',
          description: 'Çankaya bölgesinin en güçlü takımı',
          foundedDate: '2023-05-15',
          captainId: 1,
          members: [1, 2, 3],
          matchesPlayed: 24,
          wins: 18,
          draws: 4,
          losses: 2,
          points: 58,
          goals: 67,
          goalsAgainst: 23,
          trophies: 3
        }
      ];
      this.setData('teams', defaultTeams);
    }

    // Maç verileri
    if (!localStorage.getItem('paslios_matches')) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

      const defaultMatches = [
        {
          id: 1,
          type: 'individual',
          title: 'Ankara Spor Halısaha',
          date: today.toISOString().split('T')[0],
          time: '19:00',
          location: 'Çankaya, Ankara',
          players: ['Ahmet Y.', 'Mehmet K.', 'Ali D.', 'Can S.', 'Emre T.', 'Burak A.', 'Cem K.', 'Oğuz M.'],
          maxPlayers: 10,
          currentPlayers: 8,
          price: 25,
          status: 'waiting',
          organizer: 'Ahmet Yılmaz',
          organizerId: 1
        },
        {
          id: 2,
          type: 'individual',
          title: 'Çimenli Futbol Sahası',
          date: tomorrow.toISOString().split('T')[0],
          time: '20:30',
          location: 'Keçiören, Ankara',
          players: ['Mehmet K.', 'Ali D.', 'Can S.', 'Emre T.', 'Burak A.', 'Cem K.', 'Oğuz M.', 'Serkan Y.', 'Tolga B.', 'Murat K.'],
          maxPlayers: 10,
          currentPlayers: 10,
          price: 30,
          status: 'full',
          organizer: 'Mehmet Kaya',
          organizerId: 2
        },
        {
          id: 3,
          type: 'team',
          title: 'Çankaya Tigers vs Mamak Yıldızları',
          date: dayAfterTomorrow.toISOString().split('T')[0],
          time: '15:00',
          location: 'Mamak Sports Complex',
          teamA: { id: 1, name: 'Çankaya Tigers' },
          teamB: { id: 2, name: 'Mamak Yıldızları' },
          status: 'confirmed',
          tournament: 'Ankara Amatör Ligi'
        }
      ];
      this.setData('matches', defaultMatches);
    }

    // Mesaj verileri
    if (!localStorage.getItem('paslios_messages')) {
      const defaultMessages = [
        {
          id: 1,
          senderId: 2,
          receiverId: 1,
          message: 'Selam! Bu akşam maça gelecek misin?',
          timestamp: Date.now() - 3600000,
          read: false
        },
        {
          id: 2,
          senderId: 1,
          receiverId: 2,
          message: 'Evet kesinlikle! Saat kaçta başlıyor?',
          timestamp: Date.now() - 3480000,
          read: true
        }
      ];
      this.setData('messages', defaultMessages);
    }

    // Bildirim verileri
    if (!localStorage.getItem('paslios_notifications')) {
      const defaultNotifications = [
        {
          id: 1,
          type: 'match_invite',
          title: 'Maç Daveti',
          message: 'Mehmet Kaya sizi yarınki maça davet etti',
          timestamp: Date.now() - 1800000,
          read: false,
          actionUrl: 'matches.html'
        },
        {
          id: 2,
          type: 'team_update',
          title: 'Takım Güncellemesi',
          message: 'Çankaya Tigers takımında yeni bir üye var',
          timestamp: Date.now() - 7200000,
          read: false,
          actionUrl: 'team.html'
        }
      ];
      this.setData('notifications', defaultNotifications);
    }

    // Sosyal gönderi verileri
    if (!localStorage.getItem('paslios_posts')) {
      const defaultPosts = [
        {
          id: 1,
          authorId: 2,
          authorName: 'Mehmet Kaya',
          authorAvatar: 'MK',
          content: 'Bugünkü maçta harika bir performans sergiledik! Takım arkadaşlarım çok iyiydi. Bu tempo devam ederse şampiyonluk bizim! 🏆⚽',
          timestamp: Date.now() - 7200000, // 2 saat önce
          likes: 24,
          comments: 8,
          shares: 3,
          likedBy: [1, 3, 4, 5],
          type: 'match_result'
        },
        {
          id: 2,
          authorId: 3,
          authorName: 'Emre Demir',
          authorAvatar: 'ED',
          content: 'Yeni ayakkabılarım geldi! Nike Mercurial Vapor 15. Yarın sahada test edeceğim. Kim durmak ister? 😏⚽',
          timestamp: Date.now() - 14400000, // 4 saat önce
          likes: 18,
          comments: 12,
          shares: 2,
          likedBy: [1, 2, 6],
          type: 'equipment'
        },
        {
          id: 3,
          authorId: 4,
          authorName: 'Can Özkan',
          authorAvatar: 'CÖ',
          content: 'Geçen hafta 5 gol attım! Bu sezonki en iyi performansımdı. Antrenmanlar gerçekten işe yarıyor 💪🔥',
          timestamp: Date.now() - 86400000, // 1 gün önce
          likes: 32,
          comments: 6,
          shares: 5,
          likedBy: [1, 2, 3, 7, 8],
          type: 'achievement'
        },
        {
          id: 4,
          authorId: 5,
          authorName: 'Burak Tunç',
          authorAvatar: 'BT',
          content: 'Yeni saha keşfettim! Çimenli ve çok güzel. Bu hafta sonu orada maç yapacağız. Kimse gelecek? 🌱⚽',
          timestamp: Date.now() - 172800000, // 2 gün önce
          likes: 21,
          comments: 15,
          shares: 4,
          likedBy: [1, 2, 9, 10],
          type: 'venue_discovery'
        }
      ];
      this.setData('posts', defaultPosts);
    }

    // Rezervasyon verileri
    if (!localStorage.getItem('paslios_bookings')) {
      const defaultBookings = [
        {
          id: 1,
          userId: 1,
          userName: 'Ahmet Yılmaz',
          userPhone: '0555 123 45 67',
          venueName: 'Spor A Halısaha',
          venuePrice: 150,
          date: new Date().toISOString().split('T')[0],
          time: '19:00',
          playerCount: 10,
          totalPrice: 150,
          status: 'confirmed',
          bookingDate: Date.now() - 86400000, // 1 gün önce
          paymentMethod: 'credit_card',
          notes: 'Çankaya bölgesindeki arkadaşlarla maç'
        }
      ];
      this.setData('bookings', defaultBookings);
    }

    // Ayarlar
    if (!localStorage.getItem('paslios_settings')) {
      const defaultSettings = {
        theme: 'light',
        language: 'tr',
        notifications: {
          push: true,
          matchInvites: true,
          weeklyReport: true,
          teamUpdates: true
        },
        privacy: {
          profileVisible: true,
          contactVisible: true,
          statsVisible: true
        }
      };
      this.setData('settings', defaultSettings);
    }
  }

  // Veri getir
  getData(key) {
    const data = localStorage.getItem(`paslios_${key}`);
    return data ? JSON.parse(data) : null;
  }

  // Veri kaydet
  setData(key, data) {
    localStorage.setItem(`paslios_${key}`, JSON.stringify(data));
  }

  // Veri güncelle
  updateData(key, id, updatedData) {
    const data = this.getData(key);
    if (data && Array.isArray(data)) {
      const index = data.findIndex(item => item.id === id);
      if (index !== -1) {
        data[index] = { ...data[index], ...updatedData };
        this.setData(key, data);
        return true;
      }
    }
    return false;
  }

  // Veri ekle
  addData(key, newData) {
    const data = this.getData(key) || [];
    const newId = Math.max(...data.map(item => item.id || 0)) + 1;
    const dataWithId = { ...newData, id: newId };
    data.push(dataWithId);
    this.setData(key, data);
    return dataWithId;
  }

  // Veri sil
  deleteData(key, id) {
    const data = this.getData(key);
    if (data && Array.isArray(data)) {
      const filteredData = data.filter(item => item.id !== id);
      this.setData(key, filteredData);
      return true;
    }
    return false;
  }

  // Kullanıcı yönetimi
  getCurrentUser() {
    const users = this.getData('users');
    return users ? users.find(user => user.isCurrentUser) : null;
  }

  updateCurrentUser(userData) {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return this.updateData('users', currentUser.id, userData);
    }
    return false;
  }

  // Oturum yönetimi
  login(email, password) {
    const users = this.getData('users');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Tüm kullanıcıları isCurrentUser: false yap
      users.forEach(u => u.isCurrentUser = false);
      // Giriş yapan kullanıcıyı işaretle
      user.isCurrentUser = true;
      this.setData('users', users);
      
      // Oturum bilgisini kaydet
      this.setData('session', {
        isLoggedIn: true,
        userId: user.id,
        loginTime: Date.now()
      });
      
      return { success: true, user };
    }
    
    return { success: false, message: 'Kullanıcı bulunamadı' };
  }

  register(userData) {
    const users = this.getData('users');
    
    // Email kontrolü
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'Bu email zaten kayıtlı' };
    }

    // Yeni kullanıcı oluştur
    const newUser = {
      ...userData,
      rating: 0,
      avatar: userData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      matchesPlayed: 0,
      goals: 0,
      assists: 0,
      isCurrentUser: true,
      joinDate: new Date().toISOString().split('T')[0]
    };

    // Diğer kullanıcıları isCurrentUser: false yap
    users.forEach(u => u.isCurrentUser = false);
    
    const addedUser = this.addData('users', newUser);
    
    // Oturum bilgisini kaydet
    this.setData('session', {
      isLoggedIn: true,
      userId: addedUser.id,
      loginTime: Date.now()
    });
    
    return { success: true, user: addedUser };
  }

  logout() {
    const users = this.getData('users');
    users.forEach(u => u.isCurrentUser = false);
    this.setData('users', users);
    
    this.setData('session', {
      isLoggedIn: false,
      userId: null,
      loginTime: null
    });
  }

  isLoggedIn() {
    const session = this.getData('session');
    return session && session.isLoggedIn;
  }

  // Yardımcı fonksiyonlar
  searchUsers(query) {
    const users = this.getData('users');
    return users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.position.toLowerCase().includes(query.toLowerCase()) ||
      user.location.toLowerCase().includes(query.toLowerCase())
    );
  }

  searchTeams(query) {
    const teams = this.getData('teams');
    return teams.filter(team => 
      team.name.toLowerCase().includes(query.toLowerCase()) ||
      team.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  getUpcomingMatches() {
    const matches = this.getData('matches');
    const now = new Date();
    return matches.filter(match => {
      const matchDate = new Date(`${match.date} ${match.time}`);
      return matchDate > now;
    }).sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
  }

  getUserStats(userId) {
    const user = this.getData('users').find(u => u.id === userId);
    if (!user) return null;

    return {
      matchesPlayed: user.matchesPlayed || 0,
      goals: user.goals || 0,
      assists: user.assists || 0,
      rating: user.rating || 0,
      winRate: user.matchesPlayed > 0 ? ((user.wins || 0) / user.matchesPlayed * 100).toFixed(1) : 0
    };
  }

  // Sosyal gönderi yönetimi
  getPosts(limit = 10) {
    const posts = this.getData('posts') || [];
    return posts
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  createPost(content, type = 'general') {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { success: false, message: 'Giriş yapmalısınız' };

    const newPost = {
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content: content,
      timestamp: Date.now(),
      likes: 0,
      comments: 0,
      shares: 0,
      likedBy: [],
      type: type
    };

    const addedPost = this.addData('posts', newPost);
    return { success: true, post: addedPost };
  }

  likePost(postId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { success: false, message: 'Giriş yapmalısınız' };

    const posts = this.getData('posts');
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) return { success: false, message: 'Gönderi bulunamadı' };

    const post = posts[postIndex];
    const userLikedIndex = post.likedBy.indexOf(currentUser.id);

    if (userLikedIndex === -1) {
      // Beğeni ekle
      post.likedBy.push(currentUser.id);
      post.likes++;
    } else {
      // Beğeniyi kaldır
      post.likedBy.splice(userLikedIndex, 1);
      post.likes--;
    }

    this.setData('posts', posts);
    return { success: true, liked: userLikedIndex === -1, likes: post.likes };
  }

  sharePost(postId) {
    const posts = this.getData('posts');
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) return { success: false, message: 'Gönderi bulunamadı' };

    posts[postIndex].shares++;
    this.setData('posts', posts);
    return { success: true, shares: posts[postIndex].shares };
  }

  addComment(postId, comment) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { success: false, message: 'Giriş yapmalısınız' };

    const posts = this.getData('posts');
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) return { success: false, message: 'Gönderi bulunamadı' };

    posts[postIndex].comments++;
    this.setData('posts', posts);

    // Yorumu ayrı olarak da saklayabiliriz (gelecekte detaylı yorum sistemi için)
    return { success: true, comments: posts[postIndex].comments };
  }

  formatTimeAgo(timestamp) {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    if (diffInSeconds < 60) return 'Az önce';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} gün önce`;
    
    return new Date(timestamp).toLocaleDateString('tr-TR');
  }

  // Rezervasyon yönetimi
  getBookings(userId = null) {
    const bookings = this.getData('bookings') || [];
    if (userId) {
      return bookings.filter(booking => booking.userId === userId);
    }
    return bookings;
  }

  createBooking(bookingData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { success: false, message: 'Giriş yapmalısınız' };

    const newBooking = {
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone || '',
      venueName: bookingData.venueName,
      venuePrice: bookingData.venuePrice,
      date: bookingData.date,
      time: bookingData.time,
      playerCount: bookingData.playerCount,
      totalPrice: bookingData.totalPrice,
      status: 'confirmed',
      bookingDate: Date.now(),
      paymentMethod: bookingData.paymentMethod || 'credit_card',
      notes: bookingData.notes || ''
    };

    const addedBooking = this.addData('bookings', newBooking);
    return { success: true, booking: addedBooking };
  }

  cancelBooking(bookingId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { success: false, message: 'Giriş yapmalısınız' };

    const bookings = this.getData('bookings');
    const bookingIndex = bookings.findIndex(b => b.id === bookingId && b.userId === currentUser.id);
    
    if (bookingIndex === -1) return { success: false, message: 'Rezervasyon bulunamadı' };

    bookings[bookingIndex].status = 'cancelled';
    this.setData('bookings', bookings);
    return { success: true };
  }

  // Saha keşfedelme fonksiyonları
  getVenues() {
    return this.getData('venues') || this.getDefaultVenues();
  }

  getDefaultVenues() {
    const defaultVenues = [
      {
        id: 1,
        name: 'Spor A Halısaha',
        location: 'Çankaya, Ankara',
        distance: '1.2 km',
        price: 150,
        rating: 4.8,
        reviewCount: 156,
        type: 'Halı Saha',
        features: ['Duş', 'Soyunma Odası', 'Otopark', 'Kafe', 'WiFi'],
        availableSlots: ['17:00', '18:00', '19:00', '20:00', '22:00'],
        image: '🏟️'
      },
      {
        id: 2,
        name: 'Champions Halısaha',
        location: 'Keçiören, Ankara',
        distance: '2.8 km',
        price: 180,
        rating: 4.6,
        reviewCount: 89,
        type: 'Halı Saha',
        features: ['Duş', 'Soyunma Odası', 'Otopark', 'Tribün'],
        availableSlots: ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
        image: '🏟️'
      },
      {
        id: 3,
        name: 'Elite Football Center',
        location: 'Kızılay, Ankara',
        distance: '3.5 km',
        price: 200,
        rating: 4.9,
        reviewCount: 234,
        type: 'Çim Saha',
        features: ['Duş', 'Soyunma Odası', 'Otopark', 'Kafe', 'Klima', 'Ses Sistemi'],
        availableSlots: ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
        image: '🌱'
      }
    ];
    
    this.setData('venues', defaultVenues);
    return defaultVenues;
  }
}

// Global instance oluştur
window.PasliosData = new pasliosData();
