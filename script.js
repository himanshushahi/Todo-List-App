let todoText = document.getElementById("todo-text");
let todobutton = document.getElementById("addTodoButton");
let todoField = document.getElementById("todo-field");

let alphabet =
  "abcdefghijklmnopqrstuvwxyz123567456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function addTodo() {
  let keyCount = "";
  for (let i = 0; i < 10; i++) {
    keyCount += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  let buttondiv = document.createElement("div");
  buttondiv.className = "button-field";
  let editButton = document.createElement("input");
  editButton.type = "submit";
  editButton.value = "Edit";
  editButton.className = "btn2";
  editButton.classList.add("editButton");
  let deleteButton = document.createElement("input");
  deleteButton.type = "submit";
  deleteButton.value = "Delete";
  deleteButton.className = "btn2";
  deleteButton.classList.add("deleteButton");
  buttondiv.append(editButton);
  buttondiv.append(deleteButton);

  let spanDiv = document.createElement("div");
  spanDiv.id = "forinput";
  spanDiv.className = "forInput";
  spanDiv.style.display = "flex";
  spanDiv.style.flexDirection = "column";

  let textSpan = document.createElement("span");
  textSpan.className = "span";
  textSpan.textContent = todoText.value.trim();
  let keySpan = document.createElement("span");
  keySpan.className = "key";
  keySpan.style.display = "none";
  keySpan.textContent = keyCount;
  let dateSpan = document.createElement("span");
  dateSpan.className = "date-span";
  dateSpan.textContent = 'Created at ' + formattedDate;
  spanDiv.append(textSpan);
  spanDiv.append(keySpan);
  spanDiv.append(dateSpan);

  let parentDiv = document.createElement("div");
  parentDiv.className = "saved-todo";
  let cheakbox = document.createElement("input");
  cheakbox.className = "cheakbox";
  cheakbox.type = "checkbox";
  cheakbox.style.position = "absolute";
  cheakbox.style.top = "47%";
  cheakbox.style.left = "5px";
  parentDiv.append(cheakbox);
  parentDiv.append(spanDiv);
  parentDiv.append(buttondiv);

  todoField.append(parentDiv);
  let obj = {
    text: todoText.value,
    date: 'Created at ' + formattedDate,
  };

  localStorage.setItem(keyCount, JSON.stringify(obj));

  todoText.value = "";
}

// to get the element after the window is reload

window.onload = () => {
  for (let i = 0; i <= localStorage.length; i++) {
    const newObj = JSON.parse(localStorage.getItem(localStorage.key(i)));

    let buttondiv = document.createElement("div");
    buttondiv.className = "button-field";
    let editButton = document.createElement("input");
    editButton.type = "submit";
    editButton.value = "Edit";
    editButton.className = "btn2";
    editButton.classList.add("editButton");
    let deleteButton = document.createElement("input");
    deleteButton.type = "submit";
    deleteButton.value = "Delete";
    deleteButton.className = "btn2";
    deleteButton.classList.add("deleteButton");
    buttondiv.append(editButton);
    buttondiv.append(deleteButton);

    let spanDiv = document.createElement("div");
    spanDiv.style.display = "flex";
    spanDiv.style.flexDirection = "column";
    spanDiv.id = "forinput";
    spanDiv.className = "forInput";

    let textSpan = document.createElement("span");
    textSpan.className = "span";
    textSpan.textContent = newObj.text;
    let keySpan = document.createElement("span");
    keySpan.className = "key";
    keySpan.style.display = "none";
    keySpan.textContent = localStorage.key(i);
    let dateSpan = document.createElement("span");
    dateSpan.className = "date-span";
    dateSpan.textContent = newObj.date;
    spanDiv.append(textSpan);
    spanDiv.append(keySpan);
    spanDiv.append(dateSpan);

    let parentDiv = document.createElement("div");
    parentDiv.classList.add("saved-todo");
    let cheakbox = document.createElement("input");
    cheakbox.className = "cheakbox";
    cheakbox.type = "checkbox";
    cheakbox.style.position = "absolute";
    cheakbox.style.top = "47%";
    cheakbox.style.left = "5px";
    parentDiv.append(cheakbox);
    parentDiv.append(spanDiv);
    parentDiv.append(buttondiv);
    todoField.append(parentDiv);
  }
};

// for todo appear placehoder in todos main div

function placeHolder(){
  if(todoField.innerHTML == ''){
    todoField.innerHTML = `<div style="height: 100%; display: flex; justify-content: center; align-items: center;" id="info">Todos Appear Here</div>`;
  }
}

// for call the function on enter button

todobutton.addEventListener("click", () => {
  if (todoText.value.length > 1) {
    addTodo();
  }
});
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 13 && todoText.value.length > 1) {
    addTodo();
  }
});

// functionality for delete
const modal = document.getElementById("modal");
function del(e) {
  if (e.target.classList.contains("deleteButton")) {
    modal.querySelector("div").style.transform = "translateY(0%)";
    modal.classList.remove("hidden");
    function fun() {
      return new Promise((resolve, reject) => {
        document.getElementById("yesButton").addEventListener("click", () => {
          resolve(true);
        });

        document.getElementById("noButton").addEventListener("click", () => {
          reject(false);
        });

        modal.addEventListener("click", () => {
          reject(false);
        });
      });
    }

    fun()
      .then((val) => {
        if (val) {
          let savedTodo = e.target.closest(".saved-todo");
          let key = savedTodo.querySelector(".key").innerText;
          savedTodo.remove();
          localStorage.removeItem(key);
          modal.classList.add("hidden");
          modal.querySelector("div").style.transform = "translateY(-300%)";
          placeHolder();
        }
      })
      .catch(() => {
        modal.classList.add("hidden");
        modal.querySelector("div").style.transform = "translateY(-300%)";
        // location.reload();
      });
  }
}

