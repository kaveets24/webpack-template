import "./styles.scss";

class Carousel {
  constructor() {
    this.state = {
      slideIndex: 1,
      currentSlideRef: `#slide-1`
    };

    this.slider = document.querySelector(".slider");
    this.previous = document.querySelector(".previous");
    this.next = document.querySelector(".next");
    this.slides = document.querySelector(".slides");
    this.slideCount = this.slides.children.length;

    this.next.onclick = () => {
      if (this.state.slideIndex < this.slideCount) {
        this.state.slideIndex += 1;
      } else {
        this.state.slideIndex = 1;
      }
      this.state.currentSlideRef = `#slide-${this.state.slideIndex}`;
      this.next.href = this.state.currentSlideRef;
    };

    this.previous.onclick = () => {
      if (this.state.slideIndex > 1) {
        this.state.slideIndex -= 1;
      } else {
        this.state.slideIndex = this.slideCount;
      }
      this.state.currentSlideRef = `#slide-${this.state.slideIndex}`;
      this.previous.href = this.state.currentSlideRef;
    };
  }
}

const C = new Carousel();
