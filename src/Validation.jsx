export const emailValidation = (email) => {
  const mailformat = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  console.log('email');
  return mailformat.test(email);
};

export const passValidation = (pass) => {
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]{7,}$/;
  return passRegex.test(pass);
};

export const passText = [
  'LOWER_CASE',
  'UPPER_CASE',
  'ONE_NUMBER',
  'SPECIAL_CHAR',
  'CHAR_COUNT',
];
