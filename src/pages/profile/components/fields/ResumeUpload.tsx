import { FileText, Upload } from "lucide-react";

const ResumeUpload = ({
  resume,
  setResume,
  onUpload,
}: {
  resume: File | null;
  setResume: (f: File | null) => void;
  onUpload?: (file: File) => void;
}) => (
  <div className="space-y-3">
    <label className="text-sm font-medium text-gray-700">Resume</label>

    <label className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 px-6 py-8 bg-gray-50 hover:bg-sky-50 cursor-pointer transition">
      {resume ? (
        <>
          <FileText className="text-sky-600" />
          <span className="text-sm truncate max-w-[150px]">{resume.name}</span>
        </>
      ) : (
        <>
          <Upload className="text-sky-500" />
          <span className="text-sm text-gray-500">Click to upload resume</span>
        </>
      )}
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => setResume(e.target.files?.[0] ?? null)}
      />
    </label>

    <button
      onClick={() => resume && onUpload?.(resume)}
      className="w-full rounded-xl py-2.5 text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition"
    >
      {resume ? "Replace Resume" : "Upload Resume"}
    </button>
  </div>
);

export default ResumeUpload;
