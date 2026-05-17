import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { showNotification } from '../../redux/uiSlice';

// Simple product data for AI context
const PRODUCT_CONTEXT = `
Available Products:
1. Classic White Tee - $19.99 - 100% cotton, casual, versatile, essential wardrobe staple
2. Black V-Neck - $24.99 - Stylish v-neck, smart-casual, perfect for evenings
3. Blue Graphic Tee - $22.99 - Bold graphic design, artistic, statement piece
4. Red Polo Shirt - $27.99 - Classic polo, smart-casual, professional yet relaxed
`;

// AI System Prompt
const SYSTEM_PROMPT = `You are an expert fashion stylist for "Leve - Timeless Essentials", a premium t-shirt store.

Your job is to help customers find the perfect t-shirts through friendly conversation.

${PRODUCT_CONTEXT}

Guidelines:
- Be friendly, warm, and conversational
- Ask clarifying questions to understand their needs
- Recommend 1-3 products based on their requirements
- Explain WHY each product fits their needs
- If they mention budget, respect it
- If they mention occasion (work, casual, date, etc.), match appropriately
- Keep responses concise (2-4 sentences max)
- Always end with a helpful question or clear recommendation

When recommending:
- Classic White Tee: Perfect for casual everyday, layering, versatile
- Black V-Neck: Smart-casual, evening wear, stylish
- Blue Graphic Tee: Bold personality, artistic, casual fun
- Red Polo: Professional, smart-casual, elevated look

If user asks about price, mention it. If they want to buy, guide them.`;

