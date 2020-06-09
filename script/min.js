(function (){
    // State
  let todos = [];
  let keywords = [];
  let importance = 0;

  // Doms
  const $todos = document.querySelector('.todos');

  const $addTodoSection = document.querySelector('.addTodoSection');
  const $addTodoTitle = document.querySelector('.addTodoTitle');

  const $addTodoKeyword = document.querySelector('.addTodoKeyword');
  const $checkTodoKeyword = document.querySelector('.checkTodoKeyword');

  const $addTodoImportance = document.querySelector('.addTodoImportance');
  const $addTodoContents = document.querySelector('.addTodoContents');

  const $addTodoYear = document.querySelector('.addTodoYear');
  const $addTodoMonth = document.querySelector('.addTodoMonth');
  const $addTodoDay = document.querySelector('.addTodoDay');
  const $addTodoHour = document.querySelector('.addTodoHour');
  const $addTodoMinute = document.querySelector('.addTodoMinute');

  const $comfirmDayState = document.querySelector('.comfirmDayState');

  const $addTodoBtn = document.querySelector('.addTodoBtnWarp > .addBtn');
  const $closePopupBtn = document.querySelector('.addTodoBtnWarp > .closeBtn');

  // Function
  // ----- render todos
  const render = () => {
    todos = [
      {
        id: 1,
        todoTitle: 'This is title',
        todoCompleted: false,
        todoImportance: 3,
        todoDeadLine: '2020/06/09/12:00',
        todoKeyword: ['keyword01', 'keyword02', 'keyword03'],
        todoContents: 'This is todo contents'
      },{
        id: 2,
        todoTitle: 'This is title02',
        todoCompleted: false,
        todoImportance: 3,
        todoDeadLine: '2020/06/09/12:00',
        todoKeyword: ['keyword01', 'keyword02', 'keyword03'],
        todoContents: 'This is todo contents'
      },
      
    ]
    let html = '';
    todos.forEach((todo) => {
      html += `
      <li class="todo" id="${todo.id}">
        <div class="todoExplain">
          <h3 class="todoTitle">${todo.todoTitle}</h3>
          <p class="todoCompleted">${todo.todoCompleted}</p>
          <p class="todoImportance">${todo.todoImportance}</p>
          <p class="todoDeadLine">${todo.todoDeadLine}</p>
          <p class="todoKeyword">${todo.todoKeyword}</p>
        </div>
        <div class="hidden toggleTodo" id="toggleTodo">
          <p class="todoContents">${todo.todoContents}</p>
          <button class="fixBtn icon-pencil"></button>
          <button class="delBtn icon-trash-empty"></button>
          <button class="completeBtn icon-ok"></button>
        </div>
      </li>`;
    });
    $todos.innerHTML = html;
    
    console.log(todos);
  };


  // ----- Add todo
  const addTodo = () => {
    todos = [...todos, {
      id: genterateId(),
      todoTitle: $addTodoTitle.value,
      todoCompleted: false,
      todoImportance: getTodoImportance(),
      todoDeadLine: `${addTodoYear.value}/${addTodoMonth.value}/${addTodoDay.value}/${addTodoHour.value}:${addTodoMinute.value}`,
      todoKeyword: checkTodoKeyword(),
      todoContents: $addTodoContents.value,
    }];
    keywords = [];
    console.log(todos);
  }; 

  // ----- Generate Id
  const genterateId = () => {
    console.log(todos.map(todo => todo.id));
    return (todos.length) ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  };

  // ----- Add Keyword 
  const getTodoImportance = id => {
    importance = id;
  };

  // ----- Check Todo Keyword
  const checkTodoKeyword = (keyword) => {
    return (keywords.length < 3) ? keywords = [...keywords, keyword] : keywords;
  };
  // Event Handler
  window.onload = render();

  // ----- Add Keyword 
  /* 
    1. input에 키워드를 입력한다.
    2. 키워드를 입력후 엔터를 누르면 추가된다.
    3. 3개가 넘어가면 return한다.
    4. 키워드를 누르면 삭제한다.
  */

  // li의 id와, todo의 id 비교후 맞으면 todo의 keyword에 push 해주기
  $addTodoKeyword.onkeyup = e => {
    if (e.keyCode !== 13) return;
    checkTodoKeyword($addTodoKeyword.value);
    $addTodoKeyword.value = '';
  };

  $addTodoBtn.onclick = () => {
    addTodo();
  };

  // ----- importance
  $addTodoImportance.onclick = (e) => {
    if (e.target.matches('div')) return;
    [...$addTodoImportance.children].forEach((button, index) => {
      if (index + 1 <= e.target.id) {
        button.innerHTML = '★';
      } else {
        button.innerHTML = '☆';
      }
    });
    getTodoImportance(e.target.id);
  };
})();