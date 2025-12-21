const ProfileAbout = ({ description }: { description?: string }) => {
  const text =
    description ||
    "No description added yet. Tell others about your role, experience, and interests.";

  return (
    <section className="bg-white/60 rounded-2xl px-6 py-3 text-left">
      <h2
        className={`text-lg font-semibold mb-3 ${
          description ? "text-gray-900" : "text-gray-400"
        }`}
      >
        About
      </h2>
      <p
        className={`leading-relaxed ${
          description ? "text-gray-600" : "text-gray-400"
        }`}
      >
        {text}
      </p>
    </section>
  );
};

export default ProfileAbout;
