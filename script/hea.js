// 추가 버튼 클릭 시 폼 띄우기
const $openAddTab = document.querySelector('.openAddTab');
const $addTodoSection = document.querySelector('.addTodoSection');
const $addTodoBtn = document.querySelector('.addTodoBtnWarp > .addBtn');
const $addTodoTitle = document.querySelector('.addTodoTitle');
const $checkTodoKeyword = document.querySelector('.checkTodoKeywords');
$openAddTab.onclick = () => {
  $addTodoSection.classList.toggle('hidden');
  if($addTodoSection.classList.item('hidden') && $addTodoTitle.value === '' && $checkTodoKeyword.children.length === 0) $addTodoBtn.disabled = true
};

const $toggleTodo = document.getElementById('toggleTodo');

// todos 수정

// const $fixBtn = document.querySelector('.fixBtn');
// $fixBtn.onclick = () => {
//   $addTodoSection.classList.toggle('hidden'); 
// };

// 할 일(li) 클릭 시 창 아래로 길게 펼쳐지는 것  
$todos.onclick = ({ target }) => {
  if (!target.matches('.todo') && !target.matches('.todoExplain') && !target.matches('.todoTitle') && !target.matches('p')) return;
  if (target.matches('.todo')) {
    target.lastElementChild.classList.toggle('hidden');
    // target.querySelector(".toggleTodo").classList.toggle('hidden');
  } else if (target.matches('.todoExplain')) {
    target.nextElementSibling.classList.toggle('hidden');
  } else {
    target.parentNode.nextElementSibling.classList.toggle('hidden');
  }
};

// todos 삭제
const $delBtn = document.querySelector('.delBtn');
const delBtn = ({target}) => {
  if (!target.matches('.todo > .toggleTodo > .delBtn')) return;

  localStorage.removeItem(target.parentNode.parentNode.id);
  render();
};
$todos.addEventListener('click', delBtn);

// todos 완료체크

const $completeBtn = document.querySelector('.completeBtn');
const completeBtn = ({ target }) => {
  if (!target.matches('.todo > .toggleTodo > .completeBtn')) return;
  let todoObject = JSON.parse(localStorage.getItem(target.parentNode.parentNode.id));
  console.log(todoObject)
  todoObject.todoCompleted = true;
  let todoJson = JSON.stringify(todoObject);
  localStorage.setItem(target.parentNode.parentNode.id,todoJson);
  render()
};
$todos.addEventListener('click', completeBtn);
