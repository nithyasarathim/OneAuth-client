export interface RegisterState{
    email: string;
    otp: string;
    password: string;
    confirmPassword: string;
    step: number;
    isLoading: boolean;
}