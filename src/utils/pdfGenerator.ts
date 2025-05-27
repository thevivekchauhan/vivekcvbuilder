import { ResumeData, ColorTheme } from "@/components/ResumeBuilder";
import html2pdf from 'html2pdf.js';

export const generatePDF = async (resumeData: ResumeData, theme: ColorTheme, includePhoto: boolean = true) => {
  const themeStyles = {
    navy: {
      primary: "#1e293b",
      secondary: "#f1f5f9",
      accent: "#1e293b",
    },
    blue: {
      primary: "#2563eb",
      secondary: "#eff6ff",
      accent: "#2563eb",
    },
    green: {
      primary: "#059669",
      secondary: "#ecfdf5",
      accent: "#059669",
    },
    purple: {
      primary: "#7c3aed",
      secondary: "#f3e8ff",
      accent: "#7c3aed",
    },
  };

  const styles = themeStyles[theme];

  // Create a temporary div to hold our content
  const element = document.createElement('div');
  element.innerHTML = `
    <div class="resume-container">
      <div class="left-column">
        ${includePhoto && resumeData.personalInfo.photo ? `
          <img src="${resumeData.personalInfo.photo}" alt="Profile" class="profile-photo" />
        ` : ''}
        
        <div style="margin-bottom: 40px;">
          <h3 class="section-title left-section-title">Contact</h3>
          <div class="contact-item">${resumeData.personalInfo.email}</div>
          <div class="contact-item">${resumeData.personalInfo.phone}</div>
          <div class="contact-item">${resumeData.personalInfo.location}</div>
        </div>
        
        <div>
          <h3 class="section-title left-section-title">Skills</h3>
          ${resumeData.skills.map(skill => `<div class="skill-item">${skill}</div>`).join('')}
        </div>
      </div>
      
      <div class="right-column">
        <div style="margin-bottom: 40px;">
          <h1 class="name">${resumeData.personalInfo.fullName}</h1>
          <p class="title">${resumeData.personalInfo.title}</p>
        </div>
        
        ${resumeData.summary ? `
          <div style="margin-bottom: 40px;">
            <h2 class="section-title">Professional Summary</h2>
            <p class="summary">${resumeData.summary}</p>
          </div>
        ` : ''}
        
        ${resumeData.experience.length > 0 ? `
          <div style="margin-bottom: 40px;">
            <h2 class="section-title">Experience</h2>
            ${resumeData.experience.map(exp => `
              <div class="experience-item">
                <div class="job-title">${exp.position}</div>
                <div class="company">${exp.company}</div>
                <div class="duration">${exp.duration}</div>
                <div class="description">${exp.description}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${resumeData.education.length > 0 ? `
          <div>
            <h2 class="section-title">Education</h2>
            ${resumeData.education.map(edu => `
              <div class="education-item">
                <div class="degree">${edu.degree}</div>
                <div class="institution">${edu.institution}</div>
                <div class="year">${edu.year}</div>
                ${edu.description ? `<div class="description">${edu.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.5;
      color: #333;
      background: white;
    }
    .resume-container {
      display: flex;
      height: 267mm;
      max-width: 210mm;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
    }
    
    .left-column {
      flex: 1;
      background-color: ${styles.primary};
      color: white;
      padding: 12px 15px;
      position: absolute;
      left: 0;
      top: 0;
      height: 267mm;
      width: 33.33%;
    }
    
    .right-column {
      flex: 2;
      padding: 12px 15px;
      background: white;
      margin-left: 33.33%;
      height: 267mm;
      overflow-y: hidden;
    }
    .profile-photo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid white;
      margin: 0 auto 10px;
      display: ${includePhoto && resumeData.personalInfo.photo ? 'block' : 'none'}
    }
    
    .section-title {
      font-size: 15px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      color: ${styles.accent};
    }
    
    .left-section-title {
      color: white;
      border-bottom: 2px solid rgba(255,255,255,0.3);
      padding-bottom: 3px;
    }
    
    .contact-item {
      margin-bottom: 8px;
      font-size: 13px;
      opacity: 0.9;
    }
    .skill-item {
      padding: 6px 0;
      margin-bottom: 6px;
      font-size: 14px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }
    
    .name {
      font-size: 32px;
      font-weight: bold;
      color: ${styles.accent};
      margin-bottom: 8px;
    }
    
    .title {
      font-size: 18px;
      color: #666;
      margin-bottom: 20px;
    }
    
    .summary {
      margin-bottom: 20px;
      line-height: 1.6;
      color: #555;
    }
    .experience-item, .education-item {
      margin-bottom: 12px;
      border-left: 2px solid ${styles.primary};
      padding-left: 12px;
    }
    
    .job-title, .degree {
      font-size: 16px;
      font-weight: bold;
      color: #333;
      margin-bottom: 4px;
    }
    
    .company, .institution {
      font-weight: 600;
      color: ${styles.accent};
      margin-bottom: 4px;
    }
    
    .duration, .year {
      font-size: 13px;
      color: #666;
      margin-bottom: 6px;
    }
    
    .description {
      color: #555;
      line-height: 1.4;
      font-size: 13px;
    }
  `;

  element.appendChild(style);
  document.body.appendChild(element);
  // Configure PDF options
  const opt = {
    margin: 10,
    filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false,
      windowHeight: 1009,
      height: 1009
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true
    }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  } finally {
    document.body.removeChild(element);
  }
};
