export default function findCommonName(names) {
  const namesWithHypghenRemoved = names.replace(/-/g, "");

  const passedArray = [];

  const namesArray = namesWithHypghenRemoved.split(", ");

  // Find the shortest name in the array and remove both commas and hyphens
  let shortest = namesArray.reduce((a, b) => (a.length <= b.length ? a : b));
  let longestName = namesArray.reduce((a, b) => (a.length >= b.length ? a : b));

  const namesArrayLength = namesArray.length;

  for (let i = 0; i < namesArray.length; i++) {
    const currentName = namesArray[i].toLowerCase();

    if (currentName.includes(shortest.toLowerCase())) {
      passedArray.push(1);
    }
  }

  if (passedArray.length == namesArrayLength) {
    return longestName;
  }
  return names;
}
