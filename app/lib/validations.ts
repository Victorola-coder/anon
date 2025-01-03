export const validations = {
  username: (username: string) => {
    if (!username.trim()) {
      return { isValid: true, message: "" };
    }
    const usernameRegex = /^[a-zA-Z0-9]{3,8}$/;
    return {
      isValid: usernameRegex.test(username),
      message:
        "must be 3-8 characters long and contain only letters and numbers and no whitespace / special characters",
    };
  },

  password: (password: string) => {
    if (!password.trim()) {
      return { isValid: true, message: "" };
    }
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&.]/.test(password);
    const hasMinLength = password.length >= 8;

    const isValid =
      hasLowercase &&
      hasUppercase &&
      hasNumber &&
      hasSpecialChar &&
      hasMinLength;

    let message = "";
    if (!isValid) {
      const missing = [];
      if (!hasLowercase) missing.push("lowercase");
      if (!hasUppercase) missing.push("uppercase");
      if (!hasNumber) missing.push("number");
      if (!hasSpecialChar) missing.push("special character (@$!%*?&.)");
      if (!hasMinLength) missing.push("minimum 8 characters");
      message = `Password needs: ${missing.join(", ")}`;
    }

    return { isValid, message };
  },

  age: (age: number) => {
    if (!age) {
      return { isValid: true, message: "" };
    }
    return {
      isValid: age >= 18,
      message: "You must be 18 or older",
    };
  },
};