const StyleAdvisor = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      text: "Hi! I'm your Leve Style Advisor. 👋\n\nLooking for the perfect t-shirt? Tell me:\n• What occasion is it for?\n• What's your style preference?\n• Any color you prefer?\n\nOr just say 'surprise me' and I'll recommend something great!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Get OpenRouter API key (Vite uses import.meta.env)
  const getApiKey = () => {
    // Try Vite's env first, then fallback
    const viteEnv = import.meta.env?.VITE_OPENROUTER_API_KEY || '';
    return viteEnv;
  };

  // Check if API is configured
  const isApiConfigured = () => {
    const key = getApiKey();
    return key && key.length > 10;
  };

  // Fallback responses when no API key
  const getFallbackResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    // Simple keyword matching
    if (msg.includes('work') || msg.includes('office') || msg.includes('professional')) {
      return {
        type: 'ai',
        text: "For work, I'd recommend the **Red Polo Shirt ($27.99)**! It strikes the perfect balance between professional and comfortable. The collar elevates the look while keeping it casual enough for modern workplaces.\n\nWant to add it to your cart?",
        product: { id: '4', name: 'Red Polo Shirt', price: 27.99, image: 'https://placehold.co/300x300/f7c1c1/a32d2d?text=Red+Polo', category: 'polo', colors: ['Red'], sizes: ['S','M','L','XL'] }
      };
    }
    
    if (msg.includes('casual') || msg.includes('everyday') || msg.includes('weekend')) {
      return {
        type: 'ai',
        text: "For everyday casual wear, you can't go wrong with the **Classic White Tee ($19.99)**! It's the ultimate versatile piece - wear it alone, layer it, dress it up or down.\n\nThe **Black V-Neck ($24.99)** is also great for a slightly elevated casual look.\n\nWhich one speaks to you?",
        products: [
          { id: '1', name: 'Classic White Tee', price: 19.99, image: 'https://placehold.co/300x300/f5f0eb/888?text=White+Tee', category: 'casual', colors: ['White'], sizes: ['S','M','L','XL'] },
          { id: '2', name: 'Black V-Neck', price: 24.99, image: 'https://placehold.co/300x300/2c2c2a/ccc?text=Black+V-Neck', category: 'casual', colors: ['Black'], sizes: ['S','M','L','XL'] }
        ]
      };
    }
    
    if (msg.includes('date') || msg.includes('night') || msg.includes('evening') || msg.includes('dinner')) {
      return {
        type: 'ai',
        text: "For a date night, I'd suggest the **Black V-Neck ($24.99)**! The v-neck is flattering and stylish - it's casual but shows you put thought into your look.\n\nPair it with dark jeans and you're set! Want to add it?",
        product: { id: '2', name: 'Black V-Neck', price: 24.99, image: 'https://placehold.co/300x300/2c2c2a/ccc?text=Black+V-Neck', category: 'casual', colors: ['Black'], sizes: ['S','M','L','XL'] }
      };
    }
    
    if (msg.includes('bold') || msg.includes('fun') || msg.includes('graphic') || msg.includes('statement')) {
      return {
        type: 'ai',
        text: "Love a bold choice! The **Blue Graphic Tee ($22.99)** is perfect for making a statement. It shows personality and artistic flair.\n\nGreat for concerts, casual outings, or anytime you want to stand out!",
        product: { id: '3', name: 'Blue Graphic Tee', price: 22.99, image: 'https://placehold.co/300x300/b5d4f4/185fa5?text=Blue+Graphic', category: 'graphic', colors: ['Blue'], sizes: ['S','M','L','XL'] }
      };
    }
    
    if (msg.includes('white') || msg.includes('basic') || msg.includes('essential')) {
      return {
        type: 'ai',
        text: "The **Classic White Tee ($19.99)** is THE essential. It's the foundation of any great wardrobe - goes with literally everything!\n\nYou can never have too many white tees. Want to add one?",
        product: { id: '1', name: 'Classic White Tee', price: 19.99, image: 'https://placehold.co/300x300/f5f0eb/888?text=White+Tee', category: 'casual', colors: ['White'], sizes: ['S','M','L','XL'] }
      };
    }
    
    if (msg.includes('budget') || msg.includes('cheap') || msg.includes('affordable') || msg.includes('price')) {
      return {
        type: 'ai',
        text: "Looking for the best value? The **Classic White Tee at $19.99** is your best bet! It's high-quality 100% cotton and the most versatile piece in our collection.\n\nGreat quality at an entry-level price point.",
        product: { id: '1', name: 'Classic White Tee', price: 19.99, image: 'https://placehold.co/300x300/f5f0eb/888?text=White+Tee', category: 'casual', colors: ['White'], sizes: ['S','M','L','XL'] }
      };
    }
    
    if (msg.includes('surprise') || msg.includes('recommend') || msg.includes('suggest')) {
      return {
        type: 'ai',
        text: "Here's my top pick: The **Red Polo Shirt ($27.99)**! 🎯\n\nIt's the most versatile - works for casual Fridays, weekend brunches, or even semi-formal occasions. The polo collar elevates it above a regular tee, but it's still comfortable and stylish.\n\nIt's our bestseller for a reason! Want to try it?",
        product: { id: '4', name: 'Red Polo Shirt', price: 27.99, image: 'https://placehold.co/300x300/f7c1c1/a32d2d?text=Red+Polo', category: 'polo', colors: ['Red'], sizes: ['S','M','L','XL'] }
      };
    }
    
    // Default response
    return {
      type: 'ai',
      text: "I'd love to help you find the perfect tee! Could you tell me a bit more about what you're looking for?\n\nFor example:\n• Casual everyday wear?\n• Something for work?\n• A night out?\n• Budget-friendly option?\n\nOr just say 'surprise me' and I'll pick something great! 😊"
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setInputText('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);

    try {
      if (isApiConfigured()) {
        // Use OpenRouter AI
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${getApiKey()}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Leve Style Advisor'
          },
          body: JSON.stringify({
            model: 'anthropic/claude-3.5-sonnet',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...messages.map(m => ({
                role: m.type === 'user' ? 'user' : 'assistant',
                content: m.text
              })),
              { role: 'user', content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 300
          })
        });

        if (!response.ok) throw new Error('API error');

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        setMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
      } else {
        // Use fallback logic
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate thinking
        const fallbackResponse = getFallbackResponse(userMessage);
        setMessages(prev => [...prev, fallbackResponse]);
      }
    } catch (error) {
      console.error('AI Error:', error);
      // Fallback on error
      const fallbackResponse = getFallbackResponse(userMessage);
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(showNotification({
      status: 'success',
      title: 'Added to Cart!',
      message: `${product.name} added successfully`
    }));
    
    setTimeout(() => {
      dispatch(showNotification({ status: null }));
    }, 2000);

    setMessages(prev => [...prev, {
      type: 'ai',
      text: `✅ Added ${product.name} to your cart!\n\nNeed anything else, or ready to checkout? 😊`
    }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Extract product recommendations from last message
  const getLastRecommendation = () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.type === 'ai') {
      return lastMessage.product || lastMessage.products;
    }
    return null;
  };

  const recommendation = getLastRecommendation();

  if (isMinimized) {
    return (
      <button 
        className="style-advisor-minimized"
        onClick={() => setIsMinimized(false)}
      >
        <span className="advisor-icon">💬</span>
        <span className="advisor-text">Style Advisor</span>
      </button>
    );
  }

  return (
    <div className={`style-advisor-container ${isOpen ? 'open' : ''}`}>
      <div className="style-advisor-header">
        <div className="advisor-title">
          <span className="advisor-icon">✨</span>
          <span>Style Advisor</span>
        </div>
        <div className="advisor-controls">
          <button 
            className="minimize-btn"
            onClick={() => setIsMinimized(true)}
            title="Minimize"
          >
            −
          </button>
          <button 
            className="close-btn"
            onClick={onClose}
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      <div className="style-advisor-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-bubble">
              {message.type === 'ai' && (
                <div className="message-avatar">🤖</div>
              )}
              <div className="message-content">
                {message.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message ai">
            <div className="message-bubble loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Add Buttons for Recommendations */}
      {recommendation && !isLoading && (
        <div className="quick-add-section">
          {Array.isArray(recommendation) ? (
            <div className="quick-add-multiple">
              <p className="quick-add-label">Quick Add:</p>
              <div className="quick-add-buttons">
                {recommendation.map((product, idx) => (
                  <button
                    key={idx}
                    className="quick-add-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <img src={product.image} alt={product.name} />
                    <span>{product.name}</span>
                    <strong>${product.price}</strong>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              className="quick-add-btn single"
              onClick={() => handleAddToCart(recommendation)}
            >
              <img src={recommendation.image} alt={recommendation.name} />
              <span>Add {recommendation.name}</span>
              <strong>${recommendation.price}</strong>
            </button>
          )}
        </div>
      )}

      <div className="style-advisor-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about styles, occasions, or say 'surprise me'..."
          disabled={isLoading}
        />
        <button 
          onClick={handleSendMessage}
          disabled={!inputText.trim() || isLoading}
          className="send-btn"
        >
          {isLoading ? '...' : '→'}
        </button>
      </div>

      <div className="style-advisor-footer">
        <span className="powered-by">
          {isApiConfigured() ? '🤖 AI Powered' : '💡 Smart Suggestions'}
        </span>
      </div>
    </div>
  );
};

export default StyleAdvisor;
