import { useEffect } from "react";

import {
  username_Validation,
  studentId_Validation,
  password_Validation,
  email_Validation,
} from "../Utills/Validation";

const useCheckValidation = (name, studentId, password, email, setEnable) => {
  useEffect(() => {
    if (username_Validation(name)) {
      // 유효성 검사 통과 시 수행할 작업
      setEnable(true);
    }
  }, [name]);
  useEffect(() => {
    if (studentId_Validation(studentId)) {
      // 유효성 검사 통과 시 수행할 작업
      setEnable(true);
    }
  }, [studentId]);
  useEffect(() => {
    if (password_Validation(password)) {
      // 유효성 검사 통과 시 수행할 작업
      setEnable(true);
    }
  }, [password]);
  useEffect(() => {
    if (email_Validation(email)) {
      // 유효성 검사 통과 시 수행할 작업
      setEnable(true);
    }
  }, [email]);
};

export default useCheckValidation;