todoField.addEventListener("click", del);

// for edit functionality
todoField.addEventListener("click", (e) => {
  if (e.target.classList.contains("editButton")) {
    var textarea = document.createElement("textarea");
    textarea.classList.add("text-area");

    // creating save button
    let savedTodo = e.target.closest(".saved-todo");
    savedTodo
      .querySelector(".forInput")
      .insertAdjacentElement("afterbegin", textarea);
    savedTodo.querySelector(".cheakbox").style.display = "none";
    textarea.value = savedTodo.querySelector(".span").innerText;
    savedTodo.querySelector(".span").remove();
    e.target.style.display = "none";
    e.target
      .closest(".button-field")
      .querySelector(".deleteButton").style.display = "none";

    let saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.classList.add("btn2");
    saveButton.classList.add("saveButton");
    e.target
      .closest(".button-field")
      .insertAdjacentElement("afterbegin", saveButton);
    saveButton.addEventListener("click", () => {
      e.target
        .closest(".button-field")
        .querySelector(".deleteButton").style.display = "inline-block";
      let savedTodo = e.target.closest(".saved-todo");
      savedTodo.querySelector(".cheakbox").style.display = "block";
      let key = savedTodo.querySelector(".key").innerText;
      savedTodo
        .querySelector(".forInput")
        .insertAdjacentHTML(
          "afterbegin",
          `<span class="span">${textarea.value}</span>`
        );
      saveButton.style.display = "none";

      textarea.style.display = "none";
      e.target.style.display = "block";

      window.addEventListener("click", (e) => {
        if (
          e.target.classList.contains(".text-area") ||
          e.target.classList.contains(".saveButton") ||
          e.target.classList.contains(".editButton")
        ) {
          textarea.style.display = "block";
        } else {
          textarea.style.display = "none";
        }
      });

      // get the date

      const date = new Date();

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      savedTodo
        .querySelector(".forInput")
        .querySelector(".date-span").innerText = 'Updated at ' + formattedDate;
      let text = textarea.value;
      let obj = {
        text: text,
        date: 'Updated at ' + formattedDate,
      };
      localStorage.setItem(key, JSON.stringify(obj));
    });
  }
});

// active search

let searchField = document.getElementById("Search-field");
let searchButton = document.getElementById("search");
let searchResult = document.getElementById("search-result");
let span = document.getElementsByClassName("span");


function addButton(flag) {
  if (flag) {
    searchResult.insertAdjacentHTML("afterbegin",'<div style="display:flex; justify-content:flex-end;" id="resultButtonDiv"><button onclick="removeField()" class="btn2 cross" id="cross">X</button></div>')
  }
}
let flagForButton = false;
searchButton.addEventListener("click", () => {
  if (searchResult.innerText != "") {
    searchResult.innerText = "";
  }
  let searchValue = searchField.value;
  searchField.value = "";
  let flagForButton = false;
  Array.from(span).forEach((e) => {
    let text = e.innerText.split(" ");
    let textSet = [...new Set(text)];
    textSet.forEach((i) => {
      if (i.toLowerCase() == searchValue.toLowerCase()) {
        searchResult.innerHTML += `
        <div style="width:77vw; border-top:1px solid white; border-radius:.5rem; padding:7px;" class="result">
         <span>
         ${e.innerText}
         </span>
        </div>
        `;
        searchResult.className = "transform-0";
        flagForButton = true;
      }
    });
  });
  addButton(flagForButton);
});

// to remove the search result field

function removeField() {
  // searchResult.innerHTML = "";
  searchResult.classList.remove("transform-0");
  searchResult.classList.add("transform-300");  
}

let cheakbox = document.getElementsByClassName("cheakbox");

let selectAll = document.getElementById("selectAll");

// to select All the element

selectAll.addEventListener("click", (e) => {
  document.getElementById("deselectAll").classList.remove("display-none");
  e.target.style.display = "none";
  Array.from(cheakbox).forEach((elem) => {
    elem.checked = true;
  });
});

// to deselectAll 
let deselectAll = document.getElementById("deselectAll");
deselectAll.addEventListener("click", (e) => {
  e.target.classList.add("display-none");
  selectAll.style.display = "block";
  Array.from(cheakbox).forEach((elem) => {
    elem.checked = false;
  });
});


// for selectAll delete

let delet = document.getElementById("delete");
delet.addEventListener("click", () => {
  deselectAll.classList.add("display-none");
  selectAll.style.display = "block";
  let checkbox = document.querySelectorAll(".cheakbox");
  Array.from(checkbox).forEach((elem) => {
    if (elem.checked) {
      modal.querySelector("div").style.transform = "translateY(0%)";
      modal.classList.remove("hidden");
      function fun() {
        return new Promise((resolve, reject) => {
          document.getElementById("yesButton").addEventListener("click", () => {
            resolve(true);
          });

          document.getElementById("noButton").addEventListener("click", () => {
            reject(false);
          });

          modal.addEventListener("click", () => {
            reject(false);
          });
        });
      }

      fun()
        .then((val) => {
          if (val) {
            let savedTodo = elem.closest(".saved-todo");
            let key = savedTodo.querySelector(".key").innerText;
            savedTodo.remove();
            localStorage.removeItem(key);
            modal.classList.add("hidden");
            modal.querySelector("div").style.transform = "translateY(-300%)";
            placeHolder();
          }
        })
        .catch(() => {
          modal.classList.add("hidden");
          modal.querySelector("div").style.transform = "translateY(-300%)";
          // location.reload();
        });
    }
  });
  Array.from(checkbox).forEach((elem)=>{
    elem.checked = false;
  })
});
