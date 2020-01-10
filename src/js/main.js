import _ from "lodash";
import "../sass/main.scss";
import printMe from "./modules/print/";
import  "./modules/carousel";

// If slider page/
if (window.location.pathname === "/slider") {
  import(/* webpackChunkName: "slider" */ "./modules/slider/")
    .then(({ default: slider }) => {
      slider();
    })
    .catch(error => "An error occurred while loading the component");
}


