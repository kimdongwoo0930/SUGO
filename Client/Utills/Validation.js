const Idpattern = /^\d{8}$/;

const passwordpattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/;

const emailPattern = /@suwon\.ac\.kr$/;

const username_Validation = (name) => {
  return name.length < 2 || name.trim() === "" ? false : true;
};

const studentId_Validation = (Id) => {
  return Idpattern.test(Id) ? true : false;
};

const password_Validation = (password) => {
  return passwordpattern.test(password) ? true : false;
};

const email_Validation = (email) => {
  return emailPattern.test(email) ? true : false;
};

export {
  username_Validation,
  studentId_Validation,
  password_Validation,
  email_Validation,
};
