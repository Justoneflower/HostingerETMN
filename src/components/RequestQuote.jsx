import { useState } from "react";
import emailjs from "emailjs-com";
import Select from "react-select";
import { Country, State } from "country-state-city";
import "./RequestQuote.css";

export default function RequestQuote({ open, onClose }) {

  const countries = Country.getAllCountries()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((country) => ({
      value: country.isoCode,
      label: country.name
    }));

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    state: "",
    message: ""
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* COUNTRY CHANGE */
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setForm({ ...form, country: country.label, state: "" });

    const stateOptions = State.getStatesOfCountry(country.value).map(
      (state) => ({
        value: state.isoCode,
        label: state.name
      })
    );

    setStates(stateOptions);
  };

  /* STATE CHANGE */
  const handleStateChange = (state) => {
    setForm({ ...form, state: state.label });
  };

  /* SEND EMAIL */
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_29iuda8",
      "template_apeuntg",
      form,
      "gqCORoSOYfrwBR8LB"
    )
    .then(() => {
      alert("Quote request sent successfully!");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        state: "",
        message: ""
      });
      setSelectedCountry(null);
      setStates([]);
      onClose();
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send request. Try again.");
    });
  };

  return (
    <div className="quote-overlay">
      <div className="quote-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <h1>Request A Quote</h1>

        <form onSubmit={handleSubmit} className="quote-form">

          <input name="firstName" placeholder="First Name"
            value={form.firstName} onChange={handleChange} required />

          <input name="lastName" placeholder="Last Name"
            value={form.lastName} onChange={handleChange} required />

          <input name="email" type="email" placeholder="Email Address"
            value={form.email} onChange={handleChange} required />

          <input name="phone" placeholder="Phone Number"
            value={form.phone} onChange={handleChange} />

          <input name="company" placeholder="Company"
            value={form.company} onChange={handleChange} />

          {/* COUNTRY DROPDOWN */}
          <Select
            options={countries}
            value={selectedCountry}
            onChange={handleCountryChange}
            placeholder="Select Country"
            isSearchable
          />

          {/* STATE DROPDOWN */}
          <Select
            options={states}
            onChange={handleStateChange}
            placeholder="Select State"
            isSearchable
            isDisabled={!selectedCountry}
          />

          <textarea
            name="message"
            placeholder="Type your query or message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            Request a Quote
          </button>

        </form>
      </div>
    </div>
  );
}