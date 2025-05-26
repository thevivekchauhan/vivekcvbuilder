
import { useState } from "react";
import { ResumeData } from "./ResumeBuilder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Plus, X } from "lucide-react";

interface ResumeFormProps {
  resumeData: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

export const ResumeForm = ({ resumeData, onUpdate }: ResumeFormProps) => {
  const [newSkill, setNewSkill] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string>("");

  const updatePersonalInfo = (field: string, value: string) => {
    onUpdate({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value }
    });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPhotoPreview(result);
        updatePersonalInfo("photo", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      onUpdate({
        ...resumeData,
        skills: [...resumeData.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    onUpdate({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index)
    });
  };

  const addEducation = () => {
    onUpdate({
      ...resumeData,
      education: [...resumeData.education, {
        degree: "",
        institution: "",
        year: "",
        description: ""
      }]
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onUpdate({ ...resumeData, education: newEducation });
  };

  const removeEducation = (index: number) => {
    onUpdate({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index)
    });
  };

  const addExperience = () => {
    onUpdate({
      ...resumeData,
      experience: [...resumeData.experience, {
        position: "",
        company: "",
        duration: "",
        description: ""
      }]
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onUpdate({ ...resumeData, experience: newExperience });
  };

  const removeExperience = (index: number) => {
    onUpdate({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          {/* Photo Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {photoPreview || resumeData.personalInfo.photo ? (
                    <img
                      src={photoPreview || resumeData.personalInfo.photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <Label htmlFor="photo" className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </span>
                    </Button>
                  </Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  value={resumeData.personalInfo.title}
                  onChange={(e) => updatePersonalInfo("title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo("location", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeSkill(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write a brief summary of your professional background..."
                value={resumeData.summary}
                onChange={(e) => onUpdate({ ...resumeData, summary: e.target.value })}
                rows={5}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Education {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input
                    value={edu.year}
                    onChange={(e) => updateEducation(index, "year", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(index, "description", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button onClick={addEducation} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          {resumeData.experience.map((exp, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Experience {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Position</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input
                    value={exp.duration}
                    onChange={(e) => updateExperience(index, "duration", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button onClick={addExperience} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};
