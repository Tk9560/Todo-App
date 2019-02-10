/*jshint esversion: 6*/

// Read todos from localStroge
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos');

    if (todosJSON !== null) {
        return JSON.parse(todosJSON);
    } else {
        return [];
    }
};

// Save the todos to the localStroge
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
};


// Remove todo by uuid
const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id;
    });

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
};


// Add todo text with DOM
const generateTodoDOM = function (todo) {
    const leftDiv = document.createElement('div');
    const rightDiv = document.createElement('div');
    const totalDiv = document.createElement('div');
    const todoCheckBox = document.createElement('input');
    const todoText = document.createElement('span');
    const todoDeleteBtn = document.createElement('button');

    rightDiv.style.display = 'inline-block';
    leftDiv.style.display = 'inline-block';

    todoText.style.marginRight = '190px';
    todoCheckBox.style.marginRight = '10px';

    // setup todo checkbox
    todoCheckBox.setAttribute('type', 'checkbox');
    todoCheckBox.checked = todo.completed;
    leftDiv.appendChild(todoCheckBox);
    todoCheckBox.addEventListener('change', function (e) {
        e.target.checked ? todo.completed = true : todo.completed = false;
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    //setup todo text
    todoText.textContent = todo.text;
    leftDiv.appendChild(todoText);

   
    //setup todo button
    todoDeleteBtn.textContent = 'x';
    rightDiv.appendChild(todoDeleteBtn);
    todoDeleteBtn.addEventListener('click', function () {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    totalDiv.appendChild(leftDiv);
    totalDiv.appendChild(rightDiv);

    return totalDiv;
};

// Get todos summary
const generateSummaryTodos = function (incompletedTodos) {
    const remainTodos = document.createElement('h2');
    remainTodos.textContent = `You have ${incompletedTodos.length} todos left!`;
    return remainTodos;
};

// Render todos 
const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchInput.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;    
        return searchTextMatch && hideCompletedMatch;
        
    });
    
    const todoDiv = document.querySelector('#todos');
    const incompletedTodos = filteredTodos.filter(function (todo) {
        return !todo.completed;
    });

    document.querySelector('#todos').innerHTML = '';

    todoDiv.appendChild(generateSummaryTodos(incompletedTodos));
    
    filteredTodos.forEach(function (todo) {
        todoDiv.appendChild(generateTodoDOM(todo));
    });  
};
