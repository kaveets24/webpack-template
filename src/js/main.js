import _ from "lodash";
import "../sass/main.scss";
import printMe from "./modules/print/";

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");

  btn.innerHTML = "Click Me";
  btn.onclick = printMe;
  element.appendChild(btn);
  return element;
}
// If slider page/
if (window.location.pathname === "/slider") {
  import(/* webpackChunkName: "slider" */ "./modules/slider/")
    .then(({ default: slider }) => {
      slider();
    })
    .catch(error => "An error occurred while loading the component");
}

document.body.appendChild(component());
