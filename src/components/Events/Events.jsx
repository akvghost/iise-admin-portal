import React, { useState } from "react";
import "./Events.css";
import PostEvents from "./PostEvents";
function Events() {
  const eventDetails = [
    {
      eventId: 1,
      title: "Event 1",
      venue: "Venue 1",
      eventDate: "2021-09-01",
      timing: "10:00 AM",
      description: "Description 1",
    },
    {
      eventId: 2,
      title: "Event 2",
      venue: "Venue 2",
      eventDate: "2021-09-02",
      timing: "11:00 AM",
      description: "Description 2",
    },
    {
      eventId: 3,
      title: "Event 3",
      venue: "Venue 3",
      eventDate: "2021-09-03",
      timing: "12:00 PM",
      description: "Description 3",
    },
  ];

  const [postEvent, setPostEvent] = useState(false);

  const handlePostEventBtn = () => {
    setPostEvent(true);
  };

  if (postEvent) {
    return <PostEvents />;
  }

  return (
    <div className='margin-left-250 '>
      <div className='post-event-container '>
        <span>Post an Event</span>
        <span>
          <button id='post-jobBtn' onClick={handlePostEventBtn}>
            post an event
          </button>
        </span>
      </div>
      <table className='jobs-table'>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Event Id</th>
            <th>Event Title</th>
            <th>Venue</th>
            <th>Date & Time</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {eventDetails.map((event, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{event.eventId}</td>
              <td>{event.title}</td>
              <td>{event.venue}</td>
              <td>
                {event.eventDate} {event.timing}
              </td>
              <td>{event.description}</td>
              <td>
                <button>Edit Event</button>
                <button
                // onClick={handleViewMore(
                //   job.job_id,
                //   job.enroll_no,
                //   job.fname + " " + job.lname
                // )}
                >
                  Remove Event
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Events;
