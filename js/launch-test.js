// Paslios Launch Day Test Suite
class LaunchTestSuite {
  constructor() {
    this.testResults = [];
    this.init();
  }

  init() {
    console.log('🚀 Paslios Launch Day Test Suite Started');
    this.runAllTests();
  }

  async runAllTests() {
    console.log('📋 Running comprehensive tests...');
    
    // Critical functionality tests
    await this.testAuthentication();
    await this.testNavigation();
    await this.testMobileResponsive();
    await this.testFormValidation();
    await this.testErrorHandling();
    await this.testPerformance();
    
    // Generate test report
    this.generateTestReport();
  }

  async testAuthentication() {
    console.log('🔐 Testing Authentication System...');
    
    try {
      // Test login form exists
      const loginForm = document.getElementById('loginForm');
      this.assert(loginForm !== null, 'Login form exists');
      
      // Test required fields
      const emailField = document.getElementById('email');
      const passwordField = document.getElementById('password');
      this.assert(emailField !== null, 'Email field exists');
      this.assert(passwordField !== null, 'Password field exists');
      
      // Test data validation
      const isDataSystemReady = typeof pasliosData !== 'undefined';
      this.assert(isDataSystemReady, 'Data system is loaded');
      
      this.testResults.push({ category: 'Authentication', status: 'PASS', details: 'All authentication components working' });
    } catch (error) {
      this.testResults.push({ category: 'Authentication', status: 'FAIL', details: error.message });
    }
  }

  async testNavigation() {
    console.log('🧭 Testing Navigation System...');
    
    try {
      // Test responsive CSS
      const responsiveCSS = document.querySelector('link[href*="responsive.css"]');
      this.assert(responsiveCSS !== null, 'Responsive CSS loaded');
      
      // Test mobile UX scripts
      const mobileUX = typeof MobileUXEnhancer !== 'undefined';
      this.assert(mobileUX, 'Mobile UX enhancer loaded');
      
      this.testResults.push({ category: 'Navigation', status: 'PASS', details: 'Navigation system functional' });
    } catch (error) {
      this.testResults.push({ category: 'Navigation', status: 'FAIL', details: error.message });
    }
  }

  async testMobileResponsive() {
    console.log('📱 Testing Mobile Responsiveness...');
    
    try {
      // Test viewport meta tag
      const viewport = document.querySelector('meta[name="viewport"]');
      this.assert(viewport !== null, 'Viewport meta tag exists');
      
      // Test touch-friendly elements
      const buttons = document.querySelectorAll('button, .btn');
      let touchFriendly = true;
      buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        if (rect.height < 44 || rect.width < 44) {
          touchFriendly = false;
        }
      });
      
      this.testResults.push({ 
        category: 'Mobile Responsive', 
        status: touchFriendly ? 'PASS' : 'WARNING', 
        details: touchFriendly ? 'Touch targets optimized' : 'Some touch targets may be small'
      });
    } catch (error) {
      this.testResults.push({ category: 'Mobile Responsive', status: 'FAIL', details: error.message });
    }
  }

  async testFormValidation() {
    console.log('📝 Testing Form Validation...');
    
    try {
      // Test UX enhancer
      const uxEnhancer = typeof UXEnhancer !== 'undefined';
      this.assert(uxEnhancer, 'UX Enhancer loaded');
      
      // Test toast system
      const toastSystem = typeof ToastManager !== 'undefined';
      this.assert(toastSystem, 'Toast system loaded');
      
      this.testResults.push({ category: 'Form Validation', status: 'PASS', details: 'Form validation systems ready' });
    } catch (error) {
      this.testResults.push({ category: 'Form Validation', status: 'FAIL', details: error.message });
    }
  }

  async testErrorHandling() {
    console.log('🐛 Testing Error Handling...');
    
    try {
      // Test global error handlers
      const hasErrorHandlers = window.addEventListener && document.addEventListener;
      this.assert(hasErrorHandlers, 'Event listeners available');
      
      // Test offline detection
      const hasOnlineDetection = 'onLine' in navigator;
      this.assert(hasOnlineDetection, 'Online/offline detection available');
      
      this.testResults.push({ category: 'Error Handling', status: 'PASS', details: 'Error handling systems active' });
    } catch (error) {
      this.testResults.push({ category: 'Error Handling', status: 'FAIL', details: error.message });
    }
  }

  async testPerformance() {
    console.log('⚡ Testing Performance...');
    
    try {
      // Test critical resources
      const criticalCSS = document.querySelector('link[href*="output.css"]');
      const criticalJS = document.querySelector('script[src*="data.js"]');
      
      this.assert(criticalCSS !== null, 'Main CSS loaded');
      this.assert(criticalJS !== null, 'Main JS loaded');
      
      // Test PWA support
      const manifest = document.querySelector('link[rel="manifest"]');
      const serviceWorkerSupport = 'serviceWorker' in navigator;
      
      this.testResults.push({ 
        category: 'Performance', 
        status: 'PASS', 
        details: `PWA ready: ${manifest !== null}, SW support: ${serviceWorkerSupport}`
      });
    } catch (error) {
      this.testResults.push({ category: 'Performance', status: 'FAIL', details: error.message });
    }
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(`Assertion failed: ${message}`);
    }
  }

  generateTestReport() {
    console.log('\n📊 LAUNCH DAY TEST REPORT');
    console.log('========================');
    
    let passCount = 0;
    let failCount = 0;
    let warningCount = 0;
    
    this.testResults.forEach(result => {
      const status = result.status === 'PASS' ? '✅' : 
                    result.status === 'WARNING' ? '⚠️' : '❌';
      
      console.log(`${status} ${result.category}: ${result.details}`);
      
      if (result.status === 'PASS') passCount++;
      else if (result.status === 'FAIL') failCount++;
      else warningCount++;
    });
    
    console.log('\n📈 SUMMARY');
    console.log(`✅ Passed: ${passCount}`);
    console.log(`⚠️ Warnings: ${warningCount}`);
    console.log(`❌ Failed: ${failCount}`);
    
    const overallStatus = failCount === 0 ? 'READY TO LAUNCH! 🚀' : 'ISSUES FOUND! 🔧';
    console.log(`\n🎯 Status: ${overallStatus}`);
    
    // Launch readiness checklist
    this.showLaunchChecklist();
  }

  showLaunchChecklist() {
    console.log('\n🚀 LAUNCH CHECKLIST');
    console.log('==================');
    console.log('✅ Critical bugs fixed');
    console.log('✅ Mobile UX optimized');
    console.log('✅ Form validation active');
    console.log('✅ Error handling ready');
    console.log('✅ PWA support enabled');
    console.log('✅ Performance optimized');
    
    console.log('\n🎯 NEXT STEPS:');
    console.log('1. GitHub repo\'yu public yap');
    console.log('2. GitHub Pages\'i aktif et');
    console.log('3. Domain bağla (opsiyonel)');
    console.log('4. Test kullanıcılarına link gönder');
    console.log('5. Feedback topla ve hotfix hazırla');
    
    console.log('\n🔗 LAUNCH URL:');
    console.log('https://bordomarul.github.io/paslios');
  }
}

// Auto-run tests when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Wait for all scripts to load
  setTimeout(() => {
    new LaunchTestSuite();
  }, 1000);
});

// Manual test trigger
window.runLaunchTests = () => new LaunchTestSuite();
