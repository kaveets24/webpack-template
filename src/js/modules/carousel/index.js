import "./styles.scss";
import carousel from "./carousel.html";

class Carousel extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    // Create shadow dom - https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
    this.shadow = this.attachShadow({ mode: "open" }); // "open" means we can access this shadow dom from within the page.
    this.addContainer();
    this.addStyles();
  }

  addStyles() {
    // Point our component to the main.css file.
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "main.css");
    this.shadow.appendChild(link);
  }

  addContainer() {
    // Create container
    const container = document.createElement("div");
    container.innerHTML = carousel;
    container.classList.add("carousel");
    this.shadow.appendChild(container);
  }
}
customElements.define("ok-carousel", Carousel);
