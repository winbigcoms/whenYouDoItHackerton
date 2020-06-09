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
        todoTitle: 'This is title',
        todoCompleted: false,
        todoImportance: 3,
        todoDeadLine: '2020/06/09/12:00',
        todoKeyword: ['keyword01', 'keyword02', 'keyword03'],
        todoContents: 'This is todo contents'
      }
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
        <div>
          <p class="todoContents">${todo.todoContents}</p>
          <button class="fixBtn"></button>
          <button class="delBtn"></button>
          <button class="completeBtn"></button>
        </div>
      </li>`;
    });
    $todos.innerHTML = html;
  };


  // ----- Add todo
  const addTodo = () => {
    todos = [...todos, {
      id: 1,
      todoTitle: $addTodoTitle.value,
      todoCompleted: false,
      todoImportance: $addTodoImportance.value,
      todoDeadLine: `${addTodoYear.value}/${addTodoMonth.value}/${addTodoDay.value}/${addTodoHour.value}:${addTodoMinute.value}`,
      todoKeyword: keywords.split(''),
      todoContents: $addTodoContents.value,
    }];
    keywords = [];
    // todos = [...todos, {
    //   id: 1,
    //   todoTitle: '',
    //   todoCompleted: false,
    //   todoImportance: 0,
    //   todoDeadLine: `${addTodoYear.value}/${addTodoMonth.value}/${addTodoDay.value}/${addTodoHour.value}:${addTodoMinute.value}`,
    //   todoKeyword: [],
    //   todoContents: '',
    // }]; 
  }; 

  // ----- Fix todo
  /*
  const fixTodo = (id) => {
    todos.map(todo => {
      if (id !== todo.id) return;
      todos = [...todos, {
        id: 1,
        todoTitle: $addTodoTitle.value,
        todoCompleted: false,
        todoImportance: $addTodoImportance.value,
        todoDeadLine: `${addTodoYear.value}/${addTodoMonth.value}/${addTodoDay.value}/${addTodoHour.value}:${addTodoMinute.value}`,
        todoKeyword: $addTodoKeyword.value,
        todoContents: $addTodoContents.value,
      }];
    }); 
  };
  */

  // ----- Add Keyword 
  const checkTodoKeyword = () => {
    // if (keywords.length > 3) keywords.;
    // console.log(keywords);
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
    // todos.map(todo => {
    //   if (todos.)
    // });
    checkTodoKeyword();
    // if (keywords.length > 3) return;
    if (keywords.length < 3) keywords += $addTodoKeyword.value;
    $addTodoKeyword.value = '';
  };

  $addTodoBtn.onclick = () => {
    addTodo();
    console.log(todos);
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
  };
})();