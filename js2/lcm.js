function lcm(a,b){
    return (a*b) / gcd(a,b);

}
function gcd(a,b){
    if(b == 0)return a;
    else return gcd(b,a%b); 
}
console.log(lcm(5,6));
console.log(lcm(36,6));