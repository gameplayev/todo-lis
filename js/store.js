const ulElement = document.querySelector(".today-lists ul");

// ul 상태 저장 함수
function saveListState(ulElement) {
    const ulState = {
        htmlContent: ulElement.innerHTML, 
    };

    localStorage.setItem(`ulState:${ulElement.id}`, JSON.stringify(ulState));
}

function restoreULState(ulElement) {
    const savedState = localStorage.getItem(`ulState:${ulElement.id}`);
    if(savedState === null){
        return;
    }
    try {
        const state = JSON.parse(savedState);
        ulElement.innerHTML = state.htmlContent; 
    } catch (error) {
        console.error("Failed to parse saved state:", error);
    }
}

function saveListStateQuotes(ulElement) {
    const quotesState = {
        htmlContent: ulElement.innerHTML, 
    };

    localStorage.setItem(`quotesState:${ulElement.id}`, JSON.stringify(quotesState));
}

function restoreULStateQuotes(ulElement) {
    const savedState = localStorage.getItem(`quotesState:${ulElement.id}`);
    if(savedState === null){
        return;
    }
    try {
        const state = JSON.parse(savedState);
        ulElement.innerHTML = state.htmlContent; 
    } catch (error) {
        console.error("Failed to parse saved state:", error);
    }
}

// 페이지 로드 시 ul 상태 복원
document.addEventListener('DOMContentLoaded', () => {
    const ulElement = document.querySelector(".today-lists ul");
    restoreULState(ulElement); 
    restoreULStateQuotes(document.querySelector(".today-date-show h1"));
    ulElement.querySelectorAll("li").forEach(item =>{
        item.querySelector("div button:first-of-type").addEventListener("click", (event) => {
            ButtonOfplanInfo.innerText = "확인 및 수정";
            todayPlusPlanUi.querySelector("h1").innerHTML = `계획 수정하기<button><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></button>`;
            const todayPlusPlanInputs = document.querySelector(".today-input-group");
            todayPlusPlanInputs.querySelector("input").value = item.querySelector("h1").innerText;
            let TimeA = item.querySelector("p").textContent.split("~")[0].trim();
            let TimeB = item.querySelector("p").textContent.split("~")[1].trim();
            TimeA = splitTime(TimeA); TimeB = splitTime(TimeB);
            document.querySelector(".today-time-inputs-start input:first-of-type").value = TimeA.hour;
            document.querySelector(".today-time-inputs-start input:last-of-type").value = TimeA.minute;
            document.querySelector(".today-time-inputs-end select").value = TimeB.period;
            document.querySelector(".today-time-inputs-end input:first-of-type").value = TimeB.hour;
            document.querySelector(".today-time-inputs-end input:last-of-type").value = TimeB.minute;
            
            if(item.querySelector(".today-choose-type").value === "개인적인 일"){
                document.querySelector(".today-choose-type").value = "personal";
            }
            else{
                document.querySelector(".today-choose-type").value = "business";
            }
            if(!(item.querySelector("p:nth-of-type(4)").classList.contains("hidden"))){
                document.querySelector(".today-check-important input").checked =true;
            }
            document.querySelector(".today-time-inputs-start select").value = TimeA.period;
            todayPlusPlanUi.querySelector("h1").addEventListener("click",HandlePlusPlanCloseButtonClick);
            ButtonOfplanInfo.addEventListener("click",addPlanByInfo);
            HandlePlusPlanOpenButtonClick();
            menuForEdit = item;
        
        });
        
        item.querySelector("div button:nth-of-type(3)").addEventListener("click",() => {
            if(item.querySelector("div button:nth-of-type(3)").innerText === "완료 취소"){
                item.querySelector("div button:nth-of-type(3)").innerText = "계획 완료"
                item.querySelector("p:nth-of-type(3)").innerText = "현재 상태: 진행중";
                if(item.querySelector("div span").innerText === "중요한 일"){
                    item.classList.add("today-plan-important");
                }
                item.classList.remove("today-plan-complete");
            }
            else{
                if(item.classList.contains("today-plan-important")){
                   item.classList.remove("today-plan-important");
                }
                item.classList.add("today-plan-complete");
                item.querySelector("p:nth-of-type(3)").innerText = "현재 상태: 완료";
                item.querySelector("div button:nth-of-type(3)").innerText = "완료 취소";
            }
            saveListState(ulElement);
        });
        item.querySelector("div button:nth-of-type(2)").addEventListener("click", () =>{
            item.remove();
            saveListState(ulElement);
        });
    });
    return;
});


