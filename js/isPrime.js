function isPrime(n){
    for(let i = 2;i < n;i++){
        if(n%i==0)return false
    }
    return true
}
console.log('isPrime(5)=',isPrime(5))
console.log('isPrime(6)=',isPrime(6))

function printisPrime(n){
    for(let i = 2;i<n;i++){
        if(isPrime(i))console.log(i,'is a prime')
    }
}
printisPrime(1000)