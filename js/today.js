const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
const todayDayShow = document.querySelector(".today-date-show div");
const todayPlusPlanUi = document.querySelector(".today-plusplan-ui");
const buttonTodayPlusPlanUiOpen = document.querySelector("#today-plus-open");
const buttonTodayPlusPlanUiClose = document.querySelector(".today-plusplan-ui h1 button");
const buttonTodayDeletePlanUiOpen = document.querySelector("#today-del-all-open");
const todayDeletePlanUi = document.querySelector(".today-delete-ui");
const buttonTodayDeletePlanUiClose = document.querySelector(".today-delete-ui span");

function splitTime(timeStr) {
    const [period, time] = timeStr.split(" ");
    const [hour, minute] = time.split(":").map(Number); 

    return {
        period,  
        hour,    
        minute 
    };
}

let menuForEdit = null;
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
    menuForEdit = null;
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


// if(todayPlanDetail.value === null){
//     alert("계획 내용을 입력해 주세요");
//     return;
// }

function sortListByStartTime() {
    const list = document.querySelector(".today-lists ul");
    const items = Array.from(list.getElementsByTagName("li"));

    items.sort((a, b) => {
        const startTimeA = a.querySelector("p").textContent.split("~")[0].trim();
        const startTimeB = b.querySelector("p").textContent.split("~")[0].trim();

        // AM/PM 시간을 24시간제로 변환하여 분으로 계산
        const parseTime = (timeStr, period) => {
            const [hour, minute] = timeStr.split(":").map(Number);
            let adjustedHour = hour;

            if (period === "PM" && hour !== 12) {
                adjustedHour += 0;
            } else if (period === "AM" && hour === 12) {
                adjustedHour += 12;
            }

            return adjustedHour * 60 + minute; // 시간을 분 단위로 변환
        };

        const timeA = parseTime(startTimeA.split(" ")[1], document.querySelector(".today-check-important input").value);
        const timeB = parseTime(startTimeB.split(" ")[1], document.querySelector(".today-check-important input").value);

        return timeA - timeB; // 시간 빠른 순으로 정렬
    });

    items.forEach(item => list.appendChild(item));
}

