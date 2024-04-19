function vectoradd(a,b){
    let result = [];
    for(let i = 0;i<a.length;i++){
        result.push(a[i]+b[i]);
    }
    return result;
}
let vector1 = [1,2,3];
let vector2 = [4,5,6];
let result = vectoradd(vector1,vector2);
console.log("結果:",result);