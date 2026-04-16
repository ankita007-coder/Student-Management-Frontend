import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosFetch } from "../services/api";

const AddStudent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    course: "",
    year: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    address: "",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  // Handle file upload
  const handleFile = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, photo: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.mobile) {
      newErrors.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = "Must be 10 digits";
    }

    if (!form.year) {
      newErrors.year = "Year is required";
    } else if (form.year < 1 || form.year > 4) {
      newErrors.year = "Year must be 1-4";
    }

    if (!form.dob) newErrors.dob = "DOB is required";
    if (!form.gender) newErrors.gender = "Select gender";

    return newErrors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) data.append(key, form[key]);
      });

      await axiosFetch.post("/students", data);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <button className="back-btn" onClick={() => navigate("/")}>
          Back
        </button>

        <h2>Add Student</h2>

        <form onSubmit={handleSubmit}>
          {/* Image Preview */}
          {preview && (
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #475569",
                }}
              />
            </div>
          )}

          <input
            name="name"
            placeholder="Name *"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            name="course"
            placeholder="Course"
            value={form.course}
            onChange={handleChange}
          />

          <input
            name="year"
            placeholder="Year (1-4) *"
            value={form.year}
            onChange={handleChange}
          />
          {errors.year && <p className="error">{errors.year}</p>}

          <input
            name="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            name="mobile"
            placeholder="Mobile (10 digits) *"
            value={form.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p className="error">{errors.mobile}</p>}

          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            onClick={(e) =>
              e.target.showPicker && e.target.showPicker()
            }
          />
          {errors.dob && <p className="error">{errors.dob}</p>}

          <select
            className="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Gender *</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className="error">{errors.gender}</p>}

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <input type="file" onChange={handleFile} />

          <button className="submit-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;