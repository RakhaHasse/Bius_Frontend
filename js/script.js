document.addEventListener("DOMContentLoaded", () => {
    menuToggle();
    languageMenuToggle();

    const nav = document.querySelector('nav');
    window.addEventListener("scroll", e => {
        const offset = window.pageYOffset;
        if (offset > 300) {
            nav && nav.classList.add('scrolled');
        } else {
            nav && nav.classList.remove('scrolled');
        }
    });


    // //home page item snap
    homePageVerticalCarousel();

    //team slider about page
    teamSlider();

    //blog page
    videoSlider();
    mainPostSlider();

    //science page
    biomakerSlider();
    approachSlider();

});



function menuToggle() {
    const menuToggleBtn = document.querySelector('.menu_trigger');
    const menu = document.querySelector('.menu');
    menuToggleBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        menu && menu.classList.toggle('show');
    });

    clickOutSide(menuToggleBtn, menu);

}

function languageMenuToggle() {
    const menuToggleBtn = document.querySelector('.dropdown-toggle');
    const menu = document.querySelector('.dropdown-menu');
    menuToggleBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        menu && menu.classList.toggle('show');
    });

    clickOutSide(menuToggleBtn, menu);
}


function clickOutSide(content, menu) {
    document.addEventListener("click", (e) => {
        if (content.contains(e.target) || menu.contains(e.target)) return;
        menu.classList.remove('show');
    });
}



function homePageVerticalCarousel() {
    const itemsWrapper = document.querySelector('.slide-inwrap');
    if (!itemsWrapper) return;

    const nextBtn = document.querySelector(".slideTrigger .next");
    const prevBtn = document.querySelector(".slideTrigger .prev");

    slideY(itemsWrapper, slideItemClass = 'slider_item', prevBtn, nextBtn);
}



function teamSlider() {
    const sliderWrapper = document.querySelector('.team-carousel');
    if (!sliderWrapper) return;
    const nextBtn = document.querySelector(".action-menu .button--next");
    const prevBtn = document.querySelector(".action-menu .button--previous");
   // slideX(sliderWrapper, 'carousel-item', prevBtn, nextBtn, true);

   prevBtn.addEventListener("click", () => {
        console.log(sliderWrapper.scrollLeft)
        sliderWrapper.scrollLeft = sliderWrapper.scrollLeft - 100
   });
    nextBtn.addEventListener("click", () => {
        console.log(sliderWrapper.scrollLeft)
        sliderWrapper.scrollLeft = sliderWrapper.scrollLeft + 100
    });
    let dir = 1;
    /*
    setInterval(()=>{
        let scrolpos = sliderWrapper.scrollLeft
        
        sliderWrapper.scrollLeft = sliderWrapper.scrollLeft + 5 * dir
        if(scrolpos == 0){
            dir = 1
        }
        if(scrolpos == 1150){
            dir = -1
        }
        
    },30)
    */
}


function videoSlider() {
    const sliderWrapper = document.querySelector('.carousel-item-container');
    if (!sliderWrapper) return;

    const nextBtn = document.querySelector(".slide-action .button--next");
    const prevBtn = document.querySelector(".slide-action .button--previous");

    slideX(sliderWrapper, 'item', prevBtn, nextBtn);
}


function mainPostSlider() {
    const sliderWrapper = document.querySelector('.post-container');
    if (!sliderWrapper) return;
    const nextBtn = document.querySelector(".main-post .carousel-action .button--next");
    const prevBtn = document.querySelector(".main-post .carousel-action .button--previous");

    slideX(sliderWrapper, 'post-carousel-item', prevBtn, nextBtn);
}


function biomakerSlider() {
    const sliderWrapper = document.querySelector('.biomarker .slider-wrapper');
    if (!sliderWrapper) return;

    const nextBtn = document.querySelector(".biomarker .buttonArea .button--next");
    const prevBtn = document.querySelector(".biomarker .buttonArea .button--previous");

    slideX(sliderWrapper, 'slider-wrap', prevBtn, nextBtn);
}

function approachSlider() {
    const sliderWrapper = document.querySelector('.approach .slider-wrapper');
    if (!sliderWrapper) return;

    const nextBtn = document.querySelector(".approach .buttonArea .button--next");
    const prevBtn = document.querySelector(".approach .buttonArea .button--previous");

    slideX(sliderWrapper, 'slider-wrap', prevBtn, nextBtn);
}