let orderCounter = 0;
function sortListByOrder() {
    const list = document.querySelector(".today-lists ul");
    const items = Array.from(list.getElementsByTagName("li"));

    items.sort((a, b) => {
        const orderA = parseInt(a.getAttribute("data-order"), 10);
        const orderB = parseInt(b.getAttribute("data-order"), 10);

        return orderA - orderB; 
    });

    items.forEach(item => list.appendChild(item));
}
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
    if(todayPlanDetail.value === ""){
        alert("계획 내용을 입력해 주세요");
        return;
    }
    if (!isNaN(todayPlanTimeStartValue.value) && todayPlanTimeStartValue.value >= 1 && todayPlanTimeStartValue.value <= 12) {
        if (!(todayPlanTimeEndValue.value >= 1 && todayPlanTimeEndValue.value <= 12)) {
            target.preventDefault();
            alert("정수 1~12사이에 값을 입력해 주세요");
            return;
        }
    } else {
        target.preventDefault();
        alert("정수 1~12사이에 값을 입력해 주세요");
        return;
    }
    
    if (!isNaN(todayPlanTimeStartValueSecond.value) && todayPlanTimeStartValueSecond.value >= 0 && todayPlanTimeStartValueSecond.value <= 60) {
        if (!(todayPlanTimeEndValueSecond.value >= 0 && todayPlanTimeEndValueSecond.value <= 60)) {
            target.preventDefault();
            alert("정수 0~60사이에 값을 입력해 주세요");
            return;
        }
    } else {
        target.preventDefault();
        alert("정수 0~60사이에 값을 입력해 주세요");
        return;
    }
    
    if (todayPlanTimeStartType.value === "PM" && todayPlanTimeEndType.value === "AM") {
        target.preventDefault();
        alert("오늘 계획은 오늘 안에 실행 가능해야합니다.");
        return;
    }

    const startTimeA = [todayPlanTimeStartType.value, todayPlanTimeStartValue.value,todayPlanTimeStartValueSecond.value];
    const startTimeB = [todayPlanTimeEndType.value, todayPlanTimeEndValue.value, todayPlanTimeEndValueSecond.value];

    function convertToMinutesFromArray(timeArray) {
        let period = timeArray[0];
        let hours = parseInt(timeArray[1]); 
        let minutes = parseInt(timeArray[2]); 
    

        if (period === "AM") {
            if (hours === 12) {  
                hours = 0;
            }
        } else if (period === "PM") {
            if (hours !== 12) {  
                hours += 12;
            }
        }

        return hours * 60 + minutes;
    }

    if(convertToMinutesFromArray(startTimeA) > convertToMinutesFromArray(startTimeB)){
        alert("끝나는 시간이 시작 시간보다 빠릅니다");
        return;
    }
    //Statements for check if values are available
    
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
            <button data-action = "edit">수정</button>
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
        saveListState(ulElement);
    });
    todayNewPlan.querySelector("div button:nth-of-type(2)").addEventListener("click", () =>{
        todayNewPlan.remove();
        saveListState(ulElement);
    });
    
    todayNewPlan.setAttribute("data-order", orderCounter++);
    HandlePlusPlanCloseButtonClick();
  

    //the codes for plus Plans
    todayNewPlan.querySelector("div button:first-of-type").addEventListener("click", (event) => {
        ButtonOfplanInfo.innerText = "확인 및 수정";
        todayPlusPlanUi.querySelector("h1").innerHTML = `계획 수정하기<button><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></button>`;
        const todayPlusPlanInputs = document.querySelector(".today-input-group");
        todayPlusPlanInputs.querySelector("input").value = todayNewPlan.querySelector("h1").innerText;
        let TimeA = todayNewPlan.querySelector("p").textContent.split("~")[0].trim();
        let TimeB = todayNewPlan.querySelector("p").textContent.split("~")[1].trim();
        TimeA = splitTime(TimeA); TimeB = splitTime(TimeB);
        document.querySelector(".today-time-inputs-start input:first-of-type").value = TimeA.hour;
        document.querySelector(".today-time-inputs-start input:last-of-type").value = TimeA.minute;
        document.querySelector(".today-time-inputs-end select").value = TimeB.period;
        document.querySelector(".today-time-inputs-end input:first-of-type").value = TimeB.hour;
        document.querySelector(".today-time-inputs-end input:last-of-type").value = TimeB.minute;
        if(todayPlanTypeValue === "개인적인 일"){
            document.querySelector(".today-choose-type").value = "personal";
        }
        else{
            document.querySelector(".today-choose-type").value = "business";
        }
        document.querySelector(".today-time-inputs-start select").value = TimeA.period;
        todayPlusPlanUi.querySelector("h1").addEventListener("click",HandlePlusPlanCloseButtonClick);
        if(!(todayNewPlan.querySelector("p:nth-of-type(4)").classList.contains("hidden"))){
            document.querySelector(".today-check-important input").checked =true;
        }
        ButtonOfplanInfo.addEventListener("click",addPlanByInfo);
        
        HandlePlusPlanOpenButtonClick();
        menuForEdit = todayNewPlan;
        
    });

    if(menuForEdit != null){
        menuForEdit.parentNode.replaceChild(todayNewPlan,menuForEdit);
        ButtonOfplanInfo.innerText = "확인 및 수정";
        todayPlusPlanUi.querySelector("h1").innerHTML = `계획 추가하기<button><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></button>`;
        ButtonOfplanInfo.addEventListener("click",addPlanByInfo);
        todayPlusPlanUi.querySelector("h1").addEventListener("click",HandlePlusPlanCloseButtonClick);
    }
    else{
        PlanOrderlist.appendChild(todayNewPlan);
    }
    if(document.querySelector(".today-setting-ui p select").value === "fast"){
        sortListByStartTime();
    }
    saveListState(ulElement);
    resetInputValuesByClass("today-input-group");
    return;
}



ButtonOfplanInfo.addEventListener("click",addPlanByInfo);
//setInterval(sortListByStartTime,1000);
//Statements for add new plans
//Start of this line, Statements for Setting-Ui and Delete Plans logic

