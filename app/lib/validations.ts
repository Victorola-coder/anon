export const validations = {
  username: (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return {
      isValid: usernameRegex.test(username),
      message: "Please enter a valid email address",
    };
  },

  password: (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return {
      isValid: passwordRegex.test(password),
      message:
        "Password must contain lowercase, uppercase, number, special char, min 8 chars",
    };
  },

  age: (age: number) => ({
    isValid: age >= 18,
    message: "You must be 18 or older",
  }),
};
