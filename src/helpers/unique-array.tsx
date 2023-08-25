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

