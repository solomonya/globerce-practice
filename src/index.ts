import './index.scss';
import BannerSlider from './components/banners/banner';
import StickyHeader from './components/header/header';
import OpenSearchModal from './scripts/scenario/openSearchModal';
import ProductSlider from './components/product-slider/product-slider';
import ProductSellers from './scripts/scenario/productSellers';
import FavouriteProducts from './scripts/scenario/FavouritesProducts';
import OpenCitiesModal from './scripts/scenario/OpenCitiesModal';

BannerSlider.init();
ProductSlider.init();
new StickyHeader();
new OpenSearchModal().init();
new OpenCitiesModal().init();
new ProductSellers();
new FavouriteProducts();
