import component from "./slider.html";
const slider = () => {
  // html import

  const div = document.createElement("div");
  div.innerHTML = component;
  document.body.appendChild(div);

  const input = document.getElementById("slider");
  const value = document.querySelector(".value");

  value.innerHTML = input.value;

  input.oninput = function() {
    value.innerHTML = this.value;
  };
};

export default slider;
