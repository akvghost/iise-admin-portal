import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import "./ViewMore.css";
import Whatsapp from "../../assets/whatsapp.png";
import locationSvg from "../../assets/location.svg";
import deadlineSvg from "../../assets/deadline.svg";
import AlumniProfile from "../Alumni/AlumniProfile";
import toast, { Toaster } from "react-hot-toast";

const ViewMore = (props) => {
  console.log(props.jobId);
  console.log(props.enrollNo);
  const [cookies] = useCookies(["accessToken"]);
  const [job, setJob] = useState([]);
  const [enroll, setEnroll] = useState();
  const [viewFullProfile, setViewFullProfile] = useState(false);
  const [alumniProfile, setAlumniProfile] = useState();
  // const [collegeName, setCollegeName] = useState("");
  useEffect(() => {
    const token = cookies.accessToken;
    const fetchData = async () => {
      // if (token !== undefined) {
      //   const decoded = jwtDecode(cookies.accessToken);
      //   console.log(`decoded ${decoded}`);
      //   console.log(`this is enroll : ${props.data.alumni_enroll_no}`);

      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/job",
          {
            params: {
              job_id: props.jobId,
            },
          }
        );
        console.log(response.data);
        setJob(response.data.data || []); // Assuming jobs are nested under "jobs"
      } catch (error) {
        console.log(error);
      }
      // } else console.log("in islse");...
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

  const setJobAsVerified = async () => {
    const toastId = toast.loading("Loading", {
      position: `bottom-right`,
      duration: 4000,
    });
    try {
      const response = await axios.patch(
        "http://localhost:8080/api/v1/admin/job/verify/" + props.jobId
      );
      console.log(response);
      // setAlumniData({ ...alumniData, profile_pic_name: null });
      if (response.data.status.success) {
        toast.success(`${response.data.status.message}`, {
          id: toastId,
          position: "bottom-right",
          duration: 4000,
        });
      } else {
        toast.error(`${response.data.status.message}`, {
          id: toastId,
          position: "bottom-right",
          duration: 4000,
        });
      }
    } catch (error) {
      console.log(error);
    } //.v
    // setAlumniData({ ...alumniData, verified: true });
  };

  return (
    <div className='viewmore-container margin-left-250 '>
      <div className='job-header'>
        <div className='job-header-inner'>
          <h1 id='job-position'>{job.position}</h1>
          <span id='job-subheader'>
            <span>{job.company_name}</span>

            <span>
              <span>
                <img src={locationSvg} alt='' id='alumni-details-svg' />
              </span>
              <span>{job.location}</span>
            </span>
          </span>
          <span>
            Deadline : <b>{job.deadline}</b>
            <img src={deadlineSvg} alt='' id='alumni-details-svg' />
          </span>
        </div>

        <div className='job-header-inner'>
          <button
            className={job.verified ? "verified" : "non-verified"}
            onClick={() => {
              setJobAsVerified();
            }}
            disabled={job.verified}
          >
            {job.verified ? "Verified Job" : "Mark Job As Verified"}
          </button>
        </div>
      </div>
      <hr />
      <div className='job-details'>
        <h2>Job Details</h2>
        <h3>Job Description</h3>
        <span>{job.description}</span>
        <h3>Job Type</h3>
        <span id='job-type'>{job.type}</span>
        <h3>Job Roles & Responsibilities</h3>
        <span>{job.job_responsibility}</span>

        <h3>Eligibility</h3>
        <span>{job.job_eligibility}</span>
        <h3>Approx Salary</h3>
        <span>
          {job.min_package} LPA - {job.max_package} LPA
        </span>
      </div>

      <div className='alumni-details'>
        <span>Posted By</span>
        <span>College Id : {props.enrollNo}</span>
        <span id='alumni-details-name'>{props.name}</span>
        <button
          onClick={() => {
            handleClickOnViewProfile(props.enrollNo);
          }}
        >
          View Full Profile
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default ViewMore;
