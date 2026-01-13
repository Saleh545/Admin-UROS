// src/App.jsx
import React from 'react';
import MainLayout from './layout/MainLayout';
import AppRoutes from './routes/AppRoutes'; // Səndə qovluq adı kiçik hərflə 'routes' kimidir şəkildə
import { ColorModeProvider } from './context/ColorModeContext'; // Yeni yaratdığımız kontekst

const App = () => {
  return (
    <ColorModeProvider>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </ColorModeProvider>
  );
};

export default App;