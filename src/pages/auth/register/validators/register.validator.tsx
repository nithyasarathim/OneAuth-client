export const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
}

export const validateOTP = (otp: string) => {
    return otp.length === 4;
}

export const validatePassword = (password: string, confirmPassword: string) => {
    if (password.length <= 6) return false;
    if (password != confirmPassword) return false;
    return true;
}
