function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}

// Получить цифры из строки
//parseInt(itemContactpagePhone.replace(/[^\d]/g, ''))

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
		}, 0);
	}
});

let unlock = true;
//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
let delay = 500;
let menuBody = document.querySelector(".menu__body");
function menu_open() {
	if (unlock) {
		body_lock(delay);
		iconMenu.classList.toggle("_active");
		menuBody.classList.toggle("_active");
	}
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================
//Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}
//=================
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/

// SPOLLERS
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	// Получение обычных слойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});
	// Инициализация обычных слойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// Получение слойлеров с медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	// Инициализация слойлеров с медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	// Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	// Работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}
//=================
//DigiFormat
function digi(str) {
	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
	return r;
}
//=================
//DiGiAnimate
function digi_animate(digi_animate) {
	if (digi_animate.length > 0) {
		for (let index = 0; index < digi_animate.length; index++) {
			const el = digi_animate[index];
			const el_to = parseInt(el.innerHTML.replace(' ', ''));
			if (!el.classList.contains('_done')) {
				digi_animate_value(el, 0, el_to, 1500);
			}
		}
	}
}
function digi_animate_value(el, start, end, duration) {
	var obj = el;
	var range = end - start;
	// no timer shorter than 50ms (not really visible any way)
	var minTimer = 50;
	// calc step time to show all interediate values
	var stepTime = Math.abs(Math.floor(duration / range));

	// never go below minTimer
	stepTime = Math.max(stepTime, minTimer);

	// get current time and calculate desired end time
	var startTime = new Date().getTime();
	var endTime = startTime + duration;
	var timer;

	function run() {
		var now = new Date().getTime();
		var remaining = Math.max((endTime - now) / duration, 0);
		var value = Math.round(end - (remaining * range));
		obj.innerHTML = digi(value);
		if (value == end) {
			clearInterval(timer);
		}
	}

	timer = setInterval(run, stepTime);
	run();

	el.classList.add('_done');
}
//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
//========================================
//Wrap
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
//========================================
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
//Полифилы
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
const body = document.body;
let callBack = document.querySelector('.mainscreen__callback');
let catalog = document.querySelector('._catalog');
let moreBtns = document.querySelectorAll('.tabs-catalog__more');
let callBackHeader = document.querySelector('.callback_header');
let mainScreen = document.querySelector('.page__mainscreen');
let header2 = document.querySelector('.header_2');
let header = document.querySelector('.header');
let payment = document.querySelector('.payment');
let callbackBoolean = false;
let callbackHeaderBoolean = false;
let heightHeader;
let heightMainscreen;
let scrollCurrent;
let lastScroll;
const cactus = document.querySelector('.tabs-catalog__row_catalog-cactus');

window.addEventListener('scroll', page_scroll);
function page_scroll() {
	scrollCurrent = window.scrollY;

	if (scrollCurrent > lastScroll && scrollCurrent >= 20) {
		body.classList.remove('_scroll-up');
		body.classList.add('_scroll-down');
	} else if (scrollCurrent < lastScroll) {
		body.classList.remove('_scroll-down');
		body.classList.add('_scroll-up');
	}
	lastScroll = scrollCurrent;
	function setClassListHeader() {
		if (lastScroll >= 20) {
			header.classList.add('_scroll');
		} else {
			header.classList.remove('_scroll');
		}
		if (lastScroll == 0 && body.classList.contains('_scroll-up')) {
			body.classList.remove('_scroll-up');
		}
	}
	setClassListHeader();

	if (callBack || callBackHeader) {
		if (mainScreen) {
			heightMainscreen = mainScreen.offsetHeight;
			if (scrollCurrent > heightMainscreen) {
				if (!callbackBoolean) {
					callBack.classList.add('_scroll');
					hiddenCallback();
					callbackBoolean = true;
				}
			} else {
				callBack.classList.remove('_scroll');
				showCallback();
				callbackBoolean = false;
			}
		}
		if (callBackHeader) {
			let headerHeight = heightHeader = header2.offsetHeight;
			let headerContainer = document.querySelector('.header_2__bottom-container');
			let headerSearch = document.querySelector('.header_2__form');
			if (scrollCurrent > headerHeight) {
				callBackHeader.classList.add('_scroll');
				if (!callbackHeaderBoolean) {
					headerContainer.classList.add('_hidden');
					headerSearch.classList.add('_hidden');
					hiddenCallback();
					callbackHeaderBoolean = true;
				}
			} else {
				callBackHeader.classList.remove('_scroll');
				headerContainer.classList.remove('_hidden');
				headerSearch.classList.remove('_hidden');
				showCallback();
				callbackHeaderBoolean = false;
			}
		}
	}
}
function setClassListHeader() {
	if (lastScroll >= 20) {
		header.classList.add(`_scroll`);
	} else {
		header.classList.remove(`_scroll`);
	}
	if (lastScroll == 0 && body.classList.contains(`_scroll-up`)) {
		body.classList.remove(`_scroll-up`);
	}
}
setClassListHeader();

function getWindowWidth() {
	return window.innerWidth || document.body.clientWidth;
}

window.onload = function () {
	document.addEventListener("click", documentActions);

	function documentActions(e) {
		const targetElement = e.target;

		if (scrollCurrent > heightMainscreen) {
			if (targetElement.classList.contains('_no-active')) {
				showCallback();
			} else if (!targetElement.closest('.mainscreen__callback')) {
				hiddenCallback();
			}
		}
		if (scrollCurrent > heightHeader) {
			if (targetElement.classList.contains('_no-active')) {
				showCallback();
			} else if (!targetElement.closest('.callback_header')) {
				hiddenCallback();
			}
		}
		if (iconMenu != null) {
			if (targetElement.classList.contains('menu__icon') || targetElement.classList.contains('menu__span')) {
				menu_open();
			} else if (!targetElement.closest('.menu__body') && document.querySelector('.menu__body._active')) {
				menu_close();
				body_lock(delay);
			}
		};
		if (payment) {
			const paymentPageOne = document.querySelector('.content-payment__block_one');
			const paymentPageTwo = document.querySelector('.content-payment__block_two');
			const paymentPageThree = document.querySelector('.content-payment__block_three');
			const paymentNavOne = document.querySelector('.nav-payment__item_one');
			const paymentNavTwo = document.querySelector('.nav-payment__item_two');
			const paymentNavThree = document.querySelector('.nav-payment__item_three');
			setTimeout(() => {
				if (targetElement.classList.contains('content-payment__next_page-one') && !paymentPageOne.classList.contains(`_error`)) {
					paymentPageOne.classList.remove('_active');
					paymentPageTwo.classList.add('_active');
					paymentNavOne.classList.remove('_active');
					paymentNavTwo.classList.add('_active');
				}
				if (targetElement.classList.contains('content-payment__next_page-two') && !paymentPageTwo.classList.contains(`_error`)) {
					paymentPageTwo.classList.remove('_active');
					paymentPageThree.classList.add('_active');
					paymentNavTwo.classList.remove('_active');
					paymentNavThree.classList.add('_active');
				}
			}, 0);
		}
		if (catalog) {
			for (let index = 0; index < moreBtns.length; index++) {
				const moreBtn = moreBtns[index];
				moreBtn.setAttribute('data-more', index);
				moreBtn_value = moreBtn.getAttribute('data-more');
				if (targetElement.classList.contains("tabs-catalog__more_succulent") && moreBtn_value == 0) {
					getProductsSucculent(targetElement);
				} else if (targetElement.classList.contains("tabs-catalog__more_cactus") && moreBtn_value == 1) {
					getProductsCactus(targetElement);
				} else if (targetElement.classList.contains("tabs-catalog__more_aloe") && moreBtn_value == 2) {
					getProductsAloe(targetElement);
				} else if (targetElement.classList.contains("tabs-catalog__more_kashpo") && moreBtn_value == 3) {
					getProductsKashpo(targetElement);
				}
			}
		}
	}
}
async function getProductsSucculent(button) {
	if (!button.classList.contains('_hold')) {
		button.classList.add('_hold');
		const file = "json/products_succulent.json";
		let response = await fetch(file, {
			method: "GET"
		});
		if (response.ok) {
			let result = await response.json();
			loadProductsSucculent(result);
			button.remove();
		} else {
			alert("Ошибка");
		}
	}
}
async function getProductsCactus(button) {
	if (!button.classList.contains('_hold')) {
		button.classList.add('_hold');
		const file = "json/products_cactus.json";
		let response = await fetch(file, {
			method: "GET"
		});
		if (response.ok) {
			let result = await response.json();
			loadProductsCactus(result);
			button.remove();
		} else {
			alert("Ошибка");
		}
	}
}
async function getProductsAloe(button) {
	if (!button.classList.contains('_hold')) {
		button.classList.add('_hold');
		const file = "json/products_aloe.json";
		let response = await fetch(file, {
			method: "GET"
		});
		if (response.ok) {
			let result = await response.json();
			loadProductsAloe(result);
			button.remove();
		} else {
			alert("Ошибка");
		}
	}
}
async function getProductsKashpo(button) {
	if (!button.classList.contains('_hold')) {
		button.classList.add('_hold');
		const file = "json/products_kashpo.json";
		let response = await fetch(file, {
			method: "GET"
		});
		if (response.ok) {
			let result = await response.json();
			loadProductsKashpo(result);
			button.remove();
		} else {
			alert("Ошибка");
		}
	}
}
function loadProductsSucculent(data) {
	const productsItems = document.querySelector('.tabs-catalog__row_catalog-succulent');
	data.products.forEach(item => {
		const productId = item.id;
		const productUrl = item.url;
		const productTitle = item.title;
		const productLabels = item.labels;
		const productImage = item.image;
		const productPrice = item.price;
		const productPriceOld = item.priceOld;
		const productLinkUrl = item.linkUrl;

		let productTemplateStart = `<div class="tabs-catalog__column tabs-catalog__column_catalog">`;
		let productTemplateEnd = `</div>`;

		let productTemplateCard = `<div class="tabs-catalog__card card-catalog">`;
		let productTemplateLabels = '';
		productTemplateStart += productTemplateCard;
		if (productLabels) {
			let productTemplateLabelsStart = `<div class="card-catalog__labels">`;
			let productTemplateLabelsEnd = `</div>`;
			let productTemplateLabelsContent = '';

			productLabels.forEach(labelItem => {
				productTemplateLabelsContent += `<span class="card-catalog__label card-catalog__label_${labelItem.type}"></span>`;
			});

			productTemplateLabels += productTemplateLabelsStart;
			productTemplateLabels += productTemplateLabelsContent;
			productTemplateLabels += productTemplateLabelsEnd;
		}

		let productTemplateImage = `
		<a href="${productUrl}" class="card-catalog__image">
			<img src="img/catalog/${productImage}" alt="${productTitle}">
		</a>
		`;

		let productTemplateBodyStart = `<div class="card-catalog__info">`;
		let productTemplateBodyEnd = `</div>`;

		let productTemplateBodyContent = `
		<a href="${productUrl}" class="card-catalog__name">${productTitle}</a>
		<a href="${productUrl}" class="card-catalog__favorites _icon-heart"></a>
		`;

		let productTemplatePrices = '';
		let productTemplatePricesStart = `<div class="card-catalog__bottom">`;
		let productTemplatePricesOld = `<div class="card-catalog__old-price">${productPriceOld}</div>`;
		let productTemplatePricesCurrent = `<div class="card-catalog__price card-catalog__price_catalog">${productPrice}</div>`;
		let productTemplatePricesCart = `<a href="${productLinkUrl}" class="card-catalog__btn">В корзину</a>`;
		let productTemplatePricesEnd = `</div>`;

		productTemplatePrices += productTemplatePricesStart;
		if (productPriceOld) {
			productTemplatePrices += productTemplatePricesOld;
		}
		productTemplatePrices += productTemplatePricesCurrent;
		productTemplatePrices += productTemplatePricesCart;
		productTemplatePrices += productTemplatePricesEnd;

		let productTemplateBody = '';
		productTemplateBody += productTemplateBodyStart;
		productTemplateBody += productTemplateBodyContent;
		productTemplateBody += productTemplateBodyEnd;

		let productTemplate = '';
		productTemplate += productTemplateStart;
		productTemplate += productTemplateLabels;
		productTemplate += productTemplateImage;
		productTemplate += productTemplateBody;
		productTemplate += productTemplatePrices;
		productTemplate += productTemplateEnd;

		productsItems.insertAdjacentHTML('beforeend', productTemplate);
		addAttributeDataPid();
		addAttributeDataPrice();
		addAttributeDataNews();

	});
}
function loadProductsCactus(data) {
	const productsItems = document.querySelector('.tabs-catalog__row_catalog-cactus');
	data.products.forEach(item => {
		const productId = item.id;
		const productUrl = item.url;
		const productTitle = item.title;
		const productLabels = item.labels;
		const productImage = item.image;
		const productPrice = item.price;
		const productPriceOld = item.priceOld;
		const productLinkUrl = item.linkUrl;

		let productTemplateStart = `<div class="tabs-catalog__column tabs-catalog__column_catalog">`;
		let productTemplateEnd = `</div>`;

		let productTemplateCard = `<div class="tabs-catalog__card card-catalog">`;
		let productTemplateLabels = '';
		productTemplateStart += productTemplateCard;
		if (productLabels) {
			let productTemplateLabelsStart = `<div class="card-catalog__labels">`;
			let productTemplateLabelsEnd = `</div>`;
			let productTemplateLabelsContent = '';

			productLabels.forEach(labelItem => {
				productTemplateLabelsContent += `<span class="card-catalog__label card-catalog__label_${labelItem.type}"></span>`;
			});

			productTemplateLabels += productTemplateLabelsStart;
			productTemplateLabels += productTemplateLabelsContent;
			productTemplateLabels += productTemplateLabelsEnd;
		}

		let productTemplateImage = `
		<a href="${productUrl}" class="card-catalog__image">
			<img src="img/catalog/${productImage}" alt="${productTitle}">
		</a>
		`;

		let productTemplateBodyStart = `<div class="card-catalog__info">`;
		let productTemplateBodyEnd = `</div>`;

		let productTemplateBodyContent = `
		<a href="${productUrl}" class="card-catalog__name">${productTitle}</a>
		<a href="${productUrl}" class="card-catalog__favorites _icon-heart"></a>
		`;

		let productTemplatePrices = '';
		let productTemplatePricesStart = `<div class="card-catalog__bottom">`;
		let productTemplatePricesOld = `<div class="card-catalog__old-price">${productPriceOld}</div>`;
		let productTemplatePricesCurrent = `<div class="card-catalog__price card-catalog__price_catalog">${productPrice}</div>`;
		let productTemplatePricesCart = `<a href="${productLinkUrl}" class="card-catalog__btn">В корзину</a>`;
		let productTemplatePricesEnd = `</div>`;

		productTemplatePrices += productTemplatePricesStart;
		if (productPriceOld) {
			productTemplatePrices += productTemplatePricesOld;
		}
		productTemplatePrices += productTemplatePricesCurrent;
		productTemplatePrices += productTemplatePricesCart;
		productTemplatePrices += productTemplatePricesEnd;

		let productTemplateBody = '';
		productTemplateBody += productTemplateBodyStart;
		productTemplateBody += productTemplateBodyContent;
		productTemplateBody += productTemplateBodyEnd;

		let productTemplate = '';
		productTemplate += productTemplateStart;
		productTemplate += productTemplateLabels;
		productTemplate += productTemplateImage;
		productTemplate += productTemplateBody;
		productTemplate += productTemplatePrices;
		productTemplate += productTemplateEnd;

		productsItems.insertAdjacentHTML('beforeend', productTemplate);
		addAttributeDataPid();
		addAttributeDataPrice();
		addAttributeDataNews();

	});
}
function loadProductsAloe(data) {
	const productsItems = document.querySelector('.tabs-catalog__row_catalog-aloe');
	data.products.forEach(item => {
		const productId = item.id;
		const productUrl = item.url;
		const productTitle = item.title;
		const productLabels = item.labels;
		const productImage = item.image;
		const productPrice = item.price;
		const productPriceOld = item.priceOld;
		const productLinkUrl = item.linkUrl;

		let productTemplateStart = `<div class="tabs-catalog__column tabs-catalog__column_catalog">`;
		let productTemplateEnd = `</div>`;

		let productTemplateCard = `<div class="tabs-catalog__card card-catalog">`;
		let productTemplateLabels = '';
		productTemplateStart += productTemplateCard;
		if (productLabels) {
			let productTemplateLabelsStart = `<div class="card-catalog__labels">`;
			let productTemplateLabelsEnd = `</div>`;
			let productTemplateLabelsContent = '';

			productLabels.forEach(labelItem => {
				productTemplateLabelsContent += `<span class="card-catalog__label card-catalog__label_${labelItem.type}"></span>`;
			});

			productTemplateLabels += productTemplateLabelsStart;
			productTemplateLabels += productTemplateLabelsContent;
			productTemplateLabels += productTemplateLabelsEnd;
		}

		let productTemplateImage = `
		<a href="${productUrl}" class="card-catalog__image">
			<img src="img/catalog/${productImage}" alt="${productTitle}">
		</a>
		`;

		let productTemplateBodyStart = `<div class="card-catalog__info">`;
		let productTemplateBodyEnd = `</div>`;

		let productTemplateBodyContent = `
		<a href="${productUrl}" class="card-catalog__name">${productTitle}</a>
		<a href="${productUrl}" class="card-catalog__favorites _icon-heart"></a>
		`;

		let productTemplatePrices = '';
		let productTemplatePricesStart = `<div class="card-catalog__bottom">`;
		let productTemplatePricesOld = `<div class="card-catalog__old-price">${productPriceOld}</div>`;
		let productTemplatePricesCurrent = `<div class="card-catalog__price card-catalog__price_catalog">${productPrice}</div>`;
		let productTemplatePricesCart = `<a href="${productLinkUrl}" class="card-catalog__btn">В корзину</a>`;
		let productTemplatePricesEnd = `</div>`;

		productTemplatePrices += productTemplatePricesStart;
		if (productPriceOld) {
			productTemplatePrices += productTemplatePricesOld;
		}
		productTemplatePrices += productTemplatePricesCurrent;
		productTemplatePrices += productTemplatePricesCart;
		productTemplatePrices += productTemplatePricesEnd;

		let productTemplateBody = '';
		productTemplateBody += productTemplateBodyStart;
		productTemplateBody += productTemplateBodyContent;
		productTemplateBody += productTemplateBodyEnd;

		let productTemplate = '';
		productTemplate += productTemplateStart;
		productTemplate += productTemplateLabels;
		productTemplate += productTemplateImage;
		productTemplate += productTemplateBody;
		productTemplate += productTemplatePrices;
		productTemplate += productTemplateEnd;

		productsItems.insertAdjacentHTML('beforeend', productTemplate);
		addAttributeDataPid();
		addAttributeDataPrice();
		addAttributeDataNews();

	});
}
function loadProductsKashpo(data) {
	const productsItems = document.querySelector('.tabs-catalog__row_catalog-kashpo');
	data.products.forEach(item => {
		const productId = item.id;
		const productUrl = item.url;
		const productTitle = item.title;
		const productLabels = item.labels;
		const productImage = item.image;
		const productPrice = item.price;
		const productPriceOld = item.priceOld;
		const productLinkUrl = item.linkUrl;

		let productTemplateStart = `<div class="tabs-catalog__column tabs-catalog__column_catalog">`;
		let productTemplateEnd = `</div>`;

		let productTemplateCard = `<div class="tabs-catalog__card card-catalog">`;
		let productTemplateLabels = '';
		productTemplateStart += productTemplateCard;
		if (productLabels) {
			let productTemplateLabelsStart = `<div class="card-catalog__labels">`;
			let productTemplateLabelsEnd = `</div>`;
			let productTemplateLabelsContent = '';

			productLabels.forEach(labelItem => {
				productTemplateLabelsContent += `<span class="card-catalog__label card-catalog__label_${labelItem.type}"></span>`;
			});

			productTemplateLabels += productTemplateLabelsStart;
			productTemplateLabels += productTemplateLabelsContent;
			productTemplateLabels += productTemplateLabelsEnd;
		}

		let productTemplateImage = `
		<a href="${productUrl}" class="card-catalog__image">
			<img src="img/catalog/${productImage}" alt="${productTitle}">
		</a>
		`;

		let productTemplateBodyStart = `<div class="card-catalog__info">`;
		let productTemplateBodyEnd = `</div>`;

		let productTemplateBodyContent = `
		<a href="${productUrl}" class="card-catalog__name">${productTitle}</a>
		<a href="${productUrl}" class="card-catalog__favorites _icon-heart"></a>
		`;

		let productTemplatePrices = '';
		let productTemplatePricesStart = `<div class="card-catalog__bottom">`;
		let productTemplatePricesOld = `<div class="card-catalog__old-price">${productPriceOld}</div>`;
		let productTemplatePricesCurrent = `<div class="card-catalog__price card-catalog__price_catalog">${productPrice}</div>`;
		let productTemplatePricesCart = `<a href="${productLinkUrl}" class="card-catalog__btn">В корзину</a>`;
		let productTemplatePricesEnd = `</div>`;

		productTemplatePrices += productTemplatePricesStart;
		if (productPriceOld) {
			productTemplatePrices += productTemplatePricesOld;
		}
		productTemplatePrices += productTemplatePricesCurrent;
		productTemplatePrices += productTemplatePricesCart;
		productTemplatePrices += productTemplatePricesEnd;

		let productTemplateBody = '';
		productTemplateBody += productTemplateBodyStart;
		productTemplateBody += productTemplateBodyContent;
		productTemplateBody += productTemplateBodyEnd;

		let productTemplate = '';
		productTemplate += productTemplateStart;
		productTemplate += productTemplateLabels;
		productTemplate += productTemplateImage;
		productTemplate += productTemplateBody;
		productTemplate += productTemplatePrices;
		productTemplate += productTemplateEnd;

		productsItems.insertAdjacentHTML('beforeend', productTemplate);
		addAttributeDataPid();
		addAttributeDataPrice();
		addAttributeDataNews();

	});
}

function showCallback() {
	document.querySelector('.callback').classList.add('_active');
	document.querySelector('.callback__button').classList.add('_active');
	document.querySelector('.callback__button').classList.remove('_no-active');
	document.querySelector('.callback__button').outerHTML = `<button type=submit class="callback__button _icon-phone _active"></button>`;
}

function hiddenCallback() {
	document.querySelector('.callback').classList.remove('_active');
	document.querySelector('.callback').classList.remove('_error');
	document.querySelector('.callback__input').classList.remove('_error');
	document.querySelector('.callback__button').classList.remove('_active');
	document.querySelector('.callback__button').classList.add('_no-active');
	document.querySelector('.callback__button').outerHTML = `<span class="callback__button _icon-phone _no-active"></span>`;
}
//========================================================================================================================================================

let menuLinks = document.querySelectorAll('._goto-my[data-goto]');

if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				menu_close()
				body_lock_remove(500);
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

//========================================================================================================================================================

// Добавление атрибута data-price с ценой
if (catalog) {
	function addAttributeDataPrice() {
		const allPrice = document.querySelectorAll('.card-catalog__price_catalog');
		for (let index = 0; index < allPrice.length; index++) {
			const allPrices = allPrice[index];
			let allPricesNumber = parseFloat(allPrices.textContent);
			allPrices.closest('.tabs-catalog__column_catalog').setAttribute('data-price', allPricesNumber);
		}
	}

	function addAttributeDataNews() {
		const catalogs = document.querySelectorAll('.tabs-catalog__column_catalog');
		for (let index = 0; index < catalogs.length; index++) {
			const catalog = catalogs[index];
			const catalogNew = catalog.querySelector('.card-catalog__label_new');
			if (catalogNew != null) {
				catalog.setAttribute('data-news', '1')
			} else {
				catalog.setAttribute('data-news', '0')
			}
		}
	}

	function addAttributeDataPid() {
		const succulent = document.querySelector('.tabs-catalog__row_catalog-succulent');
		const cactus = document.querySelector('.tabs-catalog__row_catalog-cactus');
		const aloe = document.querySelector('.tabs-catalog__row_catalog-aloe');
		const pots = document.querySelector('.tabs-catalog__row_catalog-kashpo');
		let succulentChildrens = succulent.children;
		let cactustChildrens = cactus.children;
		let aloeChildrens = aloe.children;
		let potsChildrens = pots.children;
		for (let index = 0; index < succulentChildrens.length; index++) {
			const succulentChildren = succulentChildrens[index];
			succulentChildren.setAttribute('data-pid', index);
		}
		for (let index = 0; index < cactustChildrens.length; index++) {
			const cactustChildren = cactustChildrens[index];
			cactustChildren.setAttribute('data-pid', index);
		}
		for (let index = 0; index < aloeChildrens.length; index++) {
			const aloeChildren = aloeChildrens[index];
			aloeChildren.setAttribute('data-pid', index);
		}
		for (let index = 0; index < potsChildrens.length; index++) {
			const potsChildren = potsChildrens[index];
			potsChildren.setAttribute('data-pid', index);
		}

	}
	addAttributeDataPid();
	addAttributeDataPrice();
	addAttributeDataNews();

	// Сортировка
	let navCatalog = document.querySelectorAll('.tabs-catalog__row_catalog');
	for (let index = 0; index < navCatalog.length; index++) {
		const el = navCatalog[index];
		el.setAttribute('data-rows', index);
	}

	function mySortMin(sortType) {
		for (let index = 0; index < navCatalog.length; index++) {
			const nav = navCatalog[index];
			for (let i = 0; i < nav.children.length; i++) {
				for (let z = i; z < nav.children.length; z++) {
					if (+nav.children[i].getAttribute(sortType) > +nav.children[z].getAttribute(sortType)) {
						replacedNode = nav.replaceChild(nav.children[z], nav.children[i]);
						insertAfter(replacedNode, nav.children[i]);
					}
				}
			}
		}
	}

	function mySortMax(sortType) {
		for (let index = 0; index < navCatalog.length; index++) {
			const nav = navCatalog[index];
			for (let i = 0; i < nav.children.length; i++) {
				for (let z = i; z < nav.children.length; z++) {
					if (+nav.children[i].getAttribute(sortType) < +nav.children[z].getAttribute(sortType)) {
						replacedNode = nav.replaceChild(nav.children[z], nav.children[i]);
						insertAfter(replacedNode, nav.children[i]);
					}
				}
			}
		}
	}

	function insertAfter(elem, refElem) {
		return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
	}
}
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', form_submit);
	}
}
async function form_submit(e) {
	let btn = e.target;
	let form = btn.closest('form');
	let error = form_validate(form);
	if (error == 0) {
		let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
		let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
		const message = form.getAttribute('data-message');
		const ajax = form.getAttribute('data-ajax');

		//SendForm
		if (ajax) {
			e.preventDefault();
			let formData = new FormData(form);
			form.classList.add('_sending');
			let response = await fetch(formAction, {
				method: formMethod,
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				form.classList.remove('_sending');
				if (message) {
					popup_open(message + '-message');
				}
				form_clean(form);
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		}
		// If test
		if (form.hasAttribute('data-test')) {
			e.preventDefault();
			if (message) {
				popup_open(message + '-message');
			}
			form_clean(form);
		}
	} else {
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 1000, 50);
		}
		e.preventDefault();
	}
}
function form_validate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += form_validate_input(el);
			}
		}
	}
	return error;
}
function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (email_test(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}
	return error;
}
function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');
	input.closest(`form`).classList.add('_error');
	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.classList.remove('_error');
	input.classList.add('_no-error');
	input.closest(`form`).classList.remove('_error');
	input.parentElement.classList.remove('_error');
	input.parentElement.classList.add('_no-error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.code === 'Escape') {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select') && !e.target.classList.contains('_option')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div hidden class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const selectTitle = select.querySelector('.select__title');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');
	selectTitle.addEventListener('click', function (e) {
		selectItemActions();
	});

	function selectMultiItems() {
		let selectedOptions = select.querySelectorAll('.select__option');
		let originalOptions = original.querySelectorAll('option');
		let selectedOptionsText = [];
		for (let index = 0; index < selectedOptions.length; index++) {
			const selectedOption = selectedOptions[index];
			originalOptions[index].removeAttribute('selected');
			if (selectedOption.classList.contains('_selected')) {
				const selectOptionText = selectedOption.innerHTML;
				selectedOptionsText.push(selectOptionText);
				originalOptions[index].setAttribute('selected', 'selected');
			}
		}
		select.querySelector('.select__value').innerHTML = '<span>' + selectedOptionsText + '</span>';
	}
	function selectItemActions(type) {
		if (!type) {
			let selects = document.querySelectorAll('.select');
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				const select_body_options = select.querySelector('.select__options');
				if (select != select_item.closest('.select')) {
					select.classList.remove('_active');
					_slideUp(select_body_options, 100);
				}
			}
			_slideToggle(select_body_options, 100);
			select.classList.toggle('_active');
		}
	}
	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value && !original.hasAttribute('multiple')) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				if (original.hasAttribute('multiple')) {
					select_option.classList.toggle('_selected');
					selectMultiItems();
				} else {
					select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
					original.value = select_option_value;
					select_option.style.display = 'none';
				}
			}
			let type;
			if (original.hasAttribute('multiple')) {
				type = 'multiple';
			}
			selectItemActions(type);
			if (select_option_value == 1) {
				mySortMax('data-news');
			} else if (select_option_value == 2) {
				mySortMin('data-price');
			} else if (select_option_value == 3) {
				mySortMax('data-price');
			}
		});

	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.innerHTML;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.value == input_g_value) {
					input_focus_add(input);
					input.value = '';
				}
				if (input.getAttribute('data-type') === "pass") {
					if (input.parentElement.querySelector('._viewpass')) {
						if (!input.parentElement.querySelector('._viewpass').classList.contains('_active')) {
							input.setAttribute('type', 'password');
						}
					} else {
						input.setAttribute('type', 'password');
					}
				}
				if (input.classList.contains('_date')) {
					/*
					input.classList.add('_mask');
					Inputmask("99.99.9999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
					*/
				}
				if (input.classList.contains('_phone')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask('+38(999) 999 9999', {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_cart')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask('9999 9999 9999 9999', {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_cart-date')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask('99/99', {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_cart-cvv')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask('999', {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("9{1,}", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.value = input_g_value;
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
			if (input.classList.contains('_date')) {
				const calendarItem = datepicker(input, {
					customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					overlayButton: 'Применить',
					overlayPlaceholder: 'Год (4 цифры)',
					startDay: 1,
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
				const dataFrom = input.getAttribute('data-from');
				const dataTo = input.getAttribute('data-to');
				if (dataFrom) {
					calendarItem.setMin(new Date(dataFrom));
				}
				if (dataTo) {
					calendarItem.setMax(new Date(dataTo));
				}
			}
		}
	}
}
function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.value = input_g_value;
	}
}
function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
}

