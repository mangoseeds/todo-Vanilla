//Selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//Event 
//attach event listener with document(window) and check if content is loaded
document.addEventListener('DOMContentLoaded', getTodos) 
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheck);
filterOption.addEventListener('click', filterTodo);


//Functions
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();

    //Todo DIV : has check mark & trash button
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add todo to local storage
    saveLocalTodos(todoInput.value);

    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class=fas fa-check"></i>'; //adds html tag inside the button
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class=fas fa-check"></i>'; //adds html tag inside the button
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear todo input value for the next item
    todoInput.value = "";

}

function deleteAndCheck(e){
    //console.log(e.target);

    const item = e.target;

    //delete todo item
    if (item.classList[0] === 'trash-btn'){
        //item.remove();
        const todo= item.parentElement;
        //Add animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitioned', function(){
            //if animation is done remove element
            todo.remove();
        })
        
    }

    //check mark
    if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
        
        console.log(todos);

}


function saveLocalTodos(todo){
    //CHECK - do I have things in there?
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = [];
    } else{
        //get todo items and parse it back into an array
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    console.log("hello");
    //CHECK - do I have things in there?
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = [];
    } else{
        //get todo items and parse it back into an array
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){

        //Todo DIV : has check mark & trash button
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class=fas fa-check"></i>'; //adds html tag inside the button
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //Check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class=fas fa-check"></i>'; //adds html tag inside the button
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);
        })
}


function removeLocalTodos(todo){
    //CHECK - do I have things in there?
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = [];
    } else{
        //get todo items and parse it back into an array
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setIten('todos', JSON.stringify(todos));
}