import React from 'react';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import BrandSection from './components/BrandSection/BrandSection';
import CategorySection from './components/CategorySection/CategorySection';
import Header from './components/Header/Header';
import MarketBanners from './components/MarketBanners/MarketBanners';
import ProductsSection from './components/ProductsSection/ProductsSection';
import PromoSection from './components/PromoSection/PromoSection';
import RecentlyWatchSection from './components/RecentlyWatchSection/RecentlyWatchSection';
import { getBannersUrl } from './controllers/api-routes';
import FavoriteProvider from './utils/FavoriteContext';

function App() {
  return (
    <>
      <Header />
      <MarketBanners url={getBannersUrl('market')} width={375} height={175} />
      <CategorySection />
      <FavoriteProvider>
        <RecentlyWatchSection />
      </FavoriteProvider>
      <PromoSection
        promoBannersURL={getBannersUrl('promo')}
        width={335}
        height={152}
      />
      <BrandSection />
      <FavoriteProvider>
        <ProductsSection productsAmount={8} bannerType='design' />
        <div style={{ marginBottom: '15px' }}>
          <ProductsSection productsAmount={4} bannerType='promo-back' />
        </div>
      </FavoriteProvider>
      <Navigation />
    </>
  );
}

export default App;
