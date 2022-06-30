import { fromEvent } from 'rxjs';
var StickyHeader = /** @class */ (function () {
    function StickyHeader() {
        this.CLASS_HANDLER = 'js-base-layout__header';
        this.CLASS_SECTION_LOGO = 'js-stickyHeaderSectionLogo';
        this.CLASS_HEADER_ELEVATED = 'base-layout__header_elevated';
        this.CLASS_LOCATION_BUTTON_HIDE = 'd-none';
        this.ID_LOCATION_BTN_SEARCH = 'lc-btn-2';
        this.headerEl = document.querySelector(".".concat(this.CLASS_HANDLER));
        if (!this.headerEl) {
            return;
        }
        this.hiddenEl = document.querySelector(".".concat(this.CLASS_SECTION_LOGO));
        this.hiddenLocationBtn = document.getElementById("".concat(this.ID_LOCATION_BTN_SEARCH));
        this.attachEvents();
    }
    StickyHeader.prototype.attachEvents = function () {
        var _this = this;
        fromEvent(window, 'scroll').subscribe(function (e) {
            _this.updateHeaderPosition();
        });
    };
    StickyHeader.prototype.updateHeaderPosition = function () {
        var scrollTop = window.scrollY;
        if (this.hiddenEl) {
            var hiddenElHeight = this.hiddenEl.clientHeight;
            this.hideHiddenEl(scrollTop, hiddenElHeight);
            this.hideLocationButton(scrollTop, hiddenElHeight);
            this.addHeaderShadow(scrollTop, hiddenElHeight);
        }
        else {
            this.addHeaderShadow(scrollTop, 0);
        }
    };
    StickyHeader.prototype.hideHiddenEl = function (scrollTop, hiddenElHeight) {
        if (scrollTop > 0) {
            this.headerEl.style.top = "-".concat(hiddenElHeight, "px");
        }
        else {
            this.headerEl.style.top = '';
        }
    };
    StickyHeader.prototype.hideLocationButton = function (scrollTop, hiddenElHeight) {
        if (scrollTop > hiddenElHeight) {
            this.hiddenLocationBtn.classList.remove(this.CLASS_LOCATION_BUTTON_HIDE);
        }
        else {
            this.hiddenLocationBtn.classList.add(this.CLASS_LOCATION_BUTTON_HIDE);
        }
    };
    StickyHeader.prototype.addHeaderShadow = function (scrollTop, hiddenElHeight) {
        var isHiddenElHide = this.hiddenEl
            ? this.hiddenEl.classList.contains('d-none')
            : false;
        if (scrollTop > hiddenElHeight && !isHiddenElHide) {
            this.headerEl.classList.add(this.CLASS_HEADER_ELEVATED);
        }
        else {
            this.headerEl.classList.remove(this.CLASS_HEADER_ELEVATED);
        }
    };
    return StickyHeader;
}());
export default StickyHeader;
