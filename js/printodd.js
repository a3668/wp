function odd(n){
    if(n % 2 == 0){
        return false
    }
    return true
}
function printodd(n){
    for(let i = 1;i<n;i++){
        if(odd(i))console.log(i,'是奇數')
    }
}
printodd(100)