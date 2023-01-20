// ******************************
//    NAVBAR SECTION
// ******************************


// ******************************
//    Filter Modal
// ******************************

const filterModal = document.getElementById("overlay");
const openFilterModal = document.querySelector(".open-filter");
const closeFilterModal = document.querySelector(".close-btn");

openFilterModal.onclick = function () {
  filterModal.style.display = "block";
};

closeFilterModal.onclick = function () {
  filterModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == filterModal) {
    filterModal.style.display = "none";
  }
};

// ******************************
//    Rooms and bedrooms Section
// ******************************

const btnContainer = document.querySelector(".rb-btns");
const roomBtn = btnContainer.querySelectorAll(".rb-btn");

for (let i = 0; i < roomBtn.length; i++) {
  roomBtn[i].addEventListener("click", function () {
    const current = document.getElementsByClassName("rb-active");
    current[0].className = current[0].className.replace(" rb-active", "");
    this.className += " rb-active";
  });
}

// ******************************
//  Read More Read Less Buttons
// ******************************


let parentContainer = document.querySelectorAll(".item-list");

for (let i = 0; i < parentContainer.length; i++) {
  parentContainer[i].addEventListener("click", function () {
    const current = event.target;
    const isReadMoreBtn = current.className.includes("read-more-btn");

    if (!isReadMoreBtn) return;
    const currentText =
      event.target.parentNode.querySelector(".read-more-item");

    currentText.classList.toggle("read-more-item--show");
    current.textContent = current.textContent.includes("Show more")
      ? "Show less"
      : "Show more";
  });
}


// ******************************
//    USER-DROPDOWN SECTION
// ******************************

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".userdropbtn")) {
    let dropdowns = document.getElementsByClassName("userdropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// ******************************
//    CHIPS-CATEGORIES SECTION
// ******************************

const chipSlider = document.querySelector(".chips-slider");

const rightBtn = document.querySelector(".chips-btn-right");
const leftBtn = document.querySelector(".chips-btn-left");

leftBtn.classList.add("is-hidden");

let sliderIndex = 0;
// const size = slider.getBoundingClientRect().width
const size = chipSlider.clientWidth;

console.log(size);

const slide = function (slide) {
  // chipSlider.style.transform = `translateX(${-61 * sliderIndex}%)`;
  chipSlider.style.transform = `translateX(${(-size / 1.65) * slide}px)`;
};

rightBtn.addEventListener("click", () => {
  if (sliderIndex + 1 > 6) {
    leftBtn.classList.remove("is-hidden");
    rightBtn.classList.add("is-hidden");
  } else {
    sliderIndex++;
    slide(sliderIndex);

    leftBtn.classList.remove("is-hidden");
    rightBtn.classList.remove("is-hidden");
  }
});

leftBtn.addEventListener("click", () => {
  if (sliderIndex - 1 < 0) {
    leftBtn.classList.add("is-hidden");
    rightBtn.classList.remove("is-hidden");
  } else {
    sliderIndex--;
    slide(sliderIndex);

    leftBtn.classList.remove("is-hidden");
    rightBtn.classList.remove("is-hidden");
  }
});

// ******************************
//       CAROUSEL SECTION
// ******************************

// getting all slider from the document
const carouselSlide = document.querySelectorAll(".carousel-slide");

// looping through each carousel slide images
for (let i = 0; i < carouselSlide.length; i++) {
  const slider = function () {
    const slides = carouselSlide[i].querySelectorAll(".slide");

    const prevBtn = carouselSlide[i].querySelector(".carousel-btn-left");
    const nextBtn = carouselSlide[i].querySelector(".carousel-btn-right");

    const dotContainer = carouselSlide[i].querySelector(".dots");

    prevBtn.classList.add("is-hidden");

    let curSlide = 0;
    const slideLength = slides.length;

    // Functions

    const createDots = function () {
      slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
          "beforeend",
          `<button class="dots__dot" data-slide="${i}"></button>`
        );
      });
    };

    const activateDot = function (slide) {
      carouselSlide[i]
        .querySelectorAll(".dots__dot")
        .forEach((dot) => dot.classList.remove("dots__dot--active"));

      carouselSlide[i]
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add("dots__dot--active");
    };

    const goToSlide = function (slide) {
      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
      );
    };

    const nextSlide = function () {
      if (curSlide >= slideLength - 1) {
        prevBtn.classList.remove("is-hidden");
        nextBtn.classList.add("is-hidden");
      } else {
        curSlide++;
        goToSlide(curSlide);
        activateDot(curSlide);

        prevBtn.classList.remove("is-hidden");
        nextBtn.classList.remove("is-hidden");
      }
    };

    const prevSlide = function () {
      if (curSlide <= 0) {
        prevBtn.classList.add("is-hidden");
        nextBtn.classList.remove("is-hidden");
      } else {
        curSlide--;
        goToSlide(curSlide);
        activateDot(curSlide);

        prevBtn.classList.remove("is-hidden");
        nextBtn.classList.remove("is-hidden");
      }
    };

    const init = function () {
      goToSlide(0);
      createDots(0);

      activateDot(0);
    };
    init();

    // Event handlers
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    dotContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("dots__dot")) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
      }
    });
  };

  slider();
}
