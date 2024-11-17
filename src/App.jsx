import { useState } from "react";
import Header from "./header";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import PracticalExperienceForm from "./PracticalExperienceForm";
import jsPDF from "jspdf";
const App = () => {
  const [personalInfo, setPersonalInfo] = useState({});

  const handlePersonalInfoSave = (info) => {
    setPersonalInfo(info);
  };
  const [educationList, setEducationList] = useState([]);
  const handleAddEducation = (education) => {
    setEducationList((prev) => [...prev, education]);
  };
  const [editIndex, setEditIndex] = useState(null);
  const handleEditEducation = (index) => {
    setEditIndex(index); // Track the index being edited
  };
  const handleSaveEdit = (updatedEducation) => {
    setEducationList((prev) =>
      prev.map((edu, index) => (index === editIndex ? updatedEducation : edu))
    );
    setEditIndex(null); // Exit edit mode
  };
  const handleDeleteEducation = (index) => {
    setEducationList((prev) => prev.filter((_, i) => i !== index));
  };
  const [experienceList, setExperienceList] = useState([]);
  const [editExperienceIndex, setEditExperienceIndex] = useState(null);
  const handleAddExperience = (experience) => {
    setExperienceList((prev) => [...prev, experience]);
  };
  const handleEditExperience = (index) => {
    setEditExperienceIndex(index); // Track index of entry being edited
  };
  const handleSaveEditExperience = (updatedExperience) => {
    setExperienceList((prev) =>
      prev.map((exp, index) =>
        index === editExperienceIndex ? updatedExperience : exp
      )
    );
    setEditExperienceIndex(null); // Exit edit mode
  };

  const handleDeleteExperience = (index) => {
    setExperienceList((prev) => prev.filter((_, i) => i !== index));
  };
  const handleDownload = () => {
    const pdf = new jsPDF();

    // Select the content to save as PDF
    const content = document.getElementById("cv-preview");

    pdf.html(content, {
      callback: (doc) => {
        doc.save("cv.pdf"); // Saves the file with the name 'cv.pdf'
      },
      x: 10,
      y: 10,
      html2canvas: {
        scale: 0.25, // Adjust scaling for better resolution
      },
    });
  };

  return (
    <div className="container">
      <Header />
      <PersonalInfoForm onSave={handlePersonalInfoSave} />
      <div className="preview">
        <h2>Preview:</h2>
        <p>Name: {personalInfo.name}</p>
        <p>Email: {personalInfo.email}</p>
        <p>Phone: {personalInfo.phone}</p>
      </div>
      <EducationForm
        onAddEducation={handleAddEducation}
        initialData={editIndex !== null ? educationList[editIndex] : null}
        onSaveEdit={editIndex !== null ? handleSaveEdit : null}
      />
      <div className="preview">
        <h3>Education:</h3>
        {educationList.map((edu, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <p>School: {edu.school}</p>
            <p>Degree: {edu.degree}</p>
            <p>Year: {edu.year}</p>
            <button onClick={() => handleEditEducation(index)}>Edit</button>
            <button onClick={() => handleDeleteEducation(index)}>Delete</button>
          </div>
        ))}
      </div>
      <PracticalExperienceForm
        onAddExperience={handleAddExperience}
        initialData={
          editExperienceIndex !== null
            ? experienceList[editExperienceIndex]
            : null
        }
        onSaveEdit={
          editExperienceIndex !== null ? handleSaveEditExperience : null
        }
      />
      <div className="preview">
        <h3>Practical Experience:</h3>
        {experienceList.map((exp, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <p>Company: {exp.company}</p>
            <p>Role: {exp.role}</p>
            <p>Start Date: {exp.startDate}</p>
            <p>End Date: {exp.endDate}</p>
            <button onClick={() => handleEditExperience(index)}>Edit</button>
            <button onClick={() => handleDeleteExperience(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleDownload}>Download as PDF</button>
      <div id="cv-preview">
        <h3>Personal Info: </h3>
        <p>Name: {personalInfo.name}</p>
        <p>Email: {personalInfo.email}</p>
        <p>Phone: {personalInfo.phone}</p>

        <h3>Education:</h3>
        {educationList.map((edu, index) => (
          <div key={index}>
            <p>School: {edu.school}</p>
            <p>Degree: {edu.degree}</p>
            <p>Year: {edu.year}</p>
          </div>
        ))}
        <h3>Practical Experience:</h3>
        {experienceList.map((exp, index) => (
          <div key={index}>
            <p>Company: {exp.company}</p>
            <p>Role: {exp.role}</p>
            <p>Start Date: {exp.startDate}</p>
            <p>End Date: {exp.endDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
