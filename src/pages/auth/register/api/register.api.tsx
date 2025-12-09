export const sendEmailVerification = async (email: string) => {
  await new Promise((r) => setTimeout(r, 1500));
  console.log(email);
  return { success: true };
};

export const verifyOTP = async (email: string, otp: string) => {
  await new Promise((r) => setTimeout(r, 1500));
  console.log(otp);
  return { success: true };
};

export const createAccount = async (email: string, password: string) => {
  await new Promise((r) => setTimeout(r, 1500));
  console.log(email, password);
  return { success: true };
};
