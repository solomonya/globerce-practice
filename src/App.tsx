import React from 'react';
import './App.css';
import Banners from './components/Banners/Banners';
import CategoryGrid from './components/CategoryGrid/CategoryGrid';
import Header from './components/Header/Header';
import MarketSection from './components/MarketSection/MarketSection';
import { BANNERS_URL } from './controllers/api-routes';

function App() {
  return (
    <div>
      <Header />
      <Banners URL={BANNERS_URL} />
      <MarketSection title='Категории' append={true}>
        <CategoryGrid></CategoryGrid>
      </MarketSection>
    </div>
  );
}

export default App;
