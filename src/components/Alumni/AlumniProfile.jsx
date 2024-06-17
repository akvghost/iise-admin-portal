import React, { useEffect, useState } from "react";
import userImg from "../../assets/user-image.svg";
import phone from "../../assets/phone.png";
import email from "../../assets/email.svg";
import address from "../../assets/address.svg";
import action from "../../assets/action.svg";
import contact from "../../assets/contact.svg";
import work from "../../assets/work.svg";
import linkdin from "../../assets/linkedin.png";
import "./AlumniProfile.css";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
const AlumniProfile = (props) => {
  const [cookies, setCookies] = useCookies(["accessToken"]);

  const collegeNames = ["IISE", "IISE LU", "FIeMITS"];

  const [alumniData, setAlumniData] = useState({
    about: "",
    college_no: "",
    course: "",
    date_of_completion: "",
    date_of_joining: "",
    email: "",
    enroll_no: "",
    fname: "",
    lname: "",
    mobile_no: "",
    profile_pic_name: "",
    linked_url: "",
    occupation: "",
    organisation: "",
    verified: "",
  });

  const [showAction, setShowAction] = useState(true);

  const handleDelete = async (enroll) => {
    const collegeId = prompt(`Are You Sure\nEnter Your College Id To Proceed`);
    if (collegeId !== null && collegeId === enroll) {
      const toastId = toast.loading("Loading", {
        position: `bottom-right`,
        duration: 4000,
      });
      try {
        const response = await axios.delete(
          "http://localhost:8080/api/v1/admin/delete-alumni",
          {
            params: {
              enroll_no: collegeId,
            },
            // headers: {
            //   Authorization: `Bearer ${cookies.accessToken}`,
            // },
          }
        );
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
      }
    }
  };

  useEffect(() => {
    console.log(props.data);
    const fetchAlumniOtherData = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/v1/admin/alumni",
        {
          params: {
            enroll_no: props.data,
          },
        }
      );
      // console.log(response);
      setAlumniData(response.data.data);

      // console.log(alumniData); //.
    };
    fetchAlumniOtherData();
  }, []); //.
  const setAlumniAsVerified = async (enroll_no) => {
    const toastId = toast.loading("Loading", {
      position: `bottom-right`,
      duration: 4000,
    });
    try {
      const response = await axios.patch(
        "http://localhost:8080/api/v1/admin/alumni/verify/" + enroll_no
      );
      // console.log(response);
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
    setAlumniData({ ...alumniData, verified: true });
  };

  return (
    <div className='margin-left-250'>
      <div className='profile-card '>
        <div className='alumniprofile-card  ' id='basic-detail'>
          <br />
          <span>
            <img
              className='alumni-image'
              src={
                alumniData.profile_pic_name === null
                  ? userImg
                  : "http://localhost:8080/api/v1/alumni/image?fileName=" +
                    alumniData.profile_pic_name
              }
              alt='alumniImage'
            />
          </span>
          <span>
            {alumniData.fname} {alumniData.lname}
          </span>

          <span>{collegeNames[alumniData.college_no]}</span>

          <span>{alumniData.course}</span>
          <span>
            {alumniData.date_of_joining} - {alumniData.date_of_completion}
          </span>
          <span>College ID : {alumniData.enroll_no}</span>
        </div>
        <div className=' alumniprofile-card alumniprofile-card-font'>
          <span className='profilecard-header'>
            <span>
              <img className='header-icon' src={contact} alt='img' />
            </span>
            Contact Information
          </span>
          <span>
            <span>
              <img className='icon' src={email} alt='linked' />
            </span>{" "}
            <a href={`mailto:${alumniData.email}`}>{alumniData.email}</a>
          </span>

          <span>
            <span>
              <img className='icon' src={phone} alt='' />
            </span>
            {` `}
            {alumniData.mobile_no}
          </span>

          <span>
            <span>
              <img className='icon' src={linkdin} alt='linked' />
            </span>{" "}
            <a
              href={alumniData.linked_url !== "" ? alumniData.linked_url : "#"}
              target='_blank'
              rel='noreferrer'
            >
              {alumniData.linked_url !== "" ? alumniData.linked_url : "N/A"}
            </a>
          </span>
          <span>
            <span>
              <img className='icon' src={address} alt='linked' />
            </span>{" "}
            <span id='address'>
              {alumniData.about !== "" ? alumniData.about : "N/A"}
            </span>
          </span>
        </div>
        <div className=' alumniprofile-card alumniprofile-card-font '>
          <span className='profilecard-header'>
            <span>
              <img className='header-icon' src={work} alt='img' />
            </span>
            Work Profile
          </span>
          <span id='profile-heading1'>
            {alumniData.occupation !== "" ? alumniData.occupation : "N/A"}
          </span>
          <span id='profile-heading2'>
            {alumniData.organisation !== "" ? alumniData.organisation : "N/A"}
          </span>
        </div>
        <div className=' alumniprofile-card alumniprofile-card-font'>
          <span className='profilecard-header'>
            <span>
              <img className='header-icon' src={action} alt='img' />
            </span>
            Actions
          </span>
          <div className='profile-actions '>
            <button
              className={alumniData.verified ? "verified" : "non-verified"}
              onClick={() => {
                setAlumniAsVerified(alumniData.enroll_no);
              }}
              disabled={alumniData.verified}
            >
              {alumniData.verified
                ? "Verified Alumni"
                : "Set Alumni As Verified"}
            </button>
            <button
              onClick={() => {
                handleDelete(alumniData.enroll_no);
              }}
              id='delBtn'
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default AlumniProfile;
