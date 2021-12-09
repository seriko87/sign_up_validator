export const emailValidation = (email) => {
  const mailformat = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  console.log('email');
  return mailformat.test(email);
};

export const passValidation = (pass) => {
  let length = false;
  if (pass.length < 6) {
    return true;
  }

  return true;
};

export const formValidation = (email, pass, rePass, password) => {
  if (pass && email) {
    if (rePass === password) {
      return true;
    }
  }
  return false;
};

export const passText = [
  'Must be at least one lower case',
  'Must be at leaset one upper case',
  'Must be at least one digit',
  'Must be at least one special character',
  'Must be at least 7 characters',
];
