import Dog from "../../images/dog.jpg";
const sliderPage = () => {
  const slider = document.getElementById("slider");
  const value = document.querySelector(".value");

  // Image Import
  const image = document.createElement("img");
  image.src = Dog;
  document.body.appendChild(image);

  value.innerHTML = slider.value;

  slider.oninput = function() {
    value.innerHTML = this.value;
  };
};

sliderPage();
