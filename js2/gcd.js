function gcd(a,b){
    if(b == 0)return a;
    else return gcd(b,a%b); 
}

console.log(gcd(5,6));
console.log(gcd(68,6));