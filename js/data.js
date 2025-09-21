// Paslios Data Management System
// LocalStorage tabanlı gelişmiş veri yönetimi

class PasliosData {
  constructor() {
    this.initializeDatabase();
  }

  // Veritabanını başlat
  initializeDatabase() {
    // Kullanıcı verileri - Gerçek kullanıcı profilleri
    if (!localStorage.getItem('paslios_users')) {
      const realUsers = [
        {
          id: 1,
          name: 'Ahmet Yılmaz',
          email: 'ahmet.yilmaz@paslios.com',
          phone: '0532 555 01 23',
          position: 'Forvet',
          rating: 4.7,
          avatar: null, // UI-Avatars kullanılacak
          bio: 'Yazılım mühendisi ve futbol tutkunu. 10 yıldır halısaha futbolu oynuyor.',
          location: 'Ankara/Çankaya',
          matchesPlayed: 127,
          matchesWon: 89,
          goals: 67,
          assists: 34,
          cleanSheets: 0,
          mvpAwards: 12,
          joinDate: '2023-08-15',
          lastLoginDate: new Date().toISOString(),
          isCurrentUser: true,
          teamId: 1,
          friendIds: [2, 3, 4, 5],
          stats: {
            totalPoints: 1247,
            weeklyPoints: 85,
            monthlyPoints: 324,
            level: 15,
            xp: 2456,
            badgeIds: [1, 2, 3, 5, 8]
          }
        },
        {
          id: 2,
          name: 'Mehmet Kaya',
          email: 'mehmet.kaya@gmail.com',
          phone: '0533 444 67 89',
          position: 'Orta Saha',
          rating: 4.5,
          avatar: null,
          bio: 'Makine mühendisi. Pas verme konusunda uzman.',
          location: 'Ankara/Keçiören',
          matchesPlayed: 98,
          matchesWon: 61,
          goals: 23,
          assists: 52,
          cleanSheets: 0,
          mvpAwards: 8,
          joinDate: '2023-09-22',
          lastLoginDate: '2024-12-20T15:30:00.000Z',
          teamId: 1,
          friendIds: [1, 3, 6],
          stats: {
            totalPoints: 987,
            weeklyPoints: 72,
            monthlyPoints: 289,
            level: 12,
            xp: 1876,
            badgeIds: [1, 3, 4]
          }
        },
        {
          id: 3,
          name: 'Ali Demir',
          email: 'ali.demir@hotmail.com',
          phone: '0534 777 12 34',
          position: 'Defans',
          rating: 4.8,
          avatar: null,
          bio: 'Güvenilir defans oyuncusu. Temiz oyun tarzıyla tanınır.',
          location: 'Ankara/Mamak',
          matchesPlayed: 156,
          matchesWon: 98,
          goals: 12,
          assists: 18,
          cleanSheets: 47,
          mvpAwards: 15,
          joinDate: '2023-07-10',
          lastLoginDate: '2024-12-21T09:15:00.000Z',
          teamId: 1,
          friendIds: [1, 2, 4, 7],
          stats: {
            totalPoints: 1456,
            weeklyPoints: 96,
            monthlyPoints: 378,
            level: 18,
            xp: 3124,
            badgeIds: [1, 2, 3, 6, 7, 9]
          }
        },
        {
          id: 4,
          name: 'Burak Özkan',
          email: 'burak.ozkan@yahoo.com',
          phone: '0535 888 99 00',
          position: 'Kaleci',
          rating: 4.6,
          avatar: null,
          bio: 'Deneyimli kaleci. Refleksleri çok iyi.',
          location: 'Ankara/Etimesgut',
          matchesPlayed: 89,
          matchesWon: 67,
          goals: 0,
          assists: 3,
          cleanSheets: 34,
          mvpAwards: 11,
          joinDate: '2023-10-05',
          lastLoginDate: '2024-12-21T14:20:00.000Z',
          teamId: 2,
          friendIds: [1, 3, 5],
          stats: {
            totalPoints: 1123,
            weeklyPoints: 78,
            monthlyPoints: 312,
            level: 14,
            xp: 2234,
            badgeIds: [1, 4, 5, 8]
          }
        },
        {
          id: 5,
          name: 'Emre Aydın',
          email: 'emre.aydin@gmail.com',
          phone: '0536 123 45 67',
          position: 'Kanat',
          rating: 4.4,
          avatar: null,
          bio: 'Hızlı kanat oyuncusu. Dripling konusunda yetenekli.',
          location: 'Ankara/Yenimahalle',
          matchesPlayed: 72,
          matchesWon: 45,
          goals: 31,
          assists: 28,
          cleanSheets: 0,
          mvpAwards: 6,
          joinDate: '2023-11-18',
          lastLoginDate: '2024-12-20T18:45:00.000Z',
          teamId: null,
          friendIds: [1, 4, 6],
          stats: {
            totalPoints: 867,
            weeklyPoints: 64,
            monthlyPoints: 256,
            level: 11,
            xp: 1675,
            badgeIds: [1, 2, 4]
          }
        },
        {
          id: 6,
          name: 'Cem Yıldız',
          email: 'cem.yildiz@outlook.com',
          phone: '0537 456 78 90',
          position: 'Orta Saha',
          rating: 4.3,
          avatar: null,
          bio: 'Genç ve hırslı oyuncu. Sürekli gelişim halinde.',
          location: 'Ankara/Altındağ',
          matchesPlayed: 43,
          matchesWon: 24,
          goals: 8,
          assists: 14,
          cleanSheets: 0,
          mvpAwards: 2,
          joinDate: '2024-01-12',
          lastLoginDate: '2024-12-21T11:30:00.000Z',
          teamId: null,
          friendIds: [2, 5],
          stats: {
            totalPoints: 534,
            weeklyPoints: 45,
            monthlyPoints: 187,
            level: 7,
            xp: 892,
            badgeIds: [1]
          }
        }
      ];
      this.setData('users', realUsers);
    }

    // Takım verileri - Gerçek takım bilgileri
    if (!localStorage.getItem('paslios_teams')) {
      const realTeams = [
        {
          id: 1,
          name: 'Çankaya Tigers FC',
          emoji: '🐅',
          color: '#ff6b35',
          privacy: 'public',
          description: 'Çankaya bölgesinin en deneyimli halısaha takımı. 2018\'den beri faaliyet gösteriyoruz.',
          foundedDate: '2018-03-15',
          captainId: 1,
          members: [1, 2, 3],
          memberCount: 3,
          location: 'Ankara/Çankaya',
          homeVenue: 'Çankaya Halısaha Complex',
          matchesPlayed: 89,
          wins: 58,
          draws: 18,
          losses: 13,
          points: 192,
          goalsFor: 234,
          goalsAgainst: 127,
          trophies: 5,
          achievements: [
            'Çankaya Ligi Şampiyonu 2023',
            'En Fair Play Takımı 2024',
            'Bölge Kupası Finalisti 2023'
          ],
          createdAt: '2018-03-15T00:00:00.000Z',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Keçiören Wolves',
          emoji: '🐺',
          color: '#2d3748',
          privacy: 'invite',
          description: 'Genç ve dinamik oyuncu kadrosuyla dikkat çeken takım.',
          foundedDate: '2020-09-08',
          captainId: 4,
          members: [4],
          memberCount: 1,
          location: 'Ankara/Keçiören',
          homeVenue: 'Keçiören Sports Center',
          matchesPlayed: 67,
          wins: 41,
          draws: 14,
          losses: 12,
          points: 137,
          goalsFor: 178,
          goalsAgainst: 89,
          trophies: 2,
          achievements: [
            'Keçiören Kupası Şampiyonu 2024',
            'En Genç Takım Ödülü 2023'
          ],
          createdAt: '2020-09-08T00:00:00.000Z',
          updatedAt: new Date().toISOString()
        }
      ];
      this.setData('teams', realTeams);
    }

    // Maç verileri - Gerçek maç bilgileri
    if (!localStorage.getItem('paslios_matches')) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      const realMatches = [
        {
          id: 1,
          type: 'individual',
          title: 'Akşam Halısaha Maçı',
          date: today.toISOString().split('T')[0],
          time: '19:30',
          venue: 'Çankaya Halısaha Complex',
          location: 'Ankara/Çankaya',
          players: [1, 2, 3, 5],
          maxPlayers: 10,
          currentPlayers: 4,
          price: 25,
          status: 'waiting',
          organizer: 'Ahmet Yılmaz',
          organizerId: 1,
          description: 'Hafta sonundan önce güzel bir maç yapalım!',
          skillLevel: 'intermediate',
          duration: 90,
          pitchType: 'halısaha',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          type: 'individual',
          title: 'Pazartesi Akşam Futbolu',
          date: tomorrow.toISOString().split('T')[0],
          time: '20:00',
          venue: 'Keçiören Sports Center',
          location: 'Ankara/Keçiören',
          players: [2, 4, 6],
          maxPlayers: 12,
          currentPlayers: 3,
          price: 30,
          status: 'waiting',
          organizer: 'Mehmet Kaya',
          organizerId: 2,
          description: 'Haftaya iyi başlayalım. Tüm seviyelerden oyuncular davetli.',
          skillLevel: 'beginner',
          duration: 90,
          pitchType: 'çim',
          createdAt: '2024-12-20T14:30:00.000Z'
        },
        {
          id: 3,
          type: 'team',
          title: 'Çankaya Tigers vs Keçiören Wolves',
          date: nextWeek.toISOString().split('T')[0],
          time: '15:00',
          venue: 'Ankara Büyükşehir Stadyumu',
          location: 'Ankara/Merkez',
          homeTeam: 1,
          awayTeam: 2,
          maxPlayers: 22,
          currentPlayers: 22,
          price: 0,
          status: 'confirmed',
          organizer: 'Çankaya Tigers FC',
          organizerId: 1,
          description: 'Sezonun en büyük derbisi! İki güçlü takım karşı karşıya.',
          skillLevel: 'advanced',
          duration: 90,
          pitchType: 'çim',
          isCompetitive: true,
          createdAt: '2024-12-15T10:00:00.000Z'
        },
        {
          id: 4,
          type: 'individual',
          title: 'Öğle Arası Hızlı Maç',
          date: today.toISOString().split('T')[0],
          time: '12:30',
          venue: 'Tunalı Sports Club',
          location: 'Ankara/Çankaya',
          players: [1, 3],
          maxPlayers: 8,
          currentPlayers: 2,
          price: 20,
          status: 'waiting',
          organizer: 'Ali Demir',
          organizerId: 3,
          description: 'Öğle molasında kısa bir maç. 45 dakika sürecek.',
          skillLevel: 'intermediate',
          duration: 45,
          pitchType: 'halısaha',
          createdAt: '2024-12-21T08:00:00.000Z'
        }
      ];
      this.setData('matches', realMatches);
    }

    // Mesaj verileri - Gerçek mesajlaşma sistemi
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
