// 추가 버튼 클릭 시 폼 띄우기
const $openAddTab = document.querySelector('.openAddTab');
$openAddTab.onclick = () => {
  addState = "add"
  $addTodoSection.classList.toggle('hidden');
};

const $toggleTodo = document.getElementById('toggleTodo');

// todos 수정

$todos.onclick = ({ target }) => {
  if (!target.matches('.todo') && !target.matches('.todoExplain') && !target.matches('.todoTitle') && !target.matches('p')) return;
  if (target.matches('.todo')) {
    target.lastElementChild.classList.toggle('hidden');
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
  todoObject.todoCompleted = !todoObject.todoCompleted;
  let todoJson = JSON.stringify(todoObject);
  localStorage.setItem(target.parentNode.parentNode.id,todoJson);
  render()
};
$todos.addEventListener('click', completeBtn);

// todo 수정
const $fixBtn = document.querySelector("fixBtn");
const fixBtn = ({target}) => {
  if (!target.matches('.todo > .toggleTodo > .fixBtn')) return;
  addState = "fixed";
  fixedId = target.parentNode.parentNode.id;
  let fixingItem = JSON.parse(localStorage.getItem(fixedId));

  // 타이틀세팅
  $addTodoTitle.value = fixingItem.todoTitle;
  
  

  // 키워드 세팅
  keywords = fixingItem.todoKeyword.split(' ')
  let keywordsHtml =""
  keywords.forEach(addkeyword => {
    keywordsHtml += `<button class="checkTodoKeyword">${addkeyword}</button>`
  });
  $checkTodoKeywords.innerHTML = keywordsHtml;
  // 중요도세팅
  importance = fixingItem.todoImportance.length;
  [...$addTodoImportance.children].forEach((button, idx) => {
    if(idx < fixingItem.todoImportance.length){
      button.innerHTML = '★';
    }else {
      button.innerHTML = '☆';
    }
  });
  // 내용 세팅
  $addTodoContents.value = fixingItem.todoContents;
  let fixingItemDeadYear = moment(fixingItem.todoDeadLine).format("YYYY")  
  let fixingItemDeadMonth = moment(fixingItem.todoDeadLine).format("MM")  
  let fixingItemDeadDay = moment(fixingItem.todoDeadLine).format("DD")  
  let fixingItemDeadHour = moment(fixingItem.todoDeadLine).format("HH")  
  let fixingItemDeadMin = moment(fixingItem.todoDeadLine).format("mm")  

  $addTodoYear.querySelector("#addTodoYear option[value='" + fixingItemDeadYear + "']").selected = true;
  $addTodoMonth.querySelector("#addTodoMonth option[value='" + fixingItemDeadMonth + "']").selected = true;
  $addTodoDay .querySelector("#addTodoDay option[value='" + fixingItemDeadDay + "']").selected = true;
  $addTodoHour.querySelector("#addTodoHour option[value='" + fixingItemDeadHour + "']").selected = true;
  $addTodoMinute.querySelector("#addTodoMinute option[value='" + fixingItemDeadMin + "']").selected = true;
  
  $addTodoSection.classList.toggle('hidden');


}
$todos.addEventListener('click',fixBtn)