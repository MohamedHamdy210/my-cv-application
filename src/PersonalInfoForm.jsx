import { useState } from "react";

const PersonalInfoForm = ({ onSave }) => {
  const [info, setInfo] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(info); // Pass data to the parent
  };

  return (
    <form onSubmit={handleSubmit} classNae="form">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={info.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={info.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={info.phone}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default PersonalInfoForm;
