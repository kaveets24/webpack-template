import "./styles.scss";

import carousel from "./carousel.html";

class Carousel extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    const container = document.createElement("div");
    container.innerHTML = carousel;
    container.classList.add("carousel")
    document.body.appendChild(container);
  }
}
customElements.define("ok-carousel", Carousel);


