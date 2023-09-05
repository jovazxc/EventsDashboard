
function reverseString(text) {

    const reversed = text.split(' ').map(w =>
       w.split("").reverse().join("")
    ).join(" ")
    
    return reversed
  }

const rev = reverseString("Hello World Jovanny")
console.log(rev)