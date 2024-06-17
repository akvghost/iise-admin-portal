import React, { useState } from "react";

function PostEvents() {
  const [eventDetails, setEventDetails] = useState({
    eventDate: "",
    name: "",
    venue: "",
    timing: "",
    description: "",
  });

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
    console.log(eventDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventDetails);
    // Here you would typically send the eventDetails to your server or some API endpoint
  };

  return (
    <div className='margin-left-250'>
      <h1>Post An Event</h1>
      <form id='event-form'>
        <div className='form-group'>
          <label htmlFor='eventDate'>Event Date</label>
          <input
            type='date'
            id='eventDate'
            name='eventDate'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' name='name' onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='venue'>Venue</label>
          <input type='text' id='venue' name='venue' onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='timing'>Timing</label>
          <input
            type='time'
            id='timing'
            name='timing'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
            onChange={handleChange}
          />
        </div>
        <button id='submit' onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostEvents;
