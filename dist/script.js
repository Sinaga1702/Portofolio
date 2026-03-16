// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector('header');
  const fixedNav = header.offsetTop;
  const toTop = this.document.querySelector('#back-to-top');

  if (window.pageYOffset > fixedNav) {
    header.classList.add('navbar-fixed');
    toTop.classList.remove('hidden');
    toTop.classList.add('flex');
  } else {
    header.classList.remove('navbar-fixed');
    toTop.classList.remove('flex');
    toTop.classList.add('hidden');
  }
};

// hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('hamburger-active');
  navMenu.classList.toggle('hidden');
});

// Klik Diluar hamburger
window.addEventListener('click', function (e) {
  if (e.target != hamburger && e.target != navMenu) {
    hamburger.classList.remove('hamburger-active');
    navMenu.classList.add('hidden');
  }
});

// Portfolio drag scroll
const portfolioScroll = document.querySelector('[data-portfolio-scroll]');

if (portfolioScroll) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const getPointerOffset = (pageX) =>
    pageX - portfolioScroll.getBoundingClientRect().left;

  const startDrag = (pageX) => {
    isDown = true;
    startX = getPointerOffset(pageX);
    scrollLeft = portfolioScroll.scrollLeft;
    portfolioScroll.classList.add('is-dragging');
  };

  const stopDrag = () => {
    isDown = false;
    portfolioScroll.classList.remove('is-dragging');
  };

  const handleDrag = (pageX) => {
    if (!isDown) return;
    const x = getPointerOffset(pageX);
    const walk = (x - startX) * 1.6;
    portfolioScroll.scrollLeft = scrollLeft - walk;
  };

  portfolioScroll.addEventListener('mousedown', (e) => {
    startDrag(e.pageX);
  });

  portfolioScroll.addEventListener('mouseleave', stopDrag);
  portfolioScroll.addEventListener('mouseup', stopDrag);

  portfolioScroll.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    handleDrag(e.pageX);
  });

  portfolioScroll.addEventListener('touchstart', (e) => {
    startDrag(e.touches[0].pageX);
  });

  portfolioScroll.addEventListener('touchend', stopDrag);

  portfolioScroll.addEventListener('touchmove', (e) => {
    handleDrag(e.touches[0].pageX);
  });
}
