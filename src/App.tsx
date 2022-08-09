import React from 'react';
import './App.css';
import Banners from './components/Banners/Banners';
import BrandSection from './components/BrandSection/BrandSection';
import CategorySection from './components/CategorySection/CategorySection';
import Header from './components/Header/Header';
import MarketBanners from './components/MarketBanners/MarketBanners';
import ProductsSection from './components/ProductsSection/ProductsSection';
import PromoSection from './components/PromoSection/PromoSection';
import RecentlyWatchSection from './components/RecentlyWatchSection/RecentlyWatchSection';
import { getBannersUrl } from './controllers/api-routes';

function App() {
  return (
    <div>
      <Header />
      <MarketBanners url={getBannersUrl('market')} width={375} height={175} />
      <CategorySection />
      <RecentlyWatchSection />
      <PromoSection
        promoBannersURL={getBannersUrl('promo')}
        width={335}
        height={152}
      />
      <BrandSection />
      <ProductsSection productsAmount={8} bannerType='design' />
      <ProductsSection productsAmount={4} bannerType='promo-back' />
    </div>
  );
}

export default App;
