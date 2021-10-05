import "reset-css/sass/_reset.scss";

import "./style.scss";

import swal from "sweetalert";

const input = document.querySelector(".inputText");
const doList = document.querySelector(".doList").children[0];
const modal = document.querySelector(".modal");
const modifyInput = document.querySelector(".modifyInput");

let idx = 0;
let selectId = 0;

const inputReset = (inputEl) => {
  inputEl.value = "";
  inputEl.focus();
};

const addDo = () => {
  doList.children[0].nodeName === "DIV"
    ? (doList.innerHTML = doTemplate())
    : (doList.innerHTML += doTemplate());
};

const doTemplate = () => {
  return `
    <li class="do" id=${idx++}>
      <div class="left">
        <span class="name">${input.value.trim()}</span>
      </div>
      <div class="right">
        <button class="check">
          <i class="far fa-check-square"></i> </button
        ><button class="edit"> <i class="far fa-edit"></i> </button
        ><button class="delete">
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    </li>
  `;
};

const emptyDoListContent = () => {
  doList.innerHTML = `
    <div class="empty">
      <span>할 일을 적어주세요<span>
    </div>
  `;
};

const inputValidation = (inputEl) => {
  if (inputEl.value === "") return false;
  if (inputEl.value.match(/\s/g)) return false;
  return true;
};

const todoModify = () => {
  const dos = document.querySelectorAll(".do");

  dos.forEach(
    (item) =>
      item.id === String(selectId) &&
      (item.children[0].children[0].innerHTML = modifyInput.value)
  );
};

window.addEventListener("click", (e) => {
  const targetEl = e.target;
  const elClassName = e.target.className;

  if (elClassName.includes("submit") || elClassName.includes("plus")) {
    if (inputValidation(input)) {
      addDo();
      inputReset(input);
    } else {
      swal("빈 문자, 공백(space)는 안됩니다!");
    }
  }

  if (elClassName.includes("delete") || elClassName.includes("trash")) {
    swal({
      title: "정말 삭제하시겠습니까?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        targetEl.closest("li").remove();
        swal("삭제되었습니다", {
          icon: "success",
        });
      }
      doList.children.length === 0 && emptyDoListContent();
    });
  }

  if (elClassName.includes("edit")) {
    modal.classList.add("on");
    modifyInput.value =
      targetEl.closest("li").children[0].children[0].innerHTML;
    selectId = targetEl.closest("li").id;
    modifyInput.focus();
  }

  if (elClassName.includes("exit") || elClassName.includes("times")) {
    modal.classList.remove("on");
  }

  if (elClassName.includes("modifySubmit")) {
    if (inputValidation(modifyInput)) {
      todoModify();
      modal.classList.remove("on");
    } else {
      swal("빈 문자, 공백(space)는 안됩니다!");
    }
  }

  if (elClassName.includes("check")) {
    targetEl.closest("li").children[0].children[0].classList.toggle("done");
  }
});

window.addEventListener("keypress", (e) => {
  const focusClassName = document.activeElement.className;

  if (focusClassName === "inputText") {
    if (e.key.includes("Enter")) {
      if (inputValidation(input)) {
        addDo();
        inputReset(input);
      } else {
        swal("빈 문자, 공백(space)는 안됩니다!");
      }
    }
  } else if (focusClassName === "modifyInput") {
    if (e.key.includes("Enter")) {
      if (inputValidation(modifyInput)) {
        todoModify();
        modal.classList.remove("on");
      } else {
        swal("빈 문자, 공백(space)는 안됩니다!");
      }
    }
  }

  // if (e.key.includes("Enter")) {
  //   if (modal.className.includes("on")) {
  //     if (inputValidation(modifyInput)) {
  //       todoModify();
  //       modal.classList.remove("on");
  //     } else {
  //       swal("내용을 입력해 주세요!");
  //     }
  //   } else {
  //     if (inputValidation(input)) {
  //       addDo();
  //       inputReset(input);
  //     } else {
  //       swal("빈 문자, 공백(space)는 안됩니다!");
  //     }
  //   }
  // }
});

window.addEventListener("DOMContentLoaded", () => {
  input.focus();
  emptyDoListContent();
});
