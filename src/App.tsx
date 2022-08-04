import React from 'react';
import './App.css';
import Banners from './components/Banners/Banners';
import CategorySection from './components/CategorySection/CategorySection';
import Header from './components/Header/Header';
import RecentlyWatchSection from './components/RecentlyWatchSection/RecentlyWatchSection';
import { BANNERS_URL } from './controllers/api-routes';

function App() {
  return (
    <div>
      <Header />
      <Banners URL={BANNERS_URL} />
      <CategorySection />
      <RecentlyWatchSection />
    </div>
  );
}

export default App;
