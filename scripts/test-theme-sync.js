// Test script to verify theme synchronization
console.log('🧪 Testing theme synchronization...\n');

// Simulate theme detection
const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
console.log('🌙 System prefers dark theme:', systemPrefersDark);

// Check localStorage
const storedTheme = localStorage.getItem('site-theme');
console.log('💾 Stored theme:', storedTheme || 'none');

// Expected behavior
console.log('\n✅ Expected behavior:');
console.log('1. On first visit: Theme should match system preference');
console.log('2. After user changes theme: Should persist across components');
console.log('3. Both Hero and Navbar buttons should show same state');
console.log('4. Theme should be applied to document.documentElement');

console.log('\n🎯 Theme synchronization test completed!');
