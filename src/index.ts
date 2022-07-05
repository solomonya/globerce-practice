import './index.scss';
import BannerSlider from './components/banners/banner';
import StickyHeader from './components/header/header';
import OpenSearchModal from './scripts/scenario/openSearchModal';

BannerSlider.init();
new StickyHeader();
new OpenSearchModal().init();
