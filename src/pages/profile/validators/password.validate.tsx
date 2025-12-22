export const passwordRules = {
  length: (v: string) => v.length >= 8,
  uppercase: (v: string) => /[A-Z]/.test(v),
  lowercase: (v: string) => /[a-z]/.test(v),
  number: (v: string) => /\d/.test(v),
  special: (v: string) => /[^A-Za-z0-9]/.test(v),
};

export const validatePassword = (password: string) =>
  Object.values(passwordRules).every((rule) => rule(password));

export const getPasswordRuleStatus = (password: string) => ({
  length: passwordRules.length(password),
  uppercase: passwordRules.uppercase(password),
  lowercase: passwordRules.lowercase(password),
  number: passwordRules.number(password),
  special: passwordRules.special(password),
});
