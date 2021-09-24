import "reset-css/sass/_reset.scss";

import "./style.scss";

const input = document.querySelector(".inputText");
const doList = document.querySelector(".do");
const doneList = document.querySelector(".done");

const inputReset = () => {
  input.value = "";
  input.focus();
};

const addDo = () => {};

window.addEventListener("click", (e) => {
  const elClassName = e.target.className;

  if (elClassName.includes("submit")) {
  }
});

window.addEventListener("DOMContentLoaded", () => {
  input.focus();
});
