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
        
        <div class="section">
          <h3 class="section-title left-section-title">Contact</h3>
          <div class="contact-item">${resumeData.personalInfo.email}</div>
          <div class="contact-item">${resumeData.personalInfo.phone}</div>
          <div class="contact-item">${resumeData.personalInfo.location}</div>
        </div>
        
        <div class="section">
          <h3 class="section-title left-section-title">Skills</h3>
          <div class="skills-list">
            ${resumeData.skills.map((skill, index) => `
              <span class="skill-item">${skill}${index < resumeData.skills.length - 1 ? ' •' : ''}</span>
            `).join('')}
          </div>
        </div>
      </div>
      
      <div class="right-column">
        <div class="header">
          <h1 class="name">${resumeData.personalInfo.fullName}</h1>
          <p class="title">${resumeData.personalInfo.title}</p>
        </div>
        
        ${resumeData.summary ? `
          <div class="section">
            <h2 class="section-title">Professional Summary</h2>
            <p class="summary">${resumeData.summary}</p>
          </div>
        ` : ''}
        
        ${resumeData.experience.length > 0 ? `
          <div class="section">
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
          <div class="section">
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
    }
    
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.4;
      color: #333;
      background: white;
    }
    
    .resume-container {
      display: flex;
      width: 210mm;
      min-height: 296mm;
      max-height: 296mm;
      margin: 0;
      background: white;
      overflow: hidden;
    }
    
    .left-column {
      width: 70mm;
      background-color: ${styles.primary};
      color: white;
      padding: 20px 15px;
    }
    
    .right-column {
      width: 140mm;
      padding: 20px;
      background: white;
    }
    
    .section {
      margin-bottom: 12px;
    }
    
    .header {
      margin-bottom: 12px;
    }
    
    .profile-photo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid white;
      margin: 0 auto 12px;
      display: ${includePhoto && resumeData.personalInfo.photo ? 'block' : 'none'}
    }
    
    .section-title {
      font-size: 13px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      color: ${styles.accent};
    }
    
    .left-section-title {
      color: white;
      border-bottom: 1px solid rgba(255,255,255,0.3);
      padding-bottom: 3px;
      margin-bottom: 8px;
    }
    
    .contact-item {
      margin-bottom: 4px;
      font-size: 11px;
      opacity: 0.9;
    }
    
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      line-height: 1.2;
    }
    
    .skill-item {
      color: white;
      font-size: 11px;
      opacity: 0.9;
    }
    
    .name {
      font-size: 22px;
      font-weight: bold;
      color: ${styles.accent};
      margin-bottom: 4px;
      line-height: 1.2;
    }
    
    .title {
      font-size: 14px;
      color: #666;
      margin-bottom: 12px;
    }
    
    .summary {
      font-size: 11px;
      line-height: 1.3;
      color: #555;
      margin-bottom: 4px;
    }
    
    .experience-item, .education-item {
      margin-bottom: 10px;
      border-left: 2px solid ${styles.primary};
      padding-left: 8px;
    }
    
    .experience-item:last-child, .education-item:last-child {
      margin-bottom: 0;
    }
    
    .job-title, .degree {
      font-size: 13px;
      font-weight: bold;
      color: #333;
      margin-bottom: 2px;
      line-height: 1.2;
    }
    
    .company, .institution {
      font-weight: 600;
      color: ${styles.accent};
      margin-bottom: 2px;
      font-size: 12px;
    }
    
    .duration, .year {
      font-size: 11px;
      color: #666;
      margin-bottom: 3px;
    }
    
    .description {
      color: #555;
      line-height: 1.3;
      font-size: 11px;
    }
  `;

  element.appendChild(style);
  document.body.appendChild(element);

  // Configure PDF options
  const opt = {
    margin: 0,
    filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
    pagebreak: { mode: ['avoid-all'] },
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: { 
      scale: 1,
      useCORS: true,
      logging: false,
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
      windowWidth: 794,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4',
      orientation: 'portrait',
      compress: true,
      precision: 16
    }
  };

  try {
    // Generate and download PDF
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  } finally {
    // Clean up
    document.body.removeChild(element);
  }
};
