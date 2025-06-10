import React, { useState, useEffect, useRef } from 'react';
import './management.css';

const Communication = () => {
 const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Harvey Specter',
      status: 'busy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Wrong. You take the gun, or you pull out a bigger one.',
      time: '2 min ago',
      unread: 2,
      isBlocked: false
    },
    {
      id: 2,
      name: 'Rachel Zane',
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'I was thinking we could have dinner tonight?',
      time: '5 min ago',
      unread: 0,
      isBlocked: false
    },
    {
      id: 3,
      name: 'Louis Litt',
      status: 'away',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'You just got LITT up!',
      time: '1 hour ago',
      unread: 1,
      isBlocked: false
    },
    {
      id: 4,
      name: 'Donna Paulsen',
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'I know everything! I\'m Donna.',
      time: '2 hours ago',
      unread: 0,
      isBlocked: false
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: 2,
      text: 'How are you doing today?',
      timestamp: new Date(Date.now() - 1000000),
      isOwn: false
    },
    {
      id: 2,
      senderId: 1,
      text: 'I\'m doing great! Just working on some new cases.',
      timestamp: new Date(Date.now() - 500000),
      isOwn: true
    },
    {
      id: 3,
      senderId: 2,
      text: 'That sounds exciting! Need any help?',
      timestamp: new Date(Date.now() - 300000),
      isOwn: false
    }
  ]);

  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userStatus, setUserStatus] = useState('online');
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const contactOptionsRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle clicks outside dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setShowStatusOptions(false);
      }
      if (contactOptionsRef.current && !contactOptionsRef.current.contains(event.target)) {
        setShowContactOptions(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: Date.now(),
      senderId: 1,
      text: newMessage,
      timestamp: new Date(),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Update last message in contacts
    setContacts(prev => prev.map(contact => 
      contact.id === activeContact.id 
        ? { ...contact, lastMessage: `You: ${newMessage}`, time: 'now' }
        : contact
    ));

    // Simulate response after 2 seconds
    setTimeout(() => {
      const responses = [
        "That's interesting!",
        "I see what you mean.",
        "Tell me more about that.",
        "Absolutely!",
        "I understand.",
        "That makes sense."
      ];
      
      const response = {
        id: Date.now() + 1,
        senderId: activeContact.id,
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isOwn: false
      };
      
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const deleteMessage = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const deleteChat = () => {
    setMessages([]);
    setShowContactOptions(null);
  };

  const blockContact = (contactId) => {
    setContacts(prev => prev.map(contact =>
      contact.id === contactId 
        ? { ...contact, isBlocked: !contact.isBlocked }
        : contact
    ));
    setShowContactOptions(null);
  };

  const deleteContact = (contactId) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
    if (activeContact.id === contactId) {
      setActiveContact(contacts.find(c => c.id !== contactId) || null);
    }
    setShowContactOptions(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload here
      console.log('File selected:', file.name);
    }
  };

  const handleContactClick = (contact) => {
    if (!contact.isBlocked) {
      setActiveContact(contact);
      if (isMobile) {
        setSidebarExpanded(false);
      }
      // Mark as read when contact is clicked
      setContacts(prev => prev.map(c => 
        c.id === contact.id ? { ...c, unread: 0 } : c
      ));
    }
  };

  const handleContactOptionsClick = (e, contactId) => {
    e.stopPropagation();
    setShowContactOptions(showContactOptions === contactId ? null : contactId);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#2ecc71';
      case 'away': return '#f1c40f';
      case 'busy': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="chat-app">
      <div className={`sidebar ${sidebarExpanded ? 'expanded' : ''}`}>
        {/* User Profile */}
        <div className="user-profile">
          <div className="profile-info">
            <div className="avatar-container">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face" 
                alt="User" 
                className="avatar"
              />
              <div 
                className="status-indicator"
                style={{ backgroundColor: getStatusColor(userStatus) }}
              ></div>
            </div>
            {!isMobile && (
              <div className="user-details">
                <h3>Mike Ross</h3>
                <p className="status-text">{userStatus}</p>
              </div>
            )}
          </div>
          
          {!isMobile && (
            <div className="profile-actions">
              <div ref={statusDropdownRef}>
                <button 
                  className="status-btn"
                  onClick={() => setShowStatusOptions(!showStatusOptions)}
                >
                  <i className="fas fa-chevron-down"></i>
                </button>
                
                {showStatusOptions && (
                  <div className="status-dropdown">
                    {['online', 'away', 'busy', 'offline'].map(status => (
                      <div 
                        key={status}
                        className={`status-option ${userStatus === status ? 'active' : ''}`}
                        onClick={() => {
                          setUserStatus(status);
                          setShowStatusOptions(false);
                        }}
                      >
                        <div 
                          className="status-dot"
                          style={{ backgroundColor: getStatusColor(status) }}
                        ></div>
                        <span>{status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Search */}
        {!isMobile && (
          <div className="search-container">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {/* Contacts List */}
        <div className="contacts-list">
          {filteredContacts.map(contact => (
            <div
              key={contact.id}
              className={`contact-item ${activeContact?.id === contact.id ? 'active' : ''} ${contact.isBlocked ? 'blocked' : ''}`}
              onClick={() => handleContactClick(contact)}
            >
              <div className="contact-avatar">
                <img src={contact.avatar} alt={contact.name} />
                <div 
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(contact.status) }}
                ></div>
              </div>
              
              {!isMobile && (
                <div className="contact-info">
                  <div className="contact-header">
                    <h4>{contact.name}</h4>
                    <span className="time">{contact.time}</span>
                  </div>
                  <div className="contact-footer">
                    <p className="last-message">
                      {contact.isBlocked ? 'Blocked' : contact.lastMessage}
                    </p>
                    {contact.unread > 0 && (
                      <span className="unread-badge">{contact.unread}</span>
                    )}
                  </div>
                </div>
              )}

              <div className="contact-options">
                <div ref={contactOptionsRef}>
                  <button
                    className="options-btn"
                    onClick={(e) => handleContactOptionsClick(e, contact.id)}
                  >
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                  
                  {showContactOptions === contact.id && (
                    <div className="options-dropdown">
                      <button onClick={() => deleteChat()}>
                        <i className="fas fa-trash"></i> Clear Chat
                      </button>
                      <button onClick={() => blockContact(contact.id)}>
                        <i className={`fas ${contact.isBlocked ? 'fa-unlock' : 'fa-ban'}`}></i>
                        {contact.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                      <button 
                        onClick={() => deleteContact(contact.id)}
                        className="danger"
                      >
                        <i className="fas fa-user-times"></i> Delete Contact
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {activeContact ? (
          <>
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-contact-info">
                {isMobile && (
                  <button 
                    className="mobile-back-btn"
                    onClick={() => setSidebarExpanded(true)}
                  >
                    <i className="fas fa-arrow-left"></i>
                  </button>
                )}
                
                <div className="contact-avatar">
                  <img src={activeContact.avatar} alt={activeContact.name} />
                  <div 
                    className="status-indicator"
                    style={{ backgroundColor: getStatusColor(activeContact.status) }}
                  ></div>
                </div>
                
                <div className="contact-details">
                  <h3>{activeContact.name}</h3>
                  <p>{activeContact.isBlocked ? 'Blocked' : activeContact.status}</p>
                </div>
              </div>
              
              <div className="chat-actions">
                <button><i className="fas fa-phone"></i></button>
                <button><i className="fas fa-video"></i></button>
                <button><i className="fas fa-info-circle"></i></button>
              </div>
            </div>

            {/* Messages */}
            <div className="messages-container">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`message ${message.isOwn ? 'own' : 'other'}`}
                >
                  {!message.isOwn && (
                    <img 
                      src={activeContact.avatar} 
                      alt={activeContact.name}
                      className="message-avatar"
                    />
                  )}
                  
                  <div className="message-content">
                    <div className="message-bubble">
                      <p>{message.text}</p>
                      <span className="message-time">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    
                    {message.isOwn && (
                      <button
                        className="delete-message-btn"
                        onClick={() => deleteMessage(message.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            {!activeContact.isBlocked && (
              <div className="message-input-container">
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  
                  <div className="input-actions">
                    <button onClick={() => fileInputRef.current?.click()}>
                      <i className="fas fa-paperclip"></i>
                    </button>
                    <button 
                      onClick={sendMessage}
                      className="send-btn"
                      disabled={!newMessage.trim()}
                    >
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </div>
            )}
          </>
        ) : (
          <div className="no-chat-selected">
            <i className="fas fa-comments"></i>
            <h3>Select a conversation</h3>
            <p>Choose a contact to start messaging</p>
          </div>
        )}
      </div>

      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <button 
          className="mobile-sidebar-toggle"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
        >
          <i className="fas fa-bars"></i>
        </button>
      )}
    </div>
  );
};

export default Communication;