const generateIdPart = (): string => {
  let sGuid = '';
  for (let i = 0; i < 4; i++) {
    sGuid += Math.floor(Math.random() * 0xF).toString(0xF);
  }
  return sGuid;
};

const generateId = (): Guid =>
generateIdPart() + generateIdPart() + '-'
+ generateIdPart() + '-'
+ generateIdPart() + '-'
+ generateIdPart() + '-'
+ generateIdPart() + generateIdPart() + generateIdPart();

export { generateId };
