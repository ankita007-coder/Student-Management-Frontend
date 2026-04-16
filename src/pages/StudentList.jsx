import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosFetch } from "../services/api";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");

  const [page, setPage] = useState(1);
  const [visibleImageId, setVisibleImageId] = useState(null);

  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await axiosFetch.get(
        `/students?search=${search}&course=${course}&year=${year}&page=${page}&limit=5`,
      );

      setStudents(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search, page, course, year]);

  const handleDelete = async (id) => {
    try {
      await axiosFetch.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Student List</h2>

      {/* FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          flexWrap: "wrap",
        }}
      >
        {/* Search */}
        <input
          className="search-box"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        {/* Course Filter */}
        <select
          className="filters"
          value={course}
          onChange={(e) => {
            setPage(1);
            setCourse(e.target.value);
          }}
        >
          <option value="">All Courses</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electronics">Electronics</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Civil Engineering">Civil Engineering</option>
        </select>

        {/* Year Filter */}
        <select
          className="filters"
          value={year}
          onChange={(e) => {
            setPage(1);
            setYear(e.target.value);
          }}
        >
          <option value="">All Years</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        {/* Reset */}
        <button
          onClick={() => {
            setSearch("");
            setCourse("");
            setYear("");
            setPage(1);
          }}
        >
          Reset
        </button>
      </div>

      {/* ADD BUTTON */}
      <button className="add-btn" onClick={() => navigate("/add")}>
        Add Student
      </button>

      {/* TABLE */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Course</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>

          {loading ? (
            <tbody>
              <tr>
                <td colSpan="5" align="center">
                  Loading students...
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {students.length > 0 ? (
                students.map((s) => (
                  <tr key={s.id}>
                    {/* PHOTO */}
                    <td>
                      {s.photoUrl ? (
                        visibleImageId === s.id ? (
                          <div>
                            <img src={s.photoUrl} alt="student" />
                            <br />
                            <button
                              onClick={() => setVisibleImageId(null)}
                              style={{ marginTop: "5px" }}
                            >
                              Hide
                            </button>
                          </div>
                        ) : (
                          <span
                            style={{
                              color: "#3b82f6",
                              cursor: "pointer",
                              fontWeight: "500",
                            }}
                            onClick={() => setVisibleImageId(s.id)}
                          >
                            View Photo
                          </span>
                        )
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td>{s.name}</td>
                    <td>{s.course}</td>
                    <td>{s.year}</td>

                    {/* ACTIONS */}
                    <td className="button-col">
                      <button
                        className="edit-btn"
                        onClick={() => navigate(`/edit/${s.id}`)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(s.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" align="center">
                    No Students Found
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
      {/* PAGINATION */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default StudentList;
