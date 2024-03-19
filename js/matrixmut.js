function matrixmut(a,b){
    let result = [];

    for(let i = 0;i<2;i++){
        result[i] = [];
        for (let j = 0; j < 2; j++){
            result[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j];
        }
    }
    return result;

}
let vector1 = [[1,2],[3,4]];
let vector2 = [[5,6],[7,8]];
let result = matrixmut(vector1,vector2);
console.log("結果為:",result);