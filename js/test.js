function matrixadd(a,b){
    let result = [];
    result[0] = [];
    // 创建第二行
    result[1] = [];

    result[0][0] = a[0][0] + b[0][0];
    result[0][1] = a[0][1] + b[0][1];
    result[1][0] = a[1][0] + b[1][0];
    result[1][1] = a[1][1] + b[1][1];
    return result;
}
let matrix1 = [[1, 2], [3, 4]];
let matrix2 = [[5, 6], [7, 8]];
let result = matrixadd(matrix1, matrix2);
console.log("矩阵相加结果:", result);