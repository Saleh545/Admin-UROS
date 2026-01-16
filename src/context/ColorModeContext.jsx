import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens } from '../theme/theme';

// 1. Context yaradılması
const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'dark',
});

// Hook: MainLayout-da istifadə etmək üçün
export const useColorMode = () => {
  return useContext(ColorModeContext);
};

// Provider: App.jsx-də istifadə olunacaq
export const ColorModeProvider = ({ children }) => {
  
  // 2. State-i LocalStorage-dan oxuyaraq başladırıq
  const [mode, setMode] = useState(() => {
    try {
      // Yaddaşdan oxu
      const savedMode = localStorage.getItem('themeMode');
      // Əgər varsa onu qaytar, yoxdursa 'dark' olsun
      return savedMode ? savedMode : 'dark';
    } catch (error) {
      return 'dark';
    }
  });

  // 3. Modu dəyişən funksiya (Toggle)
  const colorMode = useMemo(
    () => ({
      // Bu funksiyanı MainLayout-da çağırırsınız
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode); // Yeni modu yaddaşa yazırıq
          return newMode;
        });
      },
      mode, // Modu (dark/light) da göndəririk ki, MainLayout ikonları dəyişə bilsin
    }),
    [mode],
  );

  // 4. Seçilmiş moda uyğun Theme yaradılması
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};