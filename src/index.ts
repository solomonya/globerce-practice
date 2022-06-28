import './index.scss';
import BannerSlider from './components/banners/banner';
import StickyHeader from './components/header/header';
import SearchInput from './components/search-bar/search-input';

new StickyHeader();
BannerSlider.init();
new SearchInput();
