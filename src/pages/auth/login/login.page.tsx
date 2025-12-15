import AuthLayout from "../auth.layout";

const LoginPage = () => {
  return (
    <AuthLayout>
      <p className="text-xl font-bold text-center text-gray-900 mb-8 px-6">
        Log in to your Account
      </p>
      <p>Don't have account ? <span>Create an Account</span></p>
    </AuthLayout>
  );
};

export default LoginPage;