const todaySettingUi = document.querySelector(".today-setting-ui");
const ButtonTodayNavSetting = document.querySelector(".nav-item:nth-of-type(2)");
const quotes = [
    "네 자신을 알라. - 소크라테스",
    "행동없는 꿈은 공허한 환상에 불과하다. - 엘리너 루즈벨트",
    "성공은 열정의 손실 없이 실패에서 실패로 걸어가는 것이다. - 윈스턴 처칠",
    "당신의 시간은 제한적이니, 다른 사람의 삶을 사는 데 낭비하지 마세요. - 스티브 잡스",
    "위대한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것이다. - 스티브 잡스",
    "행복은 매일 새로운 무엇을 배우는 데에서 찾을 수 있다. - 와루치니",
    "꿈을 실현시키기 위해서는 행동하는 것이 가장 중요하다. - 액션 브롤슨",
    "자신의 미래를 예측하는 가장 좋은 방법은 직접 만드는 것이다. - 피터 드러커",
    "성공은 단순한 의지의 연속이다. - 윈스턴 처칠",
    "기다리지 마세요. 시간은 결코 딱 맞을 일이 없을 것이다. - 나폴레온 힐",
    "행복이 성공의 열쇠다. 당신이 하는 일을 사랑한다면, 당신은 성공할 것이다. - 알베르트 슈바이처",
    "최고로 잘하는 것보다 최선을 다하는 것이 중요하다. - 존 우든",
    "가장 어두운 순간일수록 가장 밝은 아이디어가 떠오른다. - 글라디에이터",
    "목표를 향해 꾸준한 노력이 필요하다. - 존 C. 맥스웰",
    "당신이 할 수 있는 일을 당신이 가진 것으로, 당신이 있는 곳에서 하세요. - 테오도어 루즈벨트",
    "당신이 항상 꿈꾸던 것을 쫓아가세요. 그게 바로 당신의 인생의 목표입니다. - 헨리 존스",
    "성공은 항상 과정이자, 결과는 이에 따르는 자연스러운 결과이다. - 토니 로빈스",
    "시간이 중요한 것은 아니지만, 유일한 것이다. - 마일스 데이비스",
    "자신을 알기 전에 다른 사람을 이해하는 것부터 시작하라. - 불명",
    "삶을 사랑하라. 그러면 삶도 너를 사랑할 것이다. - 아서 루빈스타인",
    "최고의 예언은 스스로 만드는 것이다. - 앤드류 카네기"
  ];  

ButtonTodayNavSetting.addEventListener("click",()=>{
    todaySettingUi.classList.remove("hidden");
});

todaySettingUi.querySelector("span").addEventListener("click",()=>{
    todaySettingUi.classList.add("hidden");
});

document.getElementById("today-random-quotes").addEventListener("click", () => {
    document.querySelector(".today-date-show h1").innerText = quotes[Math.floor(Math.random() * quotes.length)];
    saveListStateQuotes(document.querySelector(".today-date-show h1"));
    todaySettingUi.classList.add("hidden");
});

todaySettingUi.querySelector("div button").addEventListener("click",() => {
    const value = todaySettingUi.querySelector("div input").value;
    document.querySelector(".today-date-show h1").innerText = value;
    saveListStateQuotes(document.querySelector(".today-date-show h1"));
    todaySettingUi.classList.add("hidden");
});



//the simple logic for delete plans
document.querySelector(".today-delete-ui button").addEventListener("click",()=>{
    const todayAllPlans = document.querySelectorAll(".today-lists li");
    if(!window.confirm("정말 삭제하시겠습니까?")){
        alert("취소되었습니다");
    }
    alert("삭제되었습니다");
    todayAllPlans.forEach(item => {
        item.remove();
    });
    saveListState(ulElement);
    document.querySelector(".today-delete-ui").classList.add("hidden");
});


document.querySelector(".nav-item:first-of-type").addEventListener("click",()=>{
    location.reload();
})

document.querySelector(".today-setting-ui p select").addEventListener("change", (target) => {
    const selectedValue = target.target.value;
    if(selectedValue === "fast"){
        sortListByStartTime();
        saveListState(ulElement);
    }
    else if(selectedValue === "normal"){
        sortListByOrder();
        saveListState(ulElement);
    }
});