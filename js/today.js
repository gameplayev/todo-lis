const dayOfWeek = ["일", "월","화","수","목","금","토"];
const todayDayShow = document.querySelector(".today-date-show div");

function curtime(){
    const curDate = new Date();
    let displayDate = `지금: ${curDate.getFullYear()}년 ${curDate.getMonth()+1}월 ${curDate.getDate()}일 ${dayOfWeek[curDate.getDay()]}요일`
    const curHour = curDate.getHours();
    let displayHour = curHour%12;
    if(displayHour === 0){
        displayHour = 12;
    }

    if(curHour < 12){
        displayDate += ` 오전 ${displayHour}시`
    }
    else{
        displayDate += ` 오후 ${displayHour}시`
    }
    
    todayDayShow.innerText = displayDate;
}

setTimeout(curtime,500);