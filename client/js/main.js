import FormComponent from "./components/form-component.js";
import todoValidator from "./helpers/validators/todo-validator.js";
import ApiService from "./helpers/api-service.js";

const todoList = document.querySelector('.js-todo-list');

const displayTodoItem = ({
  completed,
  title,
  id,
}) => {
  const todoItem = document.createElement('div');
  todoItem.className = 'todo-list__item';

  const todoItemText = document.createElement('div');
  todoItemText.className = 'todo-list__item__text';
  todoItemText.innerText = title;
  if (completed) todoItemText.classList.add('checked');
  
  const todoItemIcons = document.createElement('div')
  todoItemIcons.className = 'todo-list__item__icons';
  
  const checkmarkIcon = document.createElement('i');
  checkmarkIcon.className = 'fa-solid fa-square-check fa-2x';
  checkmarkIcon.addEventListener('click', async () => {
    const updatedTodo = await ApiService.updateTodo({
      id,
      completed: !todoItemText.classList.contains('checked'),
    });
    todoItemText.classList.add('checked')
  });

  const undoIcon = document.createElement('i');
  undoIcon.className = 'fa-solid fa-rotate-left fa-2x';
  undoIcon.addEventListener('click', async () => {
    const updatedTodo = await ApiService.updateTodo({
      id,
      completed: !todoItemText.classList.contains('checked'),
    });
    todoItemText.classList.remove('checked')
  });

  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fa-solid fa-square-xmark fa-2x';
  deleteIcon.addEventListener('click', async () => {
    await ApiService.deleteTodo(id);
    todoItem.remove();
  });

  todoItem.append(
    todoItemText,
    todoItemIcons
  );

  todoItemIcons.append(
    undoIcon,
    checkmarkIcon,
    deleteIcon
  )

  if (todoItemText.classList.contains('checked')){
    checkmarkIcon.classList.add('display-none')
    undoIcon.classList.remove('display-none')
  } else {
    checkmarkIcon.classList.remove('display-none')
    undoIcon.classList.add('display-none')
  }

  // todoList.insertAdjacentElement('afterBegin', todoItem); // pridėti į priekį
  todoList.appendChild(todoItem) // pridėti į galą
}

const formAddTodo = new FormComponent(
  '.js-add-todo-form',
  todoValidator,

  async ({ title }) => {
    const createdTodo = await ApiService.createTodo({ title });
    displayTodoItem(createdTodo);
  }
);

const todos = await ApiService.fetchTodos();
todos.forEach(displayTodoItem);