// 추가 버튼 클릭 시 폼 띄우기
const $openAddTab = document.querySelector('.openAddTab');
// const $addTodoSection = document.querySelector('.addTodoSection');

$openAddTab.onclick = () => {
    $addTodoSection.classList.toggle('hidden');
  };
// 할 일(li) 클릭 시 창 아래로 길게 펼쳐지는 것

// const $todos = document.querySelector('.todos');
const $toggleTodo = document.getElementById('toggleTodo');

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

// todos 수정
// const $fixBtn = document.querySelector('.fixBtn');
// $fixBtn.onclick = () => {
//   $addTodoSection.classList.toggle('hidden'); 
// };
// todos 삭제
const delBtn = id => {
  todos = todos.filter(todo => todo.id !== +id);
};
$delBtn.onclick = ({ target }) => {
  // if(!target.matches('.toggleTodo > .delBtn')) return;
  delBtn(target.parentNode.parentNode.id);
  console.log(target.parentNode.parentNode.id)
  render();
};
// todos 완료체크
// const $completeBtn = document.querySelector('.completeBtn');
// $completeBtn.onclick = () => {

// };
