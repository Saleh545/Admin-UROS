import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  Avatar, TextField, IconButton, Badge, InputAdornment, 
  Chip, useTheme, Menu, MenuItem, Fade 
} from '@mui/material';
import { 
  Search, Send, SmartToy, CheckCircle, ExpandMore, 
  ArrowBack, AttachFile, InsertEmoticon, MoreVert, 
  WhatsApp, Telegram 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// --- MOCK DATA ---
const INITIAL_CHATS = [
  {
    id: 1,
    name: 'Rauf Aliyev',
    platform: 'whatsapp',
    lastMsg: 'Salam, masa bron etmək olar?',
    time: '14:30',
    unread: 0,
    phone: '+994 50 123 45 67'
  },
  {
    id: 2,
    name: 'Tural',
    platform: 'telegram',
    lastMsg: '/start',
    time: 'Dünən',
    unread: 1,
    phone: '@tural_dev'
  }
];

const INITIAL_MESSAGES = [
  { id: 1, chatId: 1, text: 'Salam', time: '14:28', sender: 'user' },
  { id: 2, chatId: 1, text: 'Salam! UR-OS Bot sizi salamlayır. 🤖', time: '14:28', sender: 'ai' },
  { id: 3, chatId: 1, text: 'Salam, masa bron etmək olar?', time: '14:30', sender: 'user' },
  { id: 4, chatId: 2, text: '/start', time: '10:00', sender: 'user' },
];

const ChatCRM = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark'; // Mövzu yoxlanışı
  
  // --- STATE ---
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputMsg, setInputMsg] = useState('');
  const [isAiActive, setIsAiActive] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('Grand Baku (Center)');
  const messagesEndRef = useRef(null);

  // --- DYNAMIC COLORS (FIX) ---
  const CARD_BG = isDark ? '#312d4b' : '#fff';
  const BLUE = '#4285F4'; 
  const GREEN = '#72E128'; 
  
  // Mətn rəngləri (Dark/Light uyğunlaşması)
  const TEXT_MAIN = isDark ? '#fff' : 'text.primary';
  const TEXT_MUTED = isDark ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary';
  
  // Fon rəngləri
  const HOVER_BG = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)';
  const SELECTED_CHAT_BG = isDark ? 'rgba(66, 133, 244, 0.15)' : 'rgba(66, 133, 244, 0.08)';
  const INPUT_BG = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const BORDER_COLOR = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  
  // Mesaj qutuları
  const USER_MSG_BG = isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f1f1';
  const USER_MSG_TEXT = isDark ? '#fff' : 'text.primary';
  const AI_MSG_BG = 'linear-gradient(98deg, #4285F4 0%, #346efd 100%)';
  const ADMIN_MSG_BG = 'linear-gradient(98deg, #72E128 0%, #5cb81c 100%)';

  // --- HANDLERS ---
  const activeChat = INITIAL_CHATS.find(c => c.id === selectedChatId);
  const currentMessages = messages.filter(m => m.chatId === selectedChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    const newMsg = {
      id: Date.now(),
      chatId: selectedChatId,
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'admin'
    };
    setMessages([...messages, newMsg]);
    setInputMsg('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isAiActive) handleSendMessage();
  };

  return (
    <Box sx={{ 
      width: '100%', 
      height: 'calc(100vh - 100px)', 
      maxHeight: '800px',
      maxWidth: '100vw', 
      overflow: 'hidden', 
      boxSizing: 'border-box', 
      p: { xs: 2, md: 3 },
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* --- TOP BAR --- */}
      <Box sx={{ mb: 2 }}>
        <Button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          endIcon={<ExpandMore />}
          sx={{ 
            color: BLUE, 
            fontWeight: 'bold', 
            textTransform: 'none', 
            fontSize: '1rem',
            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
          }}
        >
          {selectedBranch}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          TransitionComponent={Fade}
          PaperProps={{ sx: { bgcolor: isDark ? '#312d4b' : '#fff', color: TEXT_MAIN } }}
        >
          <MenuItem onClick={() => { setSelectedBranch('Grand Baku (Center)'); setAnchorEl(null); }}>Grand Baku (Center)</MenuItem>
          <MenuItem onClick={() => { setSelectedBranch('Grand Baku (Mall)'); setAnchorEl(null); }}>Grand Baku (Mall)</MenuItem>
        </Menu>
      </Box>

      {/* --- LAYOUT --- */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '320px 1fr' }, 
        gap: 3, 
        flexGrow: 1,
        minHeight: 0 
      }}>

        {/* === LEFT LIST === */}
        <Card sx={{ 
          bgcolor: CARD_BG, 
          borderRadius: '16px', 
          boxShadow: 3, 
          display: { xs: selectedChatId ? 'none' : 'flex', md: 'flex' }, 
          flexDirection: 'column',
          height: '100%',
          minWidth: 0
        }}>
          <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: TEXT_MAIN }}>
                {t('chat.title')}
              </Typography>
              <IconButton size="small" sx={{ color: BLUE }}>
                <Badge color="error" variant="dot"><MoreVert /></Badge>
              </IconButton>
            </Box>

            <TextField 
              fullWidth 
              placeholder={t('chat.search_placeholder')}
              size="small"
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { bgcolor: INPUT_BG, color: TEXT_MAIN, borderRadius: '8px' } }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search sx={{ color: TEXT_MUTED }} /></InputAdornment>
              }}
            />

            <Box sx={{ overflowY: 'auto', flexGrow: 1, pr: 1 }}>
              {INITIAL_CHATS.map((chat) => (
                <Box 
                  key={chat.id} 
                  onClick={() => setSelectedChatId(chat.id)}
                  sx={{ 
                    display: 'flex', alignItems: 'center', p: 1.5, mb: 1, borderRadius: '12px', cursor: 'pointer',
                    bgcolor: selectedChatId === chat.id ? SELECTED_CHAT_BG : 'transparent',
                    borderLeft: selectedChatId === chat.id ? `4px solid ${BLUE}` : '4px solid transparent',
                    '&:hover': { bgcolor: HOVER_BG }
                  }}
                >
                  <Badge 
                    overlap="circular" 
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      chat.platform === 'whatsapp' 
                      ? <WhatsApp sx={{ color: '#fff', fontSize: 10, bgcolor: '#25D366', borderRadius: '50%', p: 0.3, width: 16, height: 16 }} />
                      : <Telegram sx={{ color: '#fff', fontSize: 10, bgcolor: '#0088cc', borderRadius: '50%', p: 0.3, width: 16, height: 16 }} />
                    }
                  >
                    <Avatar sx={{ bgcolor: BLUE, width: 40, height: 40, fontSize: '1rem' }}>{chat.name[0]}</Avatar>
                  </Badge>
                  
                  <Box sx={{ ml: 1.5, flexGrow: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight="bold" sx={{ color: TEXT_MAIN, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {chat.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: TEXT_MUTED }}>{chat.time}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {chat.lastMsg}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* === RIGHT CHAT === */}
        <Card sx={{ 
          bgcolor: CARD_BG, 
          borderRadius: '16px', 
          boxShadow: 3, 
          display: { xs: selectedChatId ? 'flex' : 'none', md: 'flex' }, 
          flexDirection: 'column',
          height: '100%',
          minWidth: 0,
          backgroundImage: 'none'
        }}>
          {activeChat ? (
            <>
              {/* Header */}
              <Box sx={{ p: 2, borderBottom: `1px solid ${BORDER_COLOR}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => setSelectedChatId(null)} sx={{ display: { xs: 'flex', md: 'none' }, color: TEXT_MUTED, mr: 1 }}>
                    <ArrowBack />
                  </IconButton>
                  <Avatar sx={{ bgcolor: BLUE, width: 40, height: 40 }}>{activeChat.name[0]}</Avatar>
                  <Box sx={{ ml: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: TEXT_MAIN }}>{activeChat.name}</Typography>
                      <CheckCircle sx={{ fontSize: 14, color: GREEN }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: TEXT_MUTED }}>{activeChat.phone}</Typography>
                  </Box>
                </Box>
                
                <Chip 
                  onClick={() => setIsAiActive(!isAiActive)}
                  icon={<SmartToy sx={{ fontSize: '1rem !important', color: isAiActive ? GREEN : TEXT_MUTED }} />} 
                  label={isAiActive ? "AI Auto: ON" : "AI Auto: OFF"} 
                  size="small" 
                  sx={{ 
                    cursor: 'pointer',
                    bgcolor: isAiActive ? 'rgba(114, 225, 40, 0.15)' : INPUT_BG, 
                    color: isAiActive ? GREEN : TEXT_MUTED, 
                    fontWeight: 'bold', 
                    border: `1px solid ${isAiActive ? GREEN : BORDER_COLOR}`,
                    '&:hover': { opacity: 0.8 }
                  }} 
                />
              </Box>

              {/* Messages */}
              <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {currentMessages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  const isAi = msg.sender === 'ai';
                  const isAdmin = msg.sender === 'admin';
                  const alignRight = isAi || isAdmin;

                  return (
                    <Box key={msg.id} sx={{ alignSelf: alignRight ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                      {isAi && (
                        <Typography variant="caption" sx={{ color: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5, mb: 0.5, fontWeight: 'bold' }}>
                          <SmartToy sx={{ fontSize: 12 }} /> AI Gpt-4o
                        </Typography>
                      )}
                      <Box sx={{ 
                        bgcolor: isUser ? USER_MSG_BG : 'transparent',
                        background: isAi ? AI_MSG_BG : (isAdmin ? ADMIN_MSG_BG : undefined),
                        color: alignRight ? '#fff' : USER_MSG_TEXT,
                        p: 1.5,
                        borderRadius: alignRight ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        boxShadow: alignRight ? 3 : 0,
                      }}>
                        <Typography variant="body2">{msg.text}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5, opacity: 0.7, fontSize: '0.65rem' }}>
                          {msg.time} {alignRight && '✓✓'}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
                <div ref={messagesEndRef} />
              </Box>

              {/* Input */}
              <Box sx={{ p: 2, borderTop: `1px solid ${BORDER_COLOR}`, display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton sx={{ color: TEXT_MUTED }} disabled={isAiActive}><InsertEmoticon /></IconButton>
                <IconButton sx={{ color: TEXT_MUTED }} disabled={isAiActive}><AttachFile /></IconButton>
                
                <TextField 
                  fullWidth 
                  placeholder={isAiActive ? "🤖 n8n AI Bot bu çatı idarə edir..." : t('chat.input_placeholder')}
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isAiActive}
                  variant="standard"
                  InputProps={{ 
                    disableUnderline: true, 
                    sx: { 
                      color: TEXT_MAIN, 
                      bgcolor: isAiActive ? (isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.05)') : INPUT_BG, 
                      borderRadius: '20px', px: 2, py: 1,
                      fontStyle: isAiActive ? 'italic' : 'normal',
                      opacity: isAiActive ? 0.7 : 1
                    } 
                  }}
                />
                
                <IconButton 
                  onClick={handleSendMessage}
                  disabled={isAiActive || !inputMsg.trim()}
                  sx={{ 
                    bgcolor: (isAiActive || !inputMsg.trim()) ? INPUT_BG : BLUE, 
                    color: (isAiActive || !inputMsg.trim()) ? TEXT_MUTED : '#fff', 
                    '&:hover': { bgcolor: (isAiActive || !inputMsg.trim()) ? INPUT_BG : '#3367d6' } 
                  }}
                >
                  <Send />
                </IconButton>
              </Box>
            </>
          ) : (
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEXT_MUTED }}>
              <Typography>{t('chat.select_chat')}</Typography>
            </Box>
          )}
        </Card>

      </Box>
    </Box>
  );
};

export default ChatCRM;