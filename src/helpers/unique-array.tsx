function findUniqueStrings<T>(inputArray: T[]): T[] {
  const uniqueValues: T[] = [];

  for (const value of inputArray) {
    if (!uniqueValues.includes(value)) {
      uniqueValues.push(value);
    }
  }

  return uniqueValues;
}

export default findUniqueStrings;
// const inputArray: string[] = [
//   "apple",
//   "banana",
//   "apple",
//   "orange",
//   "banana",
//   "grape"
// ];
// const uniqueArray: string[] = findUniqueStrings(inputArray);
// console.log(uniqueArray); // Output: ["apple", "banana", "orange", "grape"]
