import AuthLayout from "../auth.layout";

const SignInPage = () => {

  return (
    <AuthLayout>
      <hr className="border-gray-300 mb-4" />
      <h1 className="text-md text-gray-900 my-5 text-center">Register a user</h1>
      <form className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          required
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-sky-400 outline-none"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          required
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-sky-400 outline-none"
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-md transition-all font-medium"
        >
          Create Account
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignInPage;
