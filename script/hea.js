// 추가 버튼 클릭 시 폼 띄우기
const $openAddTab = document.querySelector('.openAddTab');
const $addTodoSection = document.querySelector('.addTodoSection');

$openAddTab.onclick = () => {
    $addTodoSection.classList.toggle('hidden');
  };
// 할 일(li) 클릭 시 창 아래로 길게 펼쳐지는 것
const $todos = document.querySelector('.todos');
const $toggleTodo = document.querySelector('.toggleTodo');
$todos.onclick = ({ target }) => {
    if (!target.matches('.todos > li')) return;
    $toggleTodo.classList.toggle('hidden');

};