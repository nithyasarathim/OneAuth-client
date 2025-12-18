import { Github, Linkedin } from "lucide-react";

const ProfileCard = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 space-y-4 text-center">
      <img
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&auto=format&fit=crop"
        alt="Profile"
        className="w-32 h-32 mx-auto rounded-full object-cover shadow-sm"
      />

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">john.doe</h1>
        <p className="text-sm text-gray-500">Engineering Department</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
          <span className="text-sm text-gray-600">john.doe@company.com</span>
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            Available
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <IconButton icon={Github} label="GitHub" />
        <IconButton icon={Linkedin} label="LinkedIn" />
        <button className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-600 transition shadow-sm">
          View Resume
        </button>
      </div>

      <section className="bg-white/60 rounded-2xl px-6 py-3 text-left">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
        <p className="leading-relaxed text-gray-600">
          Full-stack engineer focused on building scalable web platforms and
          shared identity systems. Experienced with modern JavaScript
          frameworks, API design, and secure authentication flows.
        </p>
      </section>

      <section className="bg-white rounded-2xl px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 text-left">
          Skills
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "React",
            "Node.js",
            "TypeScript",
            "OAuth / SSO",
            "PostgreSQL",
            "REST APIs",
            "GraphQL",
            "Tailwind CSS",
            "Docker",
            "CI/CD",
            
          ].map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-sky-100 text-sky-700 text-sm px-3 py-1"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </section>
  );
};

const IconButton = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => {
  return (
    <div className="relative group">
      <button className="inline-flex items-center justify-center rounded-xl bg-white/70 px-3 py-2 hover:bg-white transition shadow-sm">
        <Icon size={18} />
      </button>
      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
        {label}
      </span>
    </div>
  );
};

export default ProfileCard;
