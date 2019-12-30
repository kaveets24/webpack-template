const sliderPage = () => {
  const slider = document.getElementById("slider");
  const value = document.querySelector(".value");

  value.innerHTML = slider.value;

  slider.oninput = function() {
    value.innerHTML = this.value;
  };
};

sliderPage();
