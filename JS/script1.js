'use strict';



///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal));



btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//smooth scroll----
const btnScrollTo = document.querySelector(".btn--scroll-to");
btnScrollTo.addEventListener('click', function(e){
const sectionScroll = document.querySelector("#section--1");
sectionScroll.scrollIntoView({
  behavior:'smooth'
});
})


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

const navLink = document.querySelector('.nav__links');
navLink.addEventListener('click',function(e){
  e.preventDefault();
  //matching the links
  if(e.target.classList.contains("nav__link")){
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior:"smooth"
    })

  }
 
})