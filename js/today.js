const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
const todayDayShow = document.querySelector(".today-date-show div");
const todayPlusPlanUi = document.querySelector(".today-plusplan-ui");
const buttonTodayPlusPlanUiOpen = document.querySelector("#today-plus-open");
const buttonTodayPlusPlanUiClose = document.querySelector(".today-plusplan-ui h1 button");
const buttonTodayDeletePlanUiOpen = document.querySelector("#today-del-all-open");
const todayDeletePlanUi = document.querySelector(".today-delete-ui");
const buttonTodayDeletePlanUiClose = document.querySelector(".today-delete-ui span");

function curtime() {
    const curDate = new Date();

    const year = curDate.getFullYear();
    const month = curDate.getMonth() + 1; 
    const date = curDate.getDate();
    const day = dayOfWeek[curDate.getDay()];
    const curHour = curDate.getHours();
    const curMinute = curDate.getMinutes();
    const curSecond = curDate.getSeconds();

    let displayHour = curHour % 12 || 12;  
    let period = curHour < 12 ? "오전" : "오후";

    let displayDate = `지금: ${year}년 ${month}월 ${date}일 ${day}요일`;
    displayDate += ` ${period} ${displayHour}시 ${curMinute}분 ${curSecond}초`;
    displayDate += ` KST(UTC+09:00)`;

    todayDayShow.innerText = displayDate;
}
curtime();
setInterval(curtime, 1000);

function HandlePlusPlanOpenButtonClick(){
    todayPlusPlanUi.classList.remove("hidden");
}

function HandlePlusPlanCloseButtonClick(){
    todayPlusPlanUi.classList.add("hidden");
}

function HandleDeletePlanOpenButtonClick(){
    todayDeletePlanUi.classList.remove("hidden");
}

function HandleDeletePlanCloseButtonClick(){
    todayDeletePlanUi.classList.add("hidden");
}

buttonTodayPlusPlanUiOpen.addEventListener("click",HandlePlusPlanOpenButtonClick);
buttonTodayPlusPlanUiClose.addEventListener("click",HandlePlusPlanCloseButtonClick);
buttonTodayDeletePlanUiOpen.addEventListener("click",HandleDeletePlanOpenButtonClick);
buttonTodayDeletePlanUiClose.addEventListener("click",HandleDeletePlanCloseButtonClick);
