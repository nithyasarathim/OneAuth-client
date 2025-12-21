const ProfileSkills = ({ skills }: { skills?: string[] }) => {
  const list = skills && skills.length ? skills : ["Not specified"];

  return (
    <section className="bg-white rounded-2xl px-6 py-4">
      <h2
        className={`text-lg font-semibold mb-4 text-left ${
          list[0] !== "Not specified" ? "text-gray-900" : "text-gray-400"
        }`}
      >
        Skills
      </h2>

      <div className="flex flex-wrap gap-2">
        {list.map((skill, i) => (
          <span
            key={i}
            className={`rounded-full px-3 py-1 text-sm ${
              skill !== "Not specified"
                ? "bg-sky-100 text-sky-700"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default ProfileSkills;
