import { useEffect, useState } from "react";
const PracticalExperienceForm = ({
  onAddExperience,
  initialData,
  onSaveEdit,
}) => {
  const [experience, setExperience] = useState(
    initialData || { compny: "", role: "", startDate: "", endDate: "" }
  );
  useEffect(() => {
    if (initialData) {
      setExperience(initialData);
    }
  }, [initialData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSaveEdit) {
      onSaveEdit(experience);
    } else {
      onAddExperience(experience);
    }
    setExperience({ compny: "", role: "", startDate: "", endDate: "" });
  };
  return (
    <form onSubmit={handleSubmit} classNae="form">
      <div>
        <label>Company:</label>
        <input
          type="text"
          name="company"
          value={experience.company}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={experience.role}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={experience.startDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={experience.endDate}
          onChange={handleChange}
        />
      </div>
      <button type="submit">
        {onSaveEdit ? "Save Changes" : "Add Experience"}
      </button>
    </form>
  );
};

export default PracticalExperienceForm;
