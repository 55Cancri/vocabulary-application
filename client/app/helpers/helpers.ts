export const generateUuid = () => {
  let d = new Date().getTime()
  if (
    typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
  ) {
    d += performance.now() //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export const compareObjects = (obj1, obj2) => {
  //check for obj2 overlapping props
  if (!Object.keys(obj2).every(key => obj1.hasOwnProperty(key))) return false

  //check every key for being same
  return Object.keys(obj1).every(key => {
    //if object
    if (typeof obj1[key] == 'object' && typeof obj2[key] == 'object')
      //recursively check
      return compareObjects(obj1[key], obj2[key])
    //do the normal compare
    else return obj1[key] === obj2[key]
  })
}

// export const compareObjects = (objectA, objectB, comparisonTemplate) => {
//   console.log('object a', objectA)
//   console.log('object b', objectB)
//   console.log('template', comparisonTemplate)
//   if (!objectA || !objectB) return false

//   let areDifferent = false
//   Object.keys(comparisonTemplate).some(key => {
//     if (typeof comparisonTemplate[key] === 'object') {
//       areDifferent = !compareObjects(
//         objectA[key],
//         objectB[key],
//         comparisonTemplate[key]
//       )
//       return areDifferent
//     } else if (comparisonTemplate[key] === true) {
//       areDifferent = objectA[key] !== objectB[key]
//       return areDifferent
//     } else {
//       return false
//     }
//   })
// }

// export const compareObjects = (obj1, obj2) => {
//   //Loop through properties in object 1
//   for (let p in obj1) {
//     if (p !== 'uid' && p !== 'edited') {
//       //Check property exists on both objects
//       if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false

//       switch (typeof obj1[p]) {
//         //Deep compare objects
//         case 'object':
//           if (!compareObjects(obj1[p], obj2[p])) return false
//           break
//         //Compare function code
//         case 'function':
//           if (
//             typeof obj2[p] == 'undefined' ||
//             (p != 'compare' && obj1[p].toString() != obj2[p].toString())
//           )
//             return false
//           break
//         //Compare values
//         default:
//           if (obj1[p] != obj2[p]) return false
//       }
//     }
//   }

//   //Check object 2 for any extra properties
//   for (let p in obj2) {
//     if (p !== 'uid' && p !== 'edited') {
//       if (typeof obj1[p] == 'undefined') return false
//     }
//   }
//   return true
// }

// function objetcsDeepEqualByTemplate(objectA, objectB, comparisonTemplate) {
//   if (!objectA || !objectB) return false

//   let areDifferent = false
//   Object.keys(comparisonTemplate).some((key) => {
//     if (typeof comparisonTemplate[key] === 'object') {
//       areDifferent = !objetcsDeepEqualByTemplate(objectA[key], objectB[key], comparisonTemplate[key])
//       return areDifferent
//     } else if (comparisonTemplate[key] === true) {
//       areDifferent = objectA[key] !== objectB[key]
//       return areDifferent
//     } else {
//       return false
//     }
//   })
