const sliderPage = function() {
  const slider = document.getElementById("slider");
  const value = document.querySelector(".value");

  value.innerHTML = slider.value;

  slider.oninput = function() {
    value.innerHTML = _.join(["The value is", ":"], " ") + this.value;
  };
};

export default sliderPage;
