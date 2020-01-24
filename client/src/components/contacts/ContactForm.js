import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  useEffect(() => {
    if (contactContext.current !== null) setContact(contactContext.current);
    else {
      setContact({ name: "", phone: "", email: "", type: "personal" });
    }
  }, [contactContext]);
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    type: "personal"
  });

  const { name, email, phone, type } = contact;

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (contactContext.current === null) {
      contactContext.addContact(contact);
    } else {
      contactContext.updateContact(contact);
    }
    contactContext.clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {contactContext.current == null ? "Add Contact" : "Edit Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
        required
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
        required
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />
      Professional{" "}
      <div>
        <input
          type="submit"
          value={
            contactContext.current == null ? "Add Contact" : "Update Contact"
          }
          className="btn btn-primary btn-block"
        />
      </div>
      {contactContext.current && (
        <div>
          <button
            className="btn btn-light btn-block"
            onClick={contactContext.clearCurrent}
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
