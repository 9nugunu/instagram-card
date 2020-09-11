window.addEventListener('load', function() {
	var carousel = document.getElementsByClassName('carousel');

	// Enroll carousel event logic
	for(let i = 0; i < carousel.length; i++) {
		addEventToCarousel(carousel[i]);
	}
});

function addEventToCarousel(carouselElem) {
	var ulElem = carouselElem.querySelector('ul');
	var liElems = ulElem.querySelectorAll('li');

	// resize width
	var liWidth = liElems[0].clientWidth;
	var adjustedWidth = liElems.length * liWidth;
	ulElem.style.width = adjustedWidth + 'px';

	// Enroll slide botton event
	var slideButtons = carouselElem.querySelectorAll('.slide');
	for (let i = 0; i < slideButtons.length; i++) {
		slideButtons[i].addEventListener('click', createListenerSlide(carouselElem));
	}
}

function createListenerSlide(carouselElem) {
	return function(event) {
		var clickedButton = event.currentTarget;

		// Import values
		var liElems = carouselElem.querySelectorAll('li');
		var liCount = liElems.length;
		var currentIndex = carouselElem.attributes.data.value;

		// Check slide botton
		if(clickedButton.className.includes('right') && currentIndex < liCount - 1) {
			currentIndex++;
			scrollDiv(carouselElem, currentIndex);
		} else if (clickedButton.className.includes('left') && currentIndex > 0) {
			currentIndex--;
			scrollDiv(carouselElem, currentIndex);
		}

		// 인디케이터 업데이트
		updateIndicator(carouselElem, currentIndex);
		// 슬라이드 버튼 숨김 여부 업데이트
		updateSlideButtonVisible(carouselElem, currentIndex, liCount);
		// 새로 보여지는 이미지 인덱스 값을 현재 data 값으로 업데이트
		carouselElem.attributes.data.value = currentIndex;
	}
}

function scrollDiv(carouselElem, nextIndex) {
	var scrollable = carouselElem.querySelector('div');
	var liWidth = scrollable.clientWidth;
	var newLeft = liWidth * nextIndex;

	scrollable.scrollTo({left: newLeft, behavior: 'smooth'});
}

function updateIndicator(carouselElem, currentIndex) {
	var indicators = carouselElem.querySelectorAll('footer > div');
	for (let i = 0; i < indicators.length; i++) {
		if(currentIndex == i) {
			indicators[i].className = 'active';
		} else {
			indicators[i].className = '';
		}
	}
}

function updateSlideButtonVisible(carouselElem, currentIndex, liCount) {
	var left = carouselElem.querySelector('.slide-left');
	var right = carouselElem.querySelector('.slide-right');

	if (currentIndex > 0) {
		left.style.display = 'block';
	} else {
		left.style.display = 'none';
	}
	if (currentIndex < liCount - 1) {
		right.style.display = 'block';
	} else {
		right.style.display = 'none';
	}

}