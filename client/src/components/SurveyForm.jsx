import { useEffect, useState } from "react";
import instance from "../api/instance";
import { useNavigate } from "react-router-dom";
import education from "../constants/education";

function SurveyForm() {
  const [survey, setSurvey] = useState({
    name: "",
    education: "",
    gender: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const [surveyList, setSurveyList] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurvey((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.post("/new", survey);
      setSurveyList((prev) => [data.newSurvey, ...prev]);
      setSurvey({
        name: "",
        education: "",
        gender: "",
        phone: "",
        email: "",
      });
    } catch (err) {
      const { response } = err;
      setError(response?.data.message);
    }
  };

  const fetchSurveys = async () => {
    try {
      const { data } = await instance.get("/all");
      setSurveyList(data.surveys);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  }, [error]);

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}>
        <div className="input-container">
          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            value={survey.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-container">
          <label>Education</label>
          <select
            name="education"
            value={survey.education}
            onChange={(e) => handleChange(e)}>
            <option>Select your Education</option>
            {education?.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </select>
        </div>
        <div style={{ padding: ".5rem" }}>
          <label>Gender</label>
          <span>Male</span>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={(e) => handleChange(e)}
          />
          <span>Female</span>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-container">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={survey.phone}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="input-container">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={survey.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Gender</td>
            <td>Education</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {surveyList.map((item) => {
            return (
              <tr key={item?._id}>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.phone}</td>
                <td>{item?.gender}</td>
                <td>{item?.education}</td>
                <td>
                  <button
                    onClick={() => {
                      navigate(`/survey/${item._id}`);
                    }}>
                    View
                  </button>
                </td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </table>
      {error ? <span className="error">{error}</span> : null}
    </>
  );
}

export default SurveyForm;
