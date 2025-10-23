// Test script to verify video files are accessible
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const videosDir = path.join(publicDir, 'videos');

console.log('🔍 Checking video files...\n');

// Check if videos directory exists
if (!fs.existsSync(videosDir)) {
  console.error('❌ Videos directory not found!');
  process.exit(1);
}

// List all video files
const videoFiles = fs.readdirSync(videosDir).filter(file => 
  file.endsWith('.mp4') || file.endsWith('.webm') || file.endsWith('.mov')
);

console.log('📁 Found video files:');
videoFiles.forEach(file => {
  const filePath = path.join(videosDir, file);
  const stats = fs.statSync(filePath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`  ✅ ${file} (${sizeInMB} MB)`);
});

console.log(`\n📊 Total videos: ${videoFiles.length}`);

// Check if required videos exist
const requiredVideos = [
  'background-video.mp4',
  'parchment.mp4', 
  'stellar-wolf.mp4'
];

console.log('\n🎯 Checking required videos:');
requiredVideos.forEach(video => {
  const exists = videoFiles.includes(video);
  console.log(`  ${exists ? '✅' : '❌'} ${video}`);
});

console.log('\n✨ Video check completed!');
