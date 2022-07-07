import './index.scss';
import BannerSlider from './components/banners/banner';
import StickyHeader from './components/header/header';
import OpenSearchModal from './scripts/scenario/openSearchModal';
import ProductSlider from './components/product-slider/product-slider';

BannerSlider.init();
ProductSlider.init();
new StickyHeader();
new OpenSearchModal().init();
