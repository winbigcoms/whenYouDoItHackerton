const $nowYearMonth = document.querySelector(".nowYearMonth");
const $nowTime = document.querySelector(".nowTime");
const $nowDate = document.querySelector(".nowDate > span");
const calDate = () => {
  if (moment().format("ddd") === "Mon") return "월"
  if (moment().format("ddd") === "Tue") return "화"
  if (moment().format("ddd") === "Wed") return "수"
  if (moment().format("ddd") === "Thu") return "목"
  if (moment().format("ddd") === "Fir") return "금"
  if (moment().format("ddd") === "Sat") return "토"
  if (moment().format("ddd") === "Sun") return "일"
}

// 현재 시간 랜더링
const setFirstView = () => {
  $nowYearMonth.innerHTML = moment().format("YYYY/MM/DD");
  $nowTime.innerHTML = moment().format("HH:mm");
  $nowDate.innerHTML = calDate();
  if(localStorage.length === 0) return;
  let todosKey = Object.keys(localStorage);
}
const $addTodoForm = document.querySelector(".addTodoForm");

setInterval(setFirstView,1000)
const  checkDone = () => {  
  if(localStorage.length === 0) return;
  Object.keys(localStorage).forEach( key => {
    let todo = JSON.parse(localStorage.getItem(key));
    
    if( todo.todoCompleted === false && Date.parse(todo.todoDeadLine+":00") < Date.now()){
      let fixTodo = {...todo, ...{todoCompleted:false , todoDeadLine : "실패ㅠㅠ"}}
      localStorage.setItem(key,JSON.stringify(fixTodo));
      render();
      // document.getElementById(`${key}`).classList.add("fali");
    }
  })
}
setInterval(checkDone,60000);

window.onload= setFirstView;
window.addEventListener("load",render);
$addTodoForm.onkeydown = e => {
  if(e.keyCode === 13)e.preventDefault();
}

const $day30 = document.querySelector("#addTodoDay option[value='30']");
const $day29 = document.querySelector("#addTodoDay option[value='29']");
const $day28 = document.querySelector("#addTodoDay option[value='28']");
const isTimeOk = () => {
  let year = $addTodoYear.value;
  let month = $addTodoMonth.value;
  let day = $addTodoDay.value;
  let hour = $addTodoHour.value;
  let min = $addTodoMinute.value;
// 윤년
  let fullDeadline = year + month + day + hour + min
  if(((+year % 4 === 0 && +year % 100 !== 0) || +year % 400 === 0) && +month === 2) {
    +$addTodoDay.value> 29 ? $day29.selected = true : "";
    $comfirmDayState.innerHTML = "윤년의 2월은 29일까지랍니다"
  }else if(!((+year % 4 === 0 && +year % 100 !== 0) || +year % 400 === 0) && +month === 2){
    +$addTodoDay.value> 28 ? $day28.selected = true : "";
    $comfirmDayState.innerHTML = "2월은 28일까지랍니다"
  }

  if( +month === 4 || +month === 6 || +month ===9 || +month === 11) {
    +$addTodoDay.value > 30 ? $day30.selected = true : "";
    $comfirmDayState.innerHTML = `${+month}월은 30일까지 밖에 없어요~`
  }
  if ( moment().format("YYYYMMDDHHmm") > fullDeadline) {
    $comfirmDayState.innerHTML = `미래의 시간을 설정해주세요`;
    $addTodoBtn.disabled = true
  } else {
    $addTodoBtn.disabled = false
  }
}
$addTodoYear.onblur = isTimeOk;
$addTodoMonth.onblur = isTimeOk;
$addTodoDay.onblur = isTimeOk;