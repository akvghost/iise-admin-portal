import React, { useEffect, useState } from "react";
import "./Events.css";
import PostEvents from "./PostEvents";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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
  const [events, setEvents] = useState([]);

  const [postEvent, setPostEvent] = useState(false);

  const handlePostEventBtn = () => {
    setPostEvent(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const toastId = toast.loading("Loading", { position: "bottom-right" });
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/alumni/events"
        );
        // Do something with the response jjj
        console.log(response);
        if (response.data.status.success) {
          toast.success(`${response.data.status.message}`, {
            id: toastId,
            position: "bottom-right",
            duration: 4000,
          });
          setEvents(response.data.data);
          console.log(events);
        } else {
          toast.error("Unable to fetch Events", {
            id: toastId,
            position: "bottom-right",
            duration: 4000,
          });
        }
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
          {events.map((event, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{event.event_id}</td>
              <td>{event.event_name}</td>
              <td>{event.location}</td>
              <td>
                {event.event_date} {event.timing}
              </td>
              <td>{event.short_description}</td>
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
      <Toaster />
    </div>
  );
}

export default Events;
