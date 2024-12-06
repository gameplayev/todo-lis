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

function resetInputValuesByClass(className) {
 
    const parentElement = document.querySelector(`.${className}`);
    
    if (parentElement) {
        const inputs = parentElement.querySelectorAll('input, select, textarea');
        
        inputs.forEach(element => {
            if (element.type === 'checkbox' || element.type === 'radio') {
                element.checked = false;
            } else if (element.tagName === 'SELECT') {
                element.selectedIndex = 0;
            } else {
                element.value = '';
            }
        });
    }
    return;
}


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


//start of next-line, handle about Plan-add functions

const ButtonOfplanInfo = document.querySelector(".today-comfirm-add");

function addPlanByInfo(target){
    const todayPlanDetail = document.querySelector(".today-plan-input");
    const todayPlanTimeStart = document.querySelector(".today-time-inputs-start");
    const todayPlanTimeEnd = document.querySelector(".today-time-inputs-end");
    const todayPlanType = document.querySelector(".today-choose-type");
    const todayPlanImportant = document.querySelector(".today-check-important input");
    const todayPlanTimeStartType = todayPlanTimeStart.querySelector("select");
    const todayPlanTimeStartValue = todayPlanTimeStart.querySelector("input:first-of-type");
    const todayPlanTimeEndType = todayPlanTimeEnd.querySelector("select");
    const todayPlanTimeEndValue = todayPlanTimeEnd.querySelector("input:first-of-type");
    const todayPlanTimeStartValueSecond = todayPlanTimeStart.querySelector("input:nth-of-type(2)");
    const todayPlanTimeEndValueSecond = todayPlanTimeEnd.querySelector("input:nth-of-type(2)");
    target.preventDefault();
    if(!isNaN(todayPlanTimeStartValue.value) && !(todayPlanTimeStartValue.value === null)){
        if(!(todayPlanTimeStartValue.value >= 1 && todayPlanTimeStartValue.value <= 12)){
            target.preventDefault();
            alert("정수 1~12사이에 값을 입력해 주세요");
            return;
        }
    }
    else{
        target.preventDefault();
        alert("정수 1~12사이에 값을 입력해 주세요");
        return;
    }

    if(!isNaN(todayPlanTimeEndValue.value) && !(todayPlanTimeEndValue.value === null)){
        if(!(todayPlanTimeEndValue.value >= 1 && todayPlanTimeEndValue.value <= 12)){
            target.preventDefault();
            alert("정수 1~12사이에 값을 입력해 주세요");
            return;
        }
    }
    else{
        target.preventDefault();
        alert("정수 1~12사이에 값을 입력해 주세요");
        return;
    }

    if(!isNaN(todayPlanTimeStartValueSecond.value) && !(todayPlanTimeStartValueSecond.value === null)){
        if(!(todayPlanTimeStartValueSecond.value >= 0 && todayPlanTimeStartValueSecond.value <= 60)){
            target.preventDefault();
            alert("정수 0~60사이에 값을 입력해 주세요");
            return;
        }
    }
    else{
        target.preventDefault();
        alert("정수 0~60사이에 값을 입력해 주세요");
        return;
    }

    if(!isNaN(todayPlanTimeEndValueSecond.value) && !(todayPlanTimeEndValueSecond.value === null)){
        if(!(todayPlanTimeEndValueSecond.value >= 0 && todayPlanTimeEndValueSecond.value <= 60)){
            target.preventDefault();
            alert("정수 0~60사이에 값을 입력해 주세요");
            return;
        }
    }
    else{
        target.preventDefault();
        alert("정수 0~60사이에 값을 입력해 주세요");
        return;
    }

    if(todayPlanTimeStartType.value === "PM" && todayPlanTimeEndType.value === "AM"){
        target.preventDefault();
        alert("오늘 계획은 오늘 안에 실행 가능해야합니다.");
        return;
    }


    //Statements for check is values are available
    //to make function check if the plan time could overlap is requried

    const todayNewPlan = document.createElement("li");
    todayNewPlan.classList.add("today-plan");

    let todayPlanTypeValue;
    if(todayPlanType.value === "personal"){
        todayPlanTypeValue = "개인적인 일"
    }
    else{
        todayPlanTypeValue = "비지니스"
    }
    todayNewPlan.innerHTML = `
        <h1>${todayPlanDetail.value}</h1>
        <p>${todayPlanTimeStartType.value} ${todayPlanTimeStartValue.value.padStart(2,"0")}:${todayPlanTimeStartValueSecond.value.padStart(2,"0")} ~ ${todayPlanTimeEndType.value} ${todayPlanTimeEndValue.value.padStart(2,"0")}:${todayPlanTimeEndValueSecond.value.padStart(2,"0")}</p>
        <p>구분: ${todayPlanTypeValue}</p>
        <p>현재 상태: 진행중</p>
        <p class = "hidden" style="font-weight: bold;">!중요한 일!</p>
        <div>
            <button>수정</button>
            <button>삭제</button>
            <button>계획 완료</button>
            <span class = "hidden"></span>
        </div>   
    `;

    const PlanOrderlist = document.querySelector(".today-lists ul");
    if(todayPlanImportant.checked){
        todayNewPlan.classList.add("today-plan-important");
        todayNewPlan.querySelector("p:nth-of-type(4)").classList.remove("hidden");
        todayNewPlan.querySelector("div span").innerText = "중요한 일";
    }
    PlanOrderlist.appendChild(todayNewPlan);
    const todayNewPlanButtonThree = todayNewPlan.querySelector("div button:nth-of-type(3)");
    todayNewPlanButtonThree.addEventListener("click",() => {
        if(todayNewPlanButtonThree.innerText === "완료 취소"){
            todayNewPlanButtonThree.innerText = "계획 완료"
            todayNewPlan.querySelector("p:nth-of-type(3)").innerText = "현재 상태: 진행중";
            if(todayNewPlan.querySelector("div span").innerText === "중요한 일"){
                todayNewPlan.classList.add("today-plan-important");
            }
            todayNewPlan.classList.remove("today-plan-complete");
        }
        else{
            if(todayNewPlan.classList.contains("today-plan-important")){
                todayNewPlan.classList.remove("today-plan-important");
            }
            todayNewPlan.classList.add("today-plan-complete");
            todayNewPlan.querySelector("p:nth-of-type(3)").innerText = "현재 상태: 완료";
            todayNewPlanButtonThree.innerText = "완료 취소";
        }
        
    });
    todayNewPlan.querySelector("div button:nth-of-type(2)").addEventListener("click", () =>{
        todayNewPlan.remove();
    });
    todayNewPlan.querySelector("div button:first-of-type").addEventListener("click", (event) =>{
        
    });

    HandlePlusPlanCloseButtonClick();
    resetInputValuesByClass("today-input-group");

    //the codes for plus Plans

    return;
}


ButtonOfplanInfo.addEventListener("click",addPlanByInfo);