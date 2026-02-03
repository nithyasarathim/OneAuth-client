export const getForgetPasswordRuleStatus = (password: string) => ({
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /\d/.test(password),
  special: /[^A-Za-z0-9]/.test(password),
});

export const validateForgetPassword = (password: string) =>
  Object.values(getForgetPasswordRuleStatus(password)).every(Boolean);
