export const getPasswordRuleStatus = (password: string) => ({
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /\d/.test(password),
  special: /[^A-Za-z0-9]/.test(password),
});

export const validatePassword = (password: string) =>
  Object.values(getPasswordRuleStatus(password)).every(Boolean);
