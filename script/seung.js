const $nowYearMonth = document.querySelector(".nowYearMonth");
const $nowTime = document.querySelector(".nowTime");
const $nowDate = document.querySelector(".nowDate > span");
const calDate = () => {
  if (moment().format("ddd") === "Mon") return "월"
  if (moment().format("ddd") === "Tue") return "화"
  if (moment().format("ddd") === "wed") return "수"
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
  todosKey.forEach( key => {
    if( JSON.parse(localStorage.getItem(key)).todoCompleted === false && Date.parse(JSON.parse(localStorage.getItem(key)).todoDeadLine) <= Date.parse(`${moment().format("YYYY/MM/DD/HH:mm")}:00`)){
      let checkLi = document.getElementById(`${JSON.parse(localStorage.getItem(key)).id}`)
      // JSON.parse(localStorage.getItem(key)).
      checkLi.classList.add("completed");
      checkLi.querySelector(".todoCompleted").innerHTML="완료";
      todoObject.todoCompleted = true;
      let todoJson = JSON.stringify(todoObject);
      localStorage.setItem(target.parentNode.parentNode.id,todoJson);
    }

  })
}
const $addTodoForm = document.querySelector(".addTodoForm");

setInterval(setFirstView,1000)

window.onload= () => {
  setFirstView();
  render();
}
$addTodoForm.onkeydown = e => {
  if(e.keyCode === 13) e.preventDefault();
}

const $addTodoYear = document.querySelector("#addTodoYear");
const $addTodoMonth = document.querySelector("#addTodoMonth");
const $addTodoDay = document.querySelector("#addTodoDay");
const $addTodoHour = document.querySelector("#addTodoHour");
const $addTodoMinute = document.querySelector("#addTodoMinute");

const $day30 = document.querySelector("#addTodoDay option[value='30']");
const $day29 = document.querySelector("#addTodoDay option[value='29']");
const $day28 = document.querySelector("#addTodoDay option[value='28']");
const $comfirmDayState = document.querySelector(".comfirmDayState");
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