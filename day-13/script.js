const fs = require("fs")
const readData = () => {
   const data = fs
     .readFileSync("./input13.txt", "utf-8")
     .split(/\r?\n\r?\n/)
     .map(line => line.split(/\r?\n/).map(part => JSON.parse(part)))

   return data
 }

 const main = () => {
   const pairs = readData()

   const compare = ([left, right]) => {
     if ([left, right].every(Number.isInteger)) {
       if (left < right) return true
       if (left > right) return false
       return
     }

     if ([left, right].every(Array.isArray)) {
       for (let i = 0; i < Math.min(left.length, right.length); i++) {
         const res = compare([left[i], right[i]])
         if (res != null) return res
       }

       return compare([left.length, right.length])
     }

     return compare([[left].flat(), [right].flat()])
   }

   const res = pairs.reduce(
     (acc, el, index) => acc + (compare(el) ? index + 1 : 0),
     0
   )

   console.log(res)
 }

 main()

