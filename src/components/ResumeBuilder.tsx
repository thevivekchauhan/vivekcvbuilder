import { useState } from "react";
import { ResumeForm } from "./ResumeForm";
import { ResumePreview } from "./ResumePreview";
import { ThemeSelector } from "./ThemeSelector";
import { Button } from "@/components/ui/button";
import { Download, Eye, Loader2 } from "lucide-react";
import { generatePDF } from "@/utils/pdfGenerator";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    photo?: string;
  };
  summary: string;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
    description: string;
  }[];
  experience: {
    position: string;
    company: string;
    duration: string;
    description: string;
  }[];
}

export type ColorTheme = "navy" | "blue" | "green" | "purple";

export const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "Vivek Chauhan",
      title: "Software Developer",
      email: "thevivek@gmail.com",
      phone: "+91 9876543210",
      location: "Ahmedabad, Gujarat, India",
    },
    summary:
      "Passionate software developer with 5+ years of experience in building scalable web applications. Skilled in React, TypeScript, and modern web technologies.",
    skills: ["Problem Solving", "Time Management"],
    education: [
      {
        degree: "Bachelor of Computer Science",
        institution: "University of Technology",
        year: "2019",
        description:
          "Graduated Magna Cum Laude with focus on software engineering and web development.",
      },
    ],
    experience: [
      {
        position: "Senior Software Developer",
        company: "Tech Solutions Inc.",
        duration: "2021 - Present",
        description:
          "Lead development of customer-facing web applications serving 10K+ users. Implemented CI/CD pipelines and mentored junior developers.",
      },
    ],
  });

  const [currentTheme, setCurrentTheme] = useState<ColorTheme>("navy");
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async (includePhoto: boolean = true) => {
    try {
      setIsGeneratingPDF(true);
      await generatePDF(resumeData, currentTheme, includePhoto);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Resume Builder</h1>
        <p className="text-gray-600 text-lg">Create a professional resume with live preview</p>
      </div>

      {/* Theme Selector */}
      <div className="mb-6 flex justify-center">
        <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
      </div>

      {/* Action Buttons - Mobile */}
      <div className="lg:hidden mb-6 flex gap-3 justify-center">
        <Button
          onClick={() => setShowMobilePreview(!showMobilePreview)}
          variant="outline"
          size="sm"
        >
          <Eye className="w-4 h-4 mr-2" />
          {showMobilePreview ? "Edit" : "Preview"}
        </Button>
        <Button 
          onClick={() => handleDownloadPDF(true)} 
          size="sm"
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          {isGeneratingPDF ? "Generating..." : "Download PDF"}
        </Button>
      </div>

      {/* Main Content */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Form Section */}
        <div className={`${showMobilePreview ? "hidden lg:block" : "block"}`}>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <ResumeForm resumeData={resumeData} onUpdate={setResumeData} />
          </div>
        </div>

        {/* Preview Section */}
        <div className={`${!showMobilePreview ? "hidden lg:block" : "block"}`}>
          <div className="sticky top-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
                <div className="hidden lg:flex gap-2">
                  <Button
                    onClick={() => handleDownloadPDF(true)}
                    size="sm"
                    disabled={isGeneratingPDF}
                  >
                    {isGeneratingPDF ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    {isGeneratingPDF ? "Generating..." : "Download PDF"}
                  </Button>
                </div>
              </div>
              <ResumePreview resumeData={resumeData} theme={currentTheme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
