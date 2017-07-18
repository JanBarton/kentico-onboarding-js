const generateId = () => {
  return generateIdPart() + generateIdPart() + '-'
    + generateIdPart() + '-'
    + generateIdPart() + '-'
    + generateIdPart() + '-'
    + generateIdPart() + generateIdPart() + generateIdPart();
};

const generateIdPart = () => {
  let sGuid = '';
  for (let i = 0; i < 4; i++) {
    sGuid += Math.floor(Math.random() * 0xF).toString(0xF);
  }
  return sGuid;
};

export { generateId };
