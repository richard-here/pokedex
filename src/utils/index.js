const toTitleCase = (name) => {
  let shouldCapitalize = true;
  const { length } = name;
  let titleCaseName = '';
  for (let i = 0; i < length; i += 1) {
    const letter = shouldCapitalize ? name[i].toUpperCase() : name[i];
    titleCaseName = titleCaseName.concat(letter);
    shouldCapitalize = letter === ' ';
  }
  return titleCaseName;
};

const padNumber = (number, size) => {
  let num = number.toString();
  while (num.length < size) num = `0${num}`;
  return num;
};

export { toTitleCase, padNumber };
