function matrixadd(a,b){
    let result = [];
    for(let i = 0;i<a.length;i++){
        let row = [];
        for(let j = 0;j<a[i].length;j++){
            row.push(a[i][j] + b[i][j]);
        }
        result.push(row);
    }
    return result;
}
let matrix1 = [[1, 2], [3, 4]];
let matrix2 = [[5, 6], [7, 8]];
let result = matrixadd(matrix1, matrix2);
console.log("矩陣相加结果:", result);