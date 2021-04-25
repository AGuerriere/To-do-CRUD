// use flexbox to position todos and buttons

let inputArea = document.getElementById("input-area");
let createButton = document.getElementById("create-button");
let todoList = document.querySelector("ul");

function inputLenght() {
    return inputArea.value.length;
}

function listLength() {
    let ulList = document.querySelectorAll("li");
    let newId = ulList.length;
    return newId
}

function createListElement() {
    let li = document.createElement("li");
    let id = listLength();
    li.setAttribute("id", id);
    li.appendChild(document.createTextNode(inputArea.value));
    todoList.appendChild(li);
    createEditButton(id)
    createDeleteButton(id)
    inputArea.value = "";
}

function addListAfterClick() {
    if (inputLenght() > 0){
        createListElement();
    }
}

function addListAfterKeypress(event) {
    if (inputLenght() > 0 && event.which === 13) {
        createListElement();
    }
}

function createDeleteButton(id){
    let deleteBtn = document.createElement("BUTTON");
    deleteBtn.setAttribute("type", "button")
    deleteBtn.setAttribute("class", "btn btn-danger")
    deleteBtn.setAttribute("onclick", "deleteItem("+id+")")
    deleteBtn.appendChild(document.createTextNode("DELETE"));
    // append button to li item
    let listItem = document.getElementById(id)
    listItem.appendChild(deleteBtn)

    
}

function createEditButton(id) {
    let editBtn = document.createElement("BUTTON");
    editBtn.setAttribute("type", "button");
    editBtn.setAttribute("class", "btn btn-warning");
    editBtn.setAttribute("onclick", "editItem("+id+")")
    editBtn.appendChild(document.createTextNode("EDIT"));
    // append button to li item
    let listItem = document.getElementById(id);
    listItem.appendChild(editBtn);
}

function deleteItem(id){
    let itemToDelete = document.getElementById(id);
    itemToDelete.remove();
}

function editItem(id) {
    // check if button save has already being clicked
    if (document.getElementById("edit-box")){
        return
    }
    // creates edit input box and calls function to create save button
    let editBox = document.createElement("input")
    editBox.setAttribute("type", "text")
    editBox.setAttribute("id", "edit-box")
    editBox.setAttribute("placeholder", document.getElementById(id).firstChild.textContent)
    editBox.setAttribute("class", "form-control")
    // get item to edit inner value
    todoList.appendChild(editBox)
    createSaveButton(id)
}

function createSaveButton(id){
    let saveBtn = document.createElement("BUTTON");
    saveBtn.setAttribute("type", "button");
    saveBtn.setAttribute("class", "btn btn-success");
    saveBtn.setAttribute("id", "save")
    saveBtn.setAttribute("onclick", "saveChanges("+id+")")
    saveBtn.appendChild(document.createTextNode("SAVE"));
    // append button to li item
    let editBox = document.getElementById("edit-box")
    todoList.appendChild(saveBtn);
}

function saveChanges(id){
    // get the text from the edit box
    let inputEdit = document.getElementById("edit-box").value;
    // replace the item text
    document.getElementById(id).firstChild.replaceWith(inputEdit)
    // delete save button
    let saveBtn = document.getElementById("save")
    saveBtn.remove();
    // delete edit entry box
    let entryBox = document.getElementById("edit-box")
    entryBox.remove();
}

createButton.addEventListener("click", addListAfterClick)

inputArea.addEventListener("keydown", addListAfterKeypress)

