import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import AlumniProfile from "../Alumni/AlumniProfile";

function Alumni() {
  const [jobDetails, setJobDetails] = useState([]);
  const [enroll, setEnroll] = useState();
  const [viewFullProfile, setViewFullProfile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const toastId = toast.loading("Loading", {
        position: `bottom-right`,
        duration: 4000,
      });
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/get-alumni-data          "
        );
        // console.log(response);

        if (response.data.status.success) {
          toast.success(`Successfully Fetched`, {
            id: toastId,
            position: "bottom-right",
            duration: 4000,
          });
          setJobDetails(response.data.data);
        } else {
          toast.error(`${response.data.status.message}`, {
            id: toastId,
            position: "bottom-right",
            duration: 4000,
          });
        }
      } catch (error) {
        console.log(error);
        toast.dismiss(toastId);
        toast.error(`${error.message} : Failed to fetch `, {
          position: "bottom-right",
          duration: 4000,
        });
      }
    };
    fetchData();
  }, []);

  const handleClickOnViewProfile = (enroll) => {
    setEnroll(enroll);
    setViewFullProfile(true);
  };

  if (viewFullProfile) {
    return <AlumniProfile data={enroll} />;
  }

  return (
    <div className='opportunity-container margin-left-250'>
      <h1>Profiles of Almnus</h1>
      <table className='jobs-table'>
        <thead>
          <tr>
            <th>Sno</th>
            <th>College Id</th>
            <th> Name</th>
            <th>Job Profile</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobDetails.map((job, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{job.enroll_no}</td>
              <td>
                {job.fname} {job.lname}
              </td>
              <td>{job.occupation}</td>
              <td>{job.organisation}</td>
              <td>
                <button
                  onClick={() => {
                    handleClickOnViewProfile(job.enroll_no);
                  }}
                >
                  View More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
}

export default Alumni;
