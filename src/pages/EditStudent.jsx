import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosFetch } from "../services/api";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axiosFetch.get(`/students/${id}`);
        const student = res.data;

        setForm({
          ...student,
          dob: student?.dob ? student.dob.split("T")[0] : "",
        });
        setPreview(res.data.photoUrl); // show existing image
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    setForm({ ...form, photo: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    await axiosFetch.put(`/students/${id}`, data);

    navigate("/");
  };

  if (loading)
    return (
      <div className="loading-page">
        <p className="">Loading...</p>
      </div>
    );

  return (
    <div className="container">
      <div className="form-card">
        <button className="back-btn" onClick={() => navigate("/")}>
          Back
        </button>

        <h2>Edit Student</h2>

        <form onSubmit={handleSubmit}>
          {/* IMAGE PREVIEW */}
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
            value={form.name || ""}
            onChange={handleChange}
            placeholder="Name"
          />

          <input
            name="course"
            value={form.course || ""}
            onChange={handleChange}
            placeholder="Course"
          />

          <input
            name="year"
            value={form.year || ""}
            onChange={handleChange}
            placeholder="Year"
          />

          <input
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            name="mobile"
            value={form.mobile || ""}
            onChange={handleChange}
            placeholder="Mobile"
          />

          <input
            type="date"
            name="dob"
            value={form.dob}
            onClick={(e) => e.target.showPicker && e.target.showPicker()}
            onChange={handleChange}
          />

          <select
            className="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            placeholder="Address"
          />

          <input type="file" onChange={handleFile} />

          <button className="submit-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
