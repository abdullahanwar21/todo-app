// #1 -> Storing User Inputs value into local storage
const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

//    creating user input
document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
});

function createItem(item) {
    itemsArray.push(item.value);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    location.reload();
  }

//  #2 -> displaying that stored values on browser
function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    const element = itemsArray[i];
    items += `   <div class="item">
        <div class="input__controller">
            <textarea disabled>${element}</textarea>
            <div class="edit__controller">
                <i class="fa-solid fa-trash deleteBtn"  title="Delete Button"></i>
                <i class="fa-solid fa-pen-to-square editBtn" title="Edit Button"></i>
            </div>
        </div>
            <div class="update__controller">
                <button class="saveBtn">Save</button>
                <button class="cancelBtn">Cancel</button>
            </div>
    </div>`;
  }
  document.querySelector(".todo__list").innerHTML = items;
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
}

//  #3 -> Updating user changes 
function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update__controller");
  const inputController = document.querySelectorAll(
    ".input__controller textarea"
  );
  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputController[i].disabled = false;
    });
  });
}


//  #4 ->  deleting user inputs values as per user interaction
function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => deleteItem(i));
  });
}

function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

//  #5 -> canceling as per user interaction
function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update__controller");
  const inputController = document.querySelectorAll(
    ".input__controller textarea"
  );
  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
            updateController[i].style.display = "none";
            inputController[i].disabled = true;
    });
  });
}

//  #6 saving user Inputs updates value . 
function activateSaveListeners() {
  let saveBtn = document.querySelectorAll(".saveBtn");
  const inputController = document.querySelectorAll(
    ".input__controller textarea"
  );
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => updateItem(inputController[i].value, i));
  });
}

function updateItem(text, i) {
  itemsArray[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}


window.onload = function () {
  displayItems();
};
