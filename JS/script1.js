"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const navLink = document.querySelector(".nav__links");
const tab_container = document.querySelector(".operations__tab-container");
const tab = document.querySelectorAll(".operations__tab");
const tab_content = document.querySelectorAll(".operations__content");
const nav = document.querySelector('.nav');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//smooth scroll----

btnScrollTo.addEventListener("click", function (e) {
  const sectionScroll = document.querySelector("#section--1");
  sectionScroll.scrollIntoView({
    behavior: "smooth",
  });
});

//smooth scroll to the nav bar

// const navLinks = document.querySelectorAll('.nav__link');
// navLinks.forEach(function(ele){
//   ele.addEventListener("click",function(e){
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior:"smooth"
//     })
//   })

// })
// if we do by the above code here problem is that if we will be having 1000 elements then simply 1000 copies of that function will get created so here comes the EVENT DELIGATION

//EVENT DELIGATION---

navLink.addEventListener("click", function (e) {
  e.preventDefault();
  //matching the links
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

//styling the tap components----

tab_container.addEventListener("mouseover", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".operations__tab");
  //gaurd clause-
  if (!clicked) return;
  tab.forEach((t) => {
    t.classList.remove("operations__tab--active");
  });
  clicked.classList.add("operations__tab--active");

  //activating content area--
  tab_content.forEach((tc) => {
    tc.classList.remove("operations__content--active");
  });

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//implimenting the blur out feature in the nav bar--

const refactor = function(e){
  // console.log(this);
  const link = e.target;
  if(link.classList.contains('nav__link')){
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach((el)=>{
      if(el != link){
        el.style.opacity = this;
        logo.style.opacity = this;
      }
    })
  }

}

// nav.addEventListener('mouseover',function(e){
//   refactor(e,0.5);
// });

// nav.addEventListener('mouseout',function(e){
//   refactor(e,1);
// });
//passing "argument" in the event handler function using the BIND method--

nav.addEventListener('mouseover',refactor.bind(0.5));
nav.addEventListener('mouseout',refactor.bind(1));
 

//implimenting the sticky navigation

 

