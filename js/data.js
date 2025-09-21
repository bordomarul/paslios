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
      const defaultMatches = [
        {
          id: 1,
          type: 'individual',
          title: 'Keçiören Sports Center',
          date: '2025-09-20',
          time: '19:00',
          location: 'Keçiören, Ankara',
          players: ['Ahmet Y.', 'Mehmet K.', 'Ali D.', 'Can S.'],
          maxPlayers: 10,
          currentPlayers: 4,
          price: 25,
          status: 'waiting',
          organizer: 'Ahmet Yılmaz'
        },
        {
          id: 2,
          type: 'team',
          title: 'Çankaya Tigers vs Mamak Yıldızları',
          date: '2025-09-22',
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
    const user = users.find(u => u.email === email);
    
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
}

// Global instance oluştur
window.pasliosData = new pasliosData();
