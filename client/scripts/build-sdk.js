const fs = require('fs');
const path = require('path');

// Read the built React files
const buildDir = path.join(__dirname, '../build');
const staticDir = path.join(buildDir, 'static');

// Find the main JS and CSS files
const jsFiles = fs.readdirSync(path.join(staticDir, 'js')).filter(file => file.endsWith('.js') && !file.includes('.map'));
const cssFiles = fs.readdirSync(path.join(staticDir, 'css')).filter(file => file.endsWith('.css') && !file.includes('.map'));

const mainJsFile = jsFiles.find(file => file.startsWith('main.')) || jsFiles[0];
const mainCssFile = cssFiles.find(file => file.startsWith('main.')) || cssFiles[0];

// Read the content
const jsContent = fs.readFileSync(path.join(staticDir, 'js', mainJsFile), 'utf8');
const cssContent = fs.readFileSync(path.join(staticDir, 'css', mainCssFile), 'utf8');

// Create the SDK script
const sdkScript = `
(function() {
  'use strict';
  
  // Prevent multiple initializations
  if (window.VetChatbotSDK) {
    return;
  }
  
  // Mark as initialized
  window.VetChatbotSDK = true;
  
  // Inject CSS
  const style = document.createElement('style');
  style.textContent = \`${cssContent.replace(/`/g, '\\`')}\`;
  document.head.appendChild(style);
  
  // Create container for React app
  const container = document.createElement('div');
  container.id = 'vet-chatbot-root';
  document.body.appendChild(container);
  
  // Load React and render the chatbot
  ${jsContent}
  
})();
`;

// Write the SDK file
const publicDir = path.join(__dirname, '../../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'chatbot.js'), sdkScript);

console.log('✅ SDK script generated successfully at public/chatbot.js');
console.log('📦 File size:', Math.round(sdkScript.length / 1024), 'KB');