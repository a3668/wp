function weekday(str){
    let week = {"Sunday":0,"Monday":1,"Tuesday":2,"wenesday":3,"Thursday":4,"Friday":5,"Saturday":6};
    return week[str];
}
console.log(weekday("Sunday"));
console.log(weekday("Tuesday"));