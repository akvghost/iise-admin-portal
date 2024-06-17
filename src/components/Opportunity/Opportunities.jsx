import React, { useEffect, useState } from "react";
import "./Opportunities.css";
import ViewMore from "../JobDetail/ViewMore";
import axios from "axios";
function Opportunities() {
  const jobsData = [
    {
      authId: 2200570140009,
      authName: `Ankush Kumar Verma`,
      profile: `software engineer intern`,
      company: `Kush Company`,
    },
    {
      authId: 2200570140008,
      authName: `anurag Kumar Verma`,
      profile: `software engineer intern`,
      company: `Rag Company`,
    },
    {
      authId: 2200570140007,
      authName: `Anuj Yadav`,
      profile: `software engineer intern`,
      company: `Anuj Company`,
    },
  ];

  const [postDetails, setPostDetails] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [enroll, setEnroll] = useState();
  const [alumniName, setAlumniName] = useState();
  const [viewMoreData, setViewMoreData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/post-details"
        );
        console.log(response.data);
        setPostDetails(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleViewMore = (jobId, enr, name) => () => {
    setJobId(jobId);
    setViewMoreData(true);

    setAlumniName(name);
    setEnroll(enr);
  };
  if (viewMoreData) {
    return <ViewMore jobId={jobId} enrollNo={enroll} name={alumniName} />;
  }

  return (
    <div className='opportunity-container margin-left-250'>
      <h1>Opportunities are Here</h1>
      <table className='jobs-table'>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Author Id</th>
            <th>Author Name</th>
            <th>Job Profile</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {postDetails.map((job, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{job.enroll_no}</td>
              <td>
                {job.fname} {job.lname}
              </td>
              <td>{job.position}</td>
              <td>{job.company_name}</td>
              <td>
                <button
                  onClick={handleViewMore(
                    job.job_id,
                    job.enroll_no,
                    job.fname + " " + job.lname
                  )}
                >
                  View More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Opportunities;
