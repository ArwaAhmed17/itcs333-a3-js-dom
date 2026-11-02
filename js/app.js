// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const errorMsg = document.getElementById('error-msg');
  const todoList = document.getElementById('todo-list');
  const counter = document.getElementById('counter');

  const allBtn = document.getElementById('filter-all');
  const activeBtn = document.getElementById('filter-active');
  const doneBtn = document.getElementById('filter-done');

  let currentFilter = 'all';


  function updateView() {
    const items = todoList.querySelectorAll('li');
    let count = 0;

    items.forEach(function(li) {
      const completed = li.classList.contains('completed');
      
      if (!completed) {
        count++;
      }

      

      if (currentFilter === 'all') {
        li.style.display = 'flex';
      } else if (currentFilter === 'active') {
        li.style.display = completed ? 'none' : 'flex';
      } else if (currentFilter === 'done') {
        li.style.display = completed ? 'flex' : 'none';
      }
      
    });

    counter.textContent = count + ' item(s) left';
  }



  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const text = input.value.trim();

    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }

    errorMsg.classList.add('hidden');

    const li = document.createElement('li');

  
    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = text;
    li.appendChild(span);

   
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    input.value = '';
    updateView();
  });


  todoList.addEventListener('click', function(event) {
    const deleteBtn = event.target.closest('.delete-btn');
    const li = event.target.closest('li');

    if (!li) {
      return;
    }

    if (deleteBtn) {
      li.remove();
    } else {
      li.classList.toggle('completed');
    }

    updateView();
  });

 
  allBtn.addEventListener('click', function() {
    currentFilter = 'all';
    updateView();
  });

  activeBtn.addEventListener('click', function() {
    currentFilter = 'active';
    updateView();
  });

  doneBtn.addEventListener('click', function() {
    currentFilter = 'done';
    updateView();
  });

  
  updateView();
});