let todos = [
  {
    id: 1,
    todoTitle: '첫번째타이틀',
    todoCompleted: false,
    todoImportance: 0,
    todoDeadLine: '2020/06/09/15:00',
    todoKeyword: '#work #test',
    todoContents: 'this is todo content'
  },{
    id: 2,
    todoTitle: '두번째타이틀',
    todoCompleted: false,
    todoImportance: 0,
    todoDeadLine: '2020/06/09/12:00',
    todoKeyword: '#abc #fff',
    addTodoContents: 'test test testtest'
  }
];

(function (){
  // State
  let keywords = [];
  let importance = 0;

  // Doms
  const $todos = document.querySelector('.todos');

  const $addTodoSection = document.querySelector('.addTodoSection');
  const $addTodoSectionForm = document.querySelector('.addTodoSection > form');
  const $addTodoTitle = document.querySelector('.addTodoTitle');

  const $checkTodoKeywords = document.querySelector('.checkTodoKeywords');
  const $checkTodoKeyword = document.querySelector('.checkTodoKeyword');
  const $addTodoKeyword = document.querySelector('.addTodoKeyword');

  const $addTodoImportance = document.querySelector('.addTodoImportance');
  const $addTodoContents = document.querySelector('.addTodoContents');

  const $addTodoYear = document.querySelector('.addTodoYear');
  const $addTodoMonth = document.querySelector('.addTodoMonth');
  const $addTodoDay = document.querySelector('.addTodoDay');
  const $addTodoHour = document.querySelector('.addTodoHour');
  const $addTodoMinute = document.querySelector('.addTodoMinute');

  const $comfirmDayState = document.querySelector('.comfirmDayState');

  const $addTodoBtnWarp = document.querySelector('.addTodoBtnWarp');
  const $addTodoBtn = document.querySelector('.addTodoBtnWarp > .addBtn');
  const $closePopupBtn = document.querySelector('.addTodoBtnWarp > .closeBtn');

  // Function
  // ----- render todos
  const render = () => {
    const todosKey = Object.keys(localStorage) // 로컬 스토리지 키들로 이루어진 배열
    todosKey.forEach( key => {
      let todosObj = JSON.parse(localStorage.getItem(key));
      let html = '';
        html += `
        <li class="todo" id="${todosObj.id}">
          <div class="todoExplain">
            <h3 class="todoTitle">${todosObj.todoTitle}</h3>
            <p class="todoCompleted">${todosObj.todoCompleted}</p>
            <p class="todoImportance">${todosObj.todoImportance}</p>
            <p class="todoDeadLine">${todosObj.todoDeadLine}</p>
            <p class="todoKeyword">${todosObj.todoKeyword}</p>
          </div>
          <div class="hidden toggleTodo" id="toggleTodo">
            <p class="todoContents">${todosObj.todoContents}</p>
            <button class="fixBtn icon-pencil"></button>
            <button class="delBtn icon-trash-empty"></button>
            <button class="completeBtn icon-ok"></button>
          </div>
        </li>`;
      // console.log(todos);
      $todos.innerHTML += html;
    })
  };


  // ----- Add todo
  const addTodo = () => {
    let addTodoObject;
    addTodoObject = {
      id: genterateId(),
      todoTitle: $addTodoTitle.value,
      todoCompleted: false,
      todoImportance: importance,
      todoDeadLine: `${addTodoYear.value}/${addTodoMonth.value}/${addTodoDay.value}/${addTodoHour.value}:${addTodoMinute.value}`,
      todoKeyword: addTodoKeywords(),
      todoContents: $addTodoContents.value,
    }
    localStorage.setItem(`${genterateId()}`,JSON.stringify(addTodoObject));
    
    
    // keywords = '';
    if ($addTodoTitle.value === '') {
      $addTodoTitle.focus();
      $addTodoTitle.setAttribute('placeholder', '!!!!!빈칸없이 입력해주세요.');
      return false;
    } else if ($addTodoContents.value === '') {
      $addTodoContents.focus();
      $addTodoContents.setAttribute('placeholder', '!!!!!빈칸없이 입력해주세요.');
      return false;
    }
    
    $addTodoSectionForm.reset();
    importance = 0;

    render();
  }; 

  // ----- Generate Id
  const genterateId = () => {
    return (todos.length) ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  };

  // ----- Check Todo Keyword
  const checkTodoKeyword = (keyword) => {
    let addKeywords = (keywords.length < 3) ? keywords = [...keywords, keyword] : keywords;
    
    let keywordsHtml = '';
    console.log(addKeywords);
    addKeywords.forEach(addkeyword => {
      keywordsHtml += `<button class="checkTodoKeyword">${addkeyword}</button>`
    });
    $checkTodoKeywords.innerHTML = keywordsHtml;
  };

  // ----- Add Todo Keywords
  const addTodoKeywords = () => {
    return keywords.join(' ');
  };

  // Event Handler
  window.onload = render();

  // ----- Add Keyword 
  $addTodoKeyword.onkeyup = e => {
    if (e.keyCode !== 13) return;
    checkTodoKeyword(`#${$addTodoKeyword.value}`);
    $addTodoKeyword.value = '';
  };

  // ----- Click Add Button
  $addTodoBtn.onclick = () => {
    addTodo();
    $addTodoTitle.setAttribute('placeholder', '제목을 입력해주세요(7자 이내)');
    $addTodoContents.setAttribute('placeholder', '할 일을 설명해주세요!');
    [...$addTodoImportance.children].forEach((button) => {
        button.innerHTML = '☆';
    });
    $checkTodoKeywords.innerHTML = '';
    $closePopupBtn.click();
  };

  // ---- Click Keyword in popup
  $checkTodoKeywords.onclick = (e) => {
    // e.target.par
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
    importance = +e.target.id;
  };

  $closePopupBtn.onclick = (e) => {
    $addTodoSection.classList.add('hidden');
  };
})();