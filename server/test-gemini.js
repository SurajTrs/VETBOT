const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGeminiAPI() {
  try {
    console.log('🧪 Testing Gemini API connection...');
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not found in environment variables');
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });
    
    const prompt = `You are a veterinary assistant. Answer this question briefly: 
    "How often should I feed my 3-month-old puppy?"`;
    
    console.log('📤 Sending test prompt to Gemini...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Gemini API Response:');
    console.log('---');
    console.log(text);
    console.log('---');
    console.log('🎉 Gemini API integration working correctly!');
    
  } catch (error) {
    console.error('❌ Gemini API test failed:', error.message);
    process.exit(1);
  }
}

testGeminiAPI();