//QUANTITY
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}
//BildSlider
function buildSliders() {
	let sliders = document.querySelectorAll('._swiper');
	if (sliders) {
		for (let index = 0; index < sliders.length; index++) {
			let slider = sliders[index];
			if (!slider.classList.contains('swiper-bild')) {
				let slider_items = slider.children;
				if (slider_items) {
					for (let index = 0; index < slider_items.length; index++) {
						let el = slider_items[index];
						el.classList.add('swiper-slide');
					}
				}
				let slider_content = slider.innerHTML;
				let slider_wrapper = document.createElement('div');
				slider_wrapper.classList.add('swiper-wrapper');
				slider_wrapper.innerHTML = slider_content;
				slider.innerHTML = '';
				slider.appendChild(slider_wrapper);
				slider.classList.add('swiper-bild');

				if (slider.classList.contains('_swiper_scroll')) {
					let sliderScroll = document.createElement('div');
					sliderScroll.classList.add('swiper-scrollbar');
					slider.appendChild(sliderScroll);
				}
			}
			if (slider.classList.contains('_gallery')) {
				//slider.data('lightGallery').destroy(true);
			}
		}
		sliders_bild_callback();
	}
	function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}


function sliders_bild_callback(params) { }
}
buildSliders();

if (document.querySelector('.tabs-catalog__row_1')) {
	let slider_catalog_1 = new Swiper('.tabs-catalog__row_1', {
		/*
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		slidesPerView: 4,
		spaceBetween: 0,
		autoHeight: false,
		speed: 800,
		watchOverflow: true,
		//touchRatio: 0,
		//simulateTouch: false,
		loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		pagination: {
			el: '.tabs-catalog__pagination-1',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.tabs-catalog__arrow-swiper_next-1',
			prevEl: '.tabs-catalog__arrow-swiper_prev-1',
		},

		breakpoints: {
			320: {
				slidesPerView: 1.1,
				spaceBetween: 20,
			},
			480: {
				slidesPerView: 1.4,
				spaceBetween: 20,
			},
			650: {
				slidesPerView: 2.15,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1290: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
		},

		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
		// And if we need scrollbar
		//scrollbar: {
		//	el: '.swiper-scrollbar',
		//},
	});
}
if (document.querySelector('.tabs-catalog__row_2')) {
	let slider_catalog_2 = new Swiper('.tabs-catalog__row_2', {
		/*
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		slidesPerView: 4,

		spaceBetween: 0,
		autoHeight: false,
		speed: 800,
		watchOverflow: true,
		//touchRatio: 0,
		//simulateTouch: false,
		loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		pagination: {
			el: '.tabs-catalog__pagination-2',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.tabs-catalog__arrow-swiper_next-2',
			prevEl: '.tabs-catalog__arrow-swiper_prev-2',
		},

		breakpoints: {
			320: {
				slidesPerView: 1.1,
				spaceBetween: 20,
			},
			480: {
				slidesPerView: 1.4,
				spaceBetween: 20,
			},
			650: {
				slidesPerView: 2.15,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1290: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
		},

		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
		// And if we need scrollbar
		//scrollbar: {
		//	el: '.swiper-scrollbar',
		//},
	});
}
if (document.querySelector('.tabs-catalog__row_3')) {
	let slider_catalog_3 = new Swiper('.tabs-catalog__row_3', {
		/*
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		slidesPerView: 4,

		spaceBetween: 0,
		autoHeight: false,
		speed: 800,
		watchOverflow: true,
		//touchRatio: 0,
		//simulateTouch: false,
		loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		pagination: {
			el: '.tabs-catalog__pagination-3',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.tabs-catalog__arrow-swiper_next-3',
			prevEl: '.tabs-catalog__arrow-swiper_prev-3',
		},

		breakpoints: {
			320: {
				slidesPerView: 1.1,
				spaceBetween: 20,
			},
			480: {
				slidesPerView: 1.4,
				spaceBetween: 20,
			},
			650: {
				slidesPerView: 2.15,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1290: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
		},

		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
		// And if we need scrollbar
		//scrollbar: {
		//	el: '.swiper-scrollbar',
		//},
	});
}
if (document.querySelector('.tabs-catalog__row_4')) {
	let slider_catalog_4 = new Swiper('.tabs-catalog__row_4', {
		/*
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		slidesPerView: 4,

		spaceBetween: 0,
		autoHeight: false,
		speed: 800,
		watchOverflow: true,
		//touchRatio: 0,
		//simulateTouch: false,
		loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		pagination: {
			el: '.tabs-catalog__pagination-4',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.tabs-catalog__arrow-swiper_next-4',
			prevEl: '.tabs-catalog__arrow-swiper_prev-4',
		},

		breakpoints: {
			320: {
				slidesPerView: 1.1,
				spaceBetween: 20,
			},
			480: {
				slidesPerView: 1.4,
				spaceBetween: 20,
			},
			650: {
				slidesPerView: 2.15,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1290: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
		},

		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
		// And if we need scrollbar
		//scrollbar: {
		//	el: '.swiper-scrollbar',
		//},
	});
}
if (document.querySelector('.reviews__slider')) {
	let slider_reviews = new Swiper('.reviews__slider', {

		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},

		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		slidesPerView: 3,
		centeredSlides: true,
		spaceBetween: 0,
		autoHeight: false,
		speed: 800,
		// watchOverflow: true,
		//touchRatio: 0,
		//simulateTouch: false,
		loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		pagination: {
			el: '.reviews__pagination',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.slider-reviews__nav_next',
			prevEl: '.slider-reviews__nav_prev',
		},

		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: true,
			},
			480: {
				slidesPerView: 1.6,
				spaceBetween: 0,
			},
			650: {
				slidesPerView: 2.2,
				spaceBetween: 0,
			},
			768: {
				slidesPerView: 2.3,
				spaceBetween: 0,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 0,
			},
		},

		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
		// And if we need scrollbar
		//scrollbar: {
		//	el: '.swiper-scrollbar',
		//},
	});
}
if (document.querySelector('.card-product__main-image')) {
	let slider_product_small = new Swiper('.card-product__small-image', {

		// autoplay: {
		// 	delay: 5000,
		// 	disableOnInteraction: false,
		// },

		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		slidesPerView: 3,
		spaceBetween: 15,
		autoHeight: false,
		speed: 800,
		// loop: true,
		// watchOverflow: true,
		//touchRatio: 0,
		//simulateTouch: false,
		// loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		// pagination: {
		// 	el: '.reviews__pagination',
		// 	clickable: true,
		// },
		// Arrows
		// navigation: {
		// 	nextEl: '.slider-reviews__nav_next',
		// 	prevEl: '.slider-reviews__nav_prev',
		// },

		breakpoints: {
			320: {
				spaceBetween: 10,
				direction: "horizontal",
				slidesPerView: 2.2,
			},
			479.98: {
				slidesPerView: 3,
				direction: "horizontal",
			},
			680.01: {
				direction: "vertical",
			},

		},

		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
		// And if we need scrollbar
		//scrollbar: {
		//	el: '.swiper-scrollbar',
		//},
	});
	let slider_product_main = new Swiper('.card-product__main-image', {

		// autoplay: {
		// 	delay: 5000,
		// 	disableOnInteraction: false,
		// },

		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: false,
		speed: 800,
		// loop: true,
		thumbs: {
			swiper: slider_product_small,
		},
		// watchOverflow: true,
		//touchRatio: 0,
		//simulateTouch: false,
		// loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		// pagination: {
		// 	el: '.reviews__pagination',
		// 	clickable: true,
		// },
		// Arrows
		// navigation: {
		// 	nextEl: '.slider-reviews__nav_next',
		// 	prevEl: '.slider-reviews__nav_prev',
		// },

		// breakpoints: {
		// 	320: {
		// 		slidesPerView: 1,
		// 		spaceBetween: 0,
		// 		autoHeight: true,
		// 	},
		// 	480: {
		// 		slidesPerView: 1.6,
		// 		spaceBetween: 0,
		// 	},
		// 	650: {
		// 		slidesPerView: 2.2,
		// 		spaceBetween: 0,
		// 	},
		// 	768: {
		// 		slidesPerView: 2.3,
		// 		spaceBetween: 0,
		// 	},
		// 	992: {
		// 		slidesPerView: 3,
		// 		spaceBetween: 0,
		// 	},
		// },

		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
		// And if we need scrollbar
		//scrollbar: {
		//	el: '.swiper-scrollbar',
		//},
	});
}
if (document.querySelector('.product-interesting__body')) {
	let interesting = new Swiper('.product-interesting__body', {

		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},

		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		slidesPerView: 4,
		// centeredSlides: true,
		spaceBetween: 20,
		autoHeight: false,
		watchOverflow: true,
		speed: 800,
		//touchRatio: 0,
		//simulateTouch: false,
		// loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		// pagination: {
		// 	el: '.reviews__pagination',
		// 	clickable: true,
		// },
		// Arrows
		// navigation: {
		// 	nextEl: '.slider-reviews__nav_next',
		// 	prevEl: '.slider-reviews__nav_prev',
		// },

		breakpoints: {
			320: {
				slidesPerView: 1.1,
				spaceBetween: 20,
				// autoHeight: true,
			},
			480: {
				slidesPerView: 1.6,
				spaceBetween: 20,
			},
			650: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			800: {
				slidesPerView: 2.6,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1170: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
		},

		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
		// And if we need scrollbar
		//scrollbar: {
		//	el: '.swiper-scrollbar',
		//},
	});
}