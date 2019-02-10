/*jshint esversion:6 */

const todos = getSavedTodos();

// check change for input
// search for todos by input
const filters = {
    searchInput: '',
    hideCompleted: false
};

// view the todo list in page launch
renderTodos(todos, filters);

// Filter by search input
document.querySelector('#filter-todo').addEventListener('input', function (e) {
    filters.searchInput = e.target.value;
    renderTodos(todos, filters);
});

document.querySelector('#new-todo').addEventListener('submit', function (e) {
    e.preventDefault();
    todos.push({
        id: uuidv4(),
        text: e.target.elements.todoInput.value,
        completed: false
    });

    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.todoInput.value = '';
});

// checkbox check 
document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
});

// dropdown
/* document.querySelector('#filter-by').addEventListener('change' , function (e) {
    console.log(e.target.value);
}); */