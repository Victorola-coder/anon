export const validations = {
  username: (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]{3,8}$/;
    return {
      isValid: usernameRegex.test(username),
      message:
        "Username must be 3-8 characters long and contain only letters and numbers",
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
