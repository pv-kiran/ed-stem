import { useParams } from "react-router-dom";
import instance from "../api/instance";
import { useEffect, useState } from "react";

function SurveyDetails() {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  const fetchDetails = async () => {
    try {
      const { data } = await instance.get(`/${id}`);

      setDetails(data.survey);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      {details ? (
        <div>
          <h1>{details?.name}</h1>
          <h1>{details?.education}</h1>
          <h1>{details?.gender}</h1>
          <h1>{details?.phone}</h1>
          <h1>{details?.email}</h1>
        </div>
      ) : (
        <h1>No details found</h1>
      )}
    </div>
  );
}

export default SurveyDetails;
