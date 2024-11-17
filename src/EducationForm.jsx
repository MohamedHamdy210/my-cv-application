import { useState, useEffect } from "react";

const EducationForm = ({ onAddEducation, initialData, onSaveEdit }) => {
  const [education, setEducation] = useState(
    initialData || { school: "", degree: "", year: "" }
  );

  useEffect(() => {
    if (initialData) {
      setEducation(initialData); // Pre-fill form when editing
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveEdit) {
      onSaveEdit(education); // Save the edited entry
    } else {
      onAddEducation(education); // Add a new entry
    }
    setEducation({ school: "", degree: "", year: "" }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <label>School Name:</label>
        <input
          type="text"
          name="school"
          value={education.school}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Degree:</label>
        <input
          type="text"
          name="degree"
          value={education.degree}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="text"
          name="year"
          value={education.year}
          onChange={handleChange}
        />
      </div>
      <button type="submit">
        {onSaveEdit ? "Save Changes" : "Add Education"}
      </button>
    </form>
  );
};

export default EducationForm;
