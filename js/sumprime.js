function isPrime(n){
    for(let i = 2;i < n;i++){
        if(n%i==0)return false
    }
    return true
}
function printsumPrime(n){
    let sum = 0
    for(let i = 2;i<n;i++){
        if(isPrime(i))sum+=i
    }
    console.log(sum)
}
printsumPrime(10)
