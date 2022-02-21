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

//========================================================================================================================================================