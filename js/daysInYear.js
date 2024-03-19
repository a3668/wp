function daysInYear(year){
    if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0 ){
        return true;
    }
    return false;
}
let year1 = daysInYear(2024);
if(year1)console.log("366");
else console.log("365")