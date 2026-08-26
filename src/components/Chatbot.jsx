import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { chatAgent } from '../services/ai';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Namaste! I am your PoshanSarthi. Ask me anything about your diet, food choices, or Indian cuisine.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    // Exclude the first introductory message from history if we want to save tokens, but it's fine.
    const history = [...messages]; 
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await chatAgent(history, userMessage);
      setMessages(prev => [...prev, { role: 'bot', content: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', content: 'Apologies, I am having trouble connecting to my knowledge base right now. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="card glass-panel chat-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="card-title" style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '15px' }}>
        <Bot size={24} color="var(--primary-color)" />
        Food Awareness Agent
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <motion.div 
            key={index} 
            className={`message ${msg.role}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              {msg.role === 'bot' ? <Bot size={18} color="var(--primary-color)" style={{ marginTop: '3px' }}/> : <User size={18} color="var(--secondary-color)" style={{ marginTop: '3px' }}/>}
              <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="message bot">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Bot size={18} color="var(--primary-color)" />
              <span style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input 
          type="text" 
          className="glass-input" 
          placeholder="e.g. Is it okay to eat rice at night if I want to lose weight?" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="glass-button" onClick={handleSend} disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
          <Send size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default Chatbot;
