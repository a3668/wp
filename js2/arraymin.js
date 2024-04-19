function arrayMin(arr){
    arr.sort();
    return arr[0];
}

let a = [2,5,6,3,8,3,1,424,546,313,3536,13,];
console.log("最小的那個數字為:",arrayMin(a));