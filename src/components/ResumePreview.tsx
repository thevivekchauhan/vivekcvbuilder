import { ResumeData, ColorTheme } from "./ResumeBuilder";
import { Badge } from "@/components/ui/badge";

interface ResumePreviewProps {
  resumeData: ResumeData;
  theme: ColorTheme;
}

const themeStyles = {
  navy: {
    primary: "bg-slate-800 text-white",
    secondary: "bg-gray-100 text-gray-800",
    accent: "text-slate-800",
    border: "border-slate-200",
  },
  blue: {
    primary: "bg-blue-600 text-white",
    secondary: "bg-blue-50 text-blue-900",
    accent: "text-blue-600",
    border: "border-blue-200",
  },
  green: {
    primary: "bg-emerald-600 text-white",
    secondary: "bg-emerald-50 text-emerald-900",
    accent: "text-emerald-600",
    border: "border-emerald-200",
  },
  purple: {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-50 text-purple-900",
    accent: "text-purple-600",
    border: "border-purple-200",
  },
  sunset: {
    primary: "bg-orange-500 text-white",
    secondary: "bg-orange-50 text-orange-900",
    accent: "text-orange-500",
    border: "border-orange-200",
  },
  rose: {
    primary: "bg-rose-600 text-white",
    secondary: "bg-rose-50 text-rose-900",
    accent: "text-rose-600",
    border: "border-rose-200",
  },
  sky: {
    primary: "bg-sky-500 text-white",
    secondary: "bg-sky-50 text-sky-900",
    accent: "text-sky-500",
    border: "border-sky-200",
  },
  teal: {
    primary: "bg-teal-600 text-white",
    secondary: "bg-teal-50 text-teal-900",
    accent: "text-teal-600",
    border: "border-teal-200",
  },
  amber: {
    primary: "bg-amber-500 text-white",
    secondary: "bg-amber-50 text-amber-900",
    accent: "text-amber-500",
    border: "border-amber-200",
  },
  cyan: {
    primary: "bg-cyan-600 text-white",
    secondary: "bg-cyan-50 text-cyan-900",
    accent: "text-cyan-600",
    border: "border-cyan-200",
  },
  pink: {
    primary: "bg-pink-600 text-white",
    secondary: "bg-pink-50 text-pink-900",
    accent: "text-pink-600",
    border: "border-pink-200",
  },
  indigo: {
    primary: "bg-indigo-600 text-white",
    secondary: "bg-indigo-50 text-indigo-900",
    accent: "text-indigo-600",
    border: "border-indigo-200",
  },
  stone: {
    primary: "bg-stone-600 text-white",
    secondary: "bg-stone-50 text-stone-900",
    accent: "text-stone-600",
    border: "border-stone-200",
  },
  zinc: {
    primary: "bg-zinc-700 text-white",
    secondary: "bg-zinc-100 text-zinc-900",
    accent: "text-zinc-700",
    border: "border-zinc-200",
  },
  fuchsia: {
    primary: "bg-fuchsia-600 text-white",
    secondary: "bg-fuchsia-50 text-fuchsia-900",
    accent: "text-fuchsia-600",
    border: "border-fuchsia-200",
  },
  violet: {
    primary: "bg-violet-600 text-white",
    secondary: "bg-violet-50 text-violet-900",
    accent: "text-violet-600",
    border: "border-violet-200",
  },
  yellow: {
    primary: "bg-yellow-400 text-black",
    secondary: "bg-yellow-50 text-yellow-900",
    accent: "text-yellow-500",
    border: "border-yellow-200",
  },
  red: {
    primary: "bg-red-600 text-white",
    secondary: "bg-red-50 text-red-900",
    accent: "text-red-600",
    border: "border-red-200",
  }
};

export const ResumePreview = ({ resumeData, theme }: ResumePreviewProps) => {
  const styles = themeStyles[theme];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg print:shadow-none" id="resume-content">
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[800px]">
        {/* Left Column */}
        <div className={`${styles.primary} p-6 md:p-8`}>
          {/* Profile Photo */}
          {resumeData.personalInfo.photo && (
            <div className="mb-6 flex justify-center">
              <img
                src={resumeData.personalInfo.photo}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          )}

          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Contact</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="opacity-90">{resumeData.personalInfo.email}</p>
              </div>
              <div>
                <p className="opacity-90">{resumeData.personalInfo.phone}</p>
              </div>
              <div>
                <p className="opacity-90">{resumeData.personalInfo.location}</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Skills</h3>
            <div className="space-y-2">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="bg-white bg-opacity-20 rounded px-3 py-1 text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className={`text-3xl md:text-4xl font-bold ${styles.accent} mb-2`}>
              {resumeData.personalInfo.fullName}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{resumeData.personalInfo.title}</p>
          </div>

          {/* Summary */}
          {resumeData.summary && (
            <div className="mb-8">
              <h2 className={`text-xl font-bold ${styles.accent} mb-3 uppercase tracking-wide`}>
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-xl font-bold ${styles.accent} mb-4 uppercase tracking-wide`}>
                Experience
              </h2>
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <p className={`font-medium ${styles.accent} mb-1`}>{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div>
              <h2 className={`text-xl font-bold ${styles.accent} mb-4 uppercase tracking-wide`}>
                Education
              </h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className={`font-medium ${styles.accent} mb-1`}>{edu.institution}</p>
                    <p className="text-sm text-gray-500 mb-2">{edu.year}</p>
                    {edu.description && (
                      <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
