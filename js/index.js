//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

let taskInput = document.querySelector(".add__task");//Add a new task.
let addButton = document.getElementsByTagName("button")[0];//first button
let incompleteTaskHolder = document.querySelector(".incompleted__tasks");//ul of #incompleteTasks
let completedTasksHolder = document.querySelector(".completed__tasks");//completed-tasks


//New task list item
let createNewTaskElement = function (taskString) {
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let labelValue = document.createElement("span");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    let deleteButtonImg = document.createElement("img");

    listItem.className = "task-item";

    labelValue.innerText = taskString;
    label.className = 'task task-item__text';
    labelValue.className = 'task-item__value';

    //Each elements, needs appending
    checkBox.type = "checkbox";
    checkBox.className = "task-item__check";
    editInput.type = "text";
    editInput.className = "task input-text";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "task-item__edit btn";

    deleteButton.className = "task-item__delete delete btn";
    deleteButtonImg.src = './assets/remove.svg';
    deleteButtonImg.alt = "delete";
    deleteButtonImg.className = 'delete__img';
    deleteButton.appendChild(deleteButtonImg);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    label.appendChild(editInput);
    label.appendChild(labelValue);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

let addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    let listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

//Edit an existing task.
let editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");
    let listItem = this.parentNode;
    let editInput = listItem.querySelector('input[type=text]');
    let label = listItem.querySelector("label");
    let labelValue = listItem.querySelector(".task-item__value");
    let editBtn = listItem.querySelector(".task-item__edit");
    let containsClass = listItem.classList.contains("edit-mode");
    //If class of the parent is .editmode
    if (containsClass) {
        //switch to .editmode
        //label becomes the inputs value.
        labelValue.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = labelValue.innerText;
        editBtn.innerText = "Save";
    }
    listItem.classList.toggle("edit-mode");
};

let deleteTask = function () {
    console.log("Delete Task...");
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}

//Mark task completed
let taskCompleted = function () {
    console.log("Complete Task...");
    //Append the task list item to the #completed-tasks
    let listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}
let taskIncomplete = function () {
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    let listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}
let ajaxRequest = function () {
    console.log("AJAX Request");
}
//The glue to hold it all together.
//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    let checkBox = taskListItem.querySelector("input[type=checkbox]");
    let editButton = taskListItem.querySelector("button.task-item__edit");
    let deleteButton = taskListItem.querySelector("button.task-item__delete");
    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    //bind events to list items chldren(tasksCompleted) 
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
for (let i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
// Issues with usability don't get seen until they are in front of a human tester.
//prevent creation of empty tasks.
//Change edit to save when you are in edit mode.