const $openAddTab = document.querySelector('.openAddTab');
const $addTodoSection = document.querySelector('.addTodoSection');
const $todo = document.querySelector('.todo');
$openAddTab.onclick = () => {
    $addTodoSection.classList.toggle('hidden');
  };