function slideY(sliderWrapper, slideItemClass = 'slider_item', prev, next) {

    var slides = sliderWrapper.getElementsByClassName(slideItemClass);
    var slidesLength = slides.length;
    var posInitial;
    var slideSize = sliderWrapper.getElementsByClassName(slideItemClass)[0].offsetHeight;
    var firstSlide = slides[0];
    var lastSlide = slides[slidesLength - 1];
    var cloneFirst = firstSlide.cloneNode(true);
    var cloneLast = lastSlide.cloneNode(true);
    var index = 0;
    var allowShift = true;
    // Clone first and last slide
    sliderWrapper.appendChild(cloneFirst);
    sliderWrapper.insertBefore(cloneLast, firstSlide);

    sliderWrapper.style.top = -(slideSize) + "px";

    prev.addEventListener("click", () => shiftSlide(-1));
    next.addEventListener("click", () => shiftSlide(1));

    sliderWrapper.addEventListener('transitionend', checkIndex);

    function shiftSlide(dir, action) {
        sliderWrapper.classList.add('shifting');

        if (allowShift) {
            if (!action) { posInitial = sliderWrapper.offsetTop; }
            console.log("index ", index);
            console.log("posInitial ", posInitial);
            console.log("slideSize ", slideSize);
            if (dir == 1) {
                sliderWrapper.style.top = (posInitial - slideSize) + "px";
                index++;
            } else if (dir == -1) {
                sliderWrapper.style.top = (posInitial + slideSize) + "px";
                index--;
            }
        };

        allowShift = false;
    }

    function checkIndex() {
        sliderWrapper.classList.remove('shifting');
        if (index == -1) {
            sliderWrapper.style.top = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            sliderWrapper.style.top = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    }
}

function slideX(sliderWrapper, slideItemClass, prev, next, autplay = false, interval = 3000) {

    var slides = sliderWrapper.getElementsByClassName(slideItemClass);
    var slidesLength = slides.length;
    var posInitial;
    var slideSize = sliderWrapper.getElementsByClassName(slideItemClass)[0].offsetWidth;
    var firstSlide = slides[0];
    var lastSlide = slides[slidesLength - 1];
    var cloneFirst = firstSlide.cloneNode(true);
    var cloneLast = lastSlide.cloneNode(true);
    var index = 0;
    var allowShift = true;
    // Clone first and last slide
    sliderWrapper.appendChild(cloneFirst);
    sliderWrapper.insertBefore(cloneLast, firstSlide);
    sliderWrapper.style.left = -(slideSize) + "px";
    prev.addEventListener("click", () => shiftSlide(-1));
    next.addEventListener("click", () => shiftSlide(1));

    sliderWrapper.addEventListener('transitionend', checkIndex);

    function shiftSlide(dir, action) {
        sliderWrapper.classList.add('shifting');

        if (allowShift) {
            if (!action) { posInitial = sliderWrapper.offsetLeft; }
            console.log("index ", index);
            console.log("posInitial ", posInitial);
            console.log("slideSize ", slideSize);
            if (dir == 1) {
                sliderWrapper.style.left = (posInitial - slideSize) + "px";
                index++;
            } else if (dir == -1) {
                sliderWrapper.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        };

        allowShift = false;
    }

    function checkIndex() {
        sliderWrapper.classList.remove('shifting');
        if (index == -1) {
            sliderWrapper.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            sliderWrapper.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    }

    if (autplay) {
        setInterval(() => {
            shiftSlide(-1);
        }, interval);
    }
}

// Custome select area

var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
selElmnt = x[i].getElementsByTagName("select")[0];
ll = selElmnt.length;
/*for each element, create a new DIV that will act as the selected item:*/
a = document.createElement("DIV");
a.setAttribute("class", "select-selected");
a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
x[i].appendChild(a);
/*for each element, create a new DIV that will contain the option list:*/
b = document.createElement("DIV");
b.setAttribute("class", "select-items select-hide");
for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
        }
        }
        h.click();
    });
    b.appendChild(c);
}
x[i].appendChild(b);
a.addEventListener("click", function(e) {
    /*when the select box is clicked, close any other select boxes,
    and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
/*a function that will close all select boxes in the document,
except the current select box:*/
var x, y, i, xl, yl, arrNo = [];
x = document.getElementsByClassName("select-items");
y = document.getElementsByClassName("select-selected");
xl = x.length;
yl = y.length;
for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
    arrNo.push(i)
    } else {
    y[i].classList.remove("select-arrow-active");
    }
}
for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
    x[i].classList.add("select-hide");
    }
}
}

document.addEventListener("click", closeAllSelect);