import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


function PostEvents() {

  const [eventDetails, setEventDetails] = useState({
    event_name: "",
    location: "",
    event_date: "",
    timing: "",
    short_description: "",
  });

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
    console.log(eventDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(eventDetails);
    const toastId=toast.loading("Loading",{position:"bottom-right"});
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/alumni/post-events",
          eventDetails
        );
        console.log(response.data);
        if(response.data.status.success)
          {
              toast.success("Event Posted Successfully",{id:toastId, position:"bottom-right",duration:4000});
          }
          else{
            toast.error("Unable to Post Event",{id:toastId, position:"bottom-right",duration:4000});
          }
      } catch (error) {
        console.log(error);
      }
      // } else console.log("in islse");...
    };

    // Here you would typically send the eventDetails to your server or some API endpoint

  return (
    <div className='margin-left-250'>
      <h1>Post An Event</h1>
      <form id='event-form'>
        <div className='form-group'>
          <label htmlFor='eventDate'>Event Date</label>
          <input
            type='date'
            id='eventDate'
            name='event_date'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' name='event_name' onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='venue'>Venue</label>
          <input type='text' id='venue' name='location' onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='timing'>Timing</label>
          <input
            type='time'
            id='timing'
            name='timing'
            step={1}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='short_description'
            onChange={handleChange}
          />
        </div>
        <button id='submit' onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default PostEvents;
