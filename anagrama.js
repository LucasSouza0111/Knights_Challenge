let palavra1= "amor";
let palavra2= "roma";

function anagramas(p1, p2) {
    const palavraMap = {};	
    for (let i of p1) {
        if(!(i in palavraMap)) palavraMap[i] = 0;
        palavraMap[i] +=1;  
    }

    for(let i of p2) {
        if(i in palavraMap) {
            palavraMap[i] -=1;
        }
        else{
            return false;
        }
    }

    for (let i in palavraMap) {
        if (palavraMap[i] !==0) return false
    }
    
    return true
}

const isAnagrama= anagramas(palavra1,palavra2);

console.log(`${palavra1} é anagrama de ${palavra2} ? ${isAnagrama}`);