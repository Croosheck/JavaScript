'use strict';

///////////////////////////////////////

// Setting the page on top, after refreshing
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
      window.scrollTo(0, 0);
  }
};

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const message = document.createElement('div');

const sections = document.querySelectorAll('.section');
sections.forEach(sec=>sec.classList.add('section--hidden'))

const imgTargets = document.querySelectorAll('img[data-src]');

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const leftBtn = document.querySelector('.slider__btn--left');
const rightBtn = document.querySelector('.slider__btn--right');
const btnLogo = document.querySelector('.btn__bankist--logo');

const section1 = document.getElementById('section--1');
const nav = document.querySelector('.nav');
const dotContainer = document.querySelector('.dots');


// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Cookies message
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'
const header = document.querySelector('.header');
header.prepend(message);
document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove();
});
message.style.width = '120%'
message.style.backgroundColor = '#37383d';
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 20 + 'px'

// Scrolling to the top of the page, on logo click
btnLogo.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({
    top: '0px',
    behavior: 'smooth'
  })
})

/*
//Page navigation top buttons (1st way)
const navLinks = [...document.querySelectorAll('.nav__link')]
navLinks.forEach(function(mov, i) {
  mov.addEventListener('click', function(e) {
    e.preventDefault();
    const sectionCoords = document.getElementById(`section--${i + 1}`).getBoundingClientRect()
    window.scrollTo({
      top: sectionCoords.top + window.pageYOffset + 100,
      behavior: "smooth",
    });
  });
});
*/

/*
//Page navigation top buttons (2nd way)
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(function(mov) {
  mov.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: "smooth"
    })
  });
});
*/

// Page navigation top buttons - Event delegation (for better performance)
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: "smooth"
    });
  };
});

// Smooth scrolling 'Learn more' button
btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo({
    top: s1coords.top + window.pageYOffset + 100, 
    behavior: "smooth"});
});

// Tabs functionality
tabsContainer.addEventListener('click', function(e){
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  // Moving tabs
  tabs.forEach(tab=>tab.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active');
  // Changing the content
  tabsContent.forEach(tab=>tab.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
  
});

// Menu fade animation
const handleHover = function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img')
  siblings.forEach(el => {
    if(el !== link) el.style.opacity = this[0];
    if(el === link) el.style.fontSize = this[1]
    logo.style.opacity = this[0];
  })
  }
};
nav.addEventListener('mouseover', handleHover.bind([0.5, '210%']));
nav.addEventListener('mouseout', handleHover.bind([1, '170%']));

/*
// Not very efficient way of sticking the menu bar (bad for performance)
window.addEventListener('scroll', function() {
  if (window.scrollY > section1.getBoundingClientRect().top)
    nav.classList.add('sticky');
    else 
    nav.classList.remove('sticky');
})
*/

// Sticking the menu bar (The intersection observer API)
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting){
    // Attaching the menu bar
    nav.classList.add('sticky');
    // Detaching if viewport is on the top of the page
  } else nav.classList.remove('sticky')
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight+50}px`
});
// Calling the observer
headerObserver.observe(header);

// Sections revealing throughout scrolling
const revealSection = function(entries, observer) {
  const [entry] = entries;
  if(entry.isIntersecting) {
  // Section revealing
  entry.target.classList.remove('section--hidden');
  // Detaching the observer from an element
  observer.unobserve(entry.target);
  };
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

// Calling the sections observer
sections.forEach(function(section){
  sectionObserver.observe(section);
})

// Images revealing throughout scrolling
const loadImg = function(entries, observer) {
  const [entry] = entries;
  if(entry.isIntersecting) {
    // Replacing the low resolution img to high resolution (creates the 'load' event after displaying)
    entry.target.src = entry.target.dataset.src;
    // Unhiding the image (ONLY when the HQ img is loaded-in case the internet speed is low)
    entry.target.addEventListener('load', function() {
      entry.target.classList.remove('lazy-img');
    })
    // Detaching the observer from an element
    observer.unobserve(entry.target)
  }
}
const imgObserver =  new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-250px'
});
//Calling the observer
imgTargets.forEach(img=>imgObserver.observe(img));

/*
// Making the slides visible
const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.4) translateX(-80%)'
slider.style.overflow = 'visible'
*/

let curSlide = 0;
const slides = document.querySelectorAll('.slide');
const maxSlide = slides.length;

// Highlighting the dot, based on active slide function
const activateDot = function(slide) {
  document.querySelectorAll('.dots__dot').forEach(e => e.classList.remove('dots__dot--active'))
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
};

// Setting the slides in ascending order
const goToSlide = function(slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`
  })
};
// Setting the 1st shown slide
goToSlide(0)

// Switching slides to the right function
const nextSlide = function() {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else curSlide++;
  goToSlide(curSlide);
  activateDot(curSlide);
};

// Switching slides to the left function
const prevSlide = function() {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else curSlide--;
  goToSlide(curSlide);
  activateDot(curSlide);
};

// Creating the dots navigation element, depend on the number of slides
const createDots = function () {
  slides.forEach(function(_, i){
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
  activateDot(0);
};
createDots();


// Go to the next slide (and go to the last one, if the 1st one)
rightBtn.addEventListener('click', nextSlide);

// Go to the previous slide (and get back to 1st one, if the last one)
leftBtn.addEventListener('click', prevSlide);

// Changing slides with arrow keys (right and left)
document.addEventListener('keydown', function(e) {
  if(e.key === 'ArrowRight') nextSlide(); 
  else if (e.key === 'ArrowLeft') prevSlide();
});

// Changing slides by clicking on dots
dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains("dots__dot")) {
    goToSlide(e.target.dataset.slide);
    activateDot(e.target.dataset.slide);
  }
});



/*
//Random color function
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
*/