import React, { useEffect, useState } from "react";
import "./Home.css";

import verified from "../../assets/verified.svg";
import requests from "../../assets/requests.svg";
import jobRequests from "../../assets/job-request.svg";
import opportunity from "../../assets/opportunity.svg";
import viewMoreBtn from "../../assets/arrow-narrow-circle.svg";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";
function Home() {
  const barData = [
    { name: "IISE", student: 130, fill: "red" },
    { name: "IISE LU", student: 280, fill: "green" },
    { name: "FIeMITS", student: 220, fill: "blue" },
  ];

  const data1 = [
    { name: "Internships", students: 400, fill: "#0088FE" },
    { name: "Jobs", students: 700, fill: "#00C49F" },
  ];

  const [clgStudents, setClgStudents] = useState([]);
  const [postTypeCount, setPostTypeCount] = useState([]);
  const collegeNames = ["IISE", "IISE LU", "FIeMITS"];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/reports/getClgStudents"
        );
        console.log(response);
        setClgStudents(
          response.data.data.map((student) => ({
            ...student,
            college_no: collegeNames[student.college_no],
          }))
        );
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/reports/getPostCountByType"
        );
        console.log(response);
        setPostTypeCount(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='home-container margin-left-250'>
      <span>Home</span>
      <hr />
      <div className='dashboard-cards-container'>
        <div className='card'>
          <span className='dashboard-card-header'>
            <span>Verified Alumni</span>
            <span>
              <img
                className='dash-card-icons'
                src={verified}
                alt='verified ico'
              />
            </span>
          </span>
          <span className='dashboard-card-header'>
            <span id='count'>10</span>
            <a href='/alumni'>
              <img src={viewMoreBtn} alt='' id='viewmorecardsvg' />
            </a>
          </span>
        </div>
        <div className='card'>
          <span className='dashboard-card-header'>
            <span>Alumni Verification Requests Pending</span>
            <span>
              <img
                className='dash-card-icons'
                src={requests}
                alt='verified ico'
              />
            </span>
          </span>
          <span className='dashboard-card-header'>
            <span id='count'>7</span>
            <a href='/alumni'>
              <img src={viewMoreBtn} alt='' id='viewmorecardsvg' />
            </a>
          </span>
        </div>
        <div className='card'>
          <span className='dashboard-card-header'>
            <span>Total Opportunities</span>
            <span>
              <img
                className='dash-card-icons'
                src={opportunity}
                alt='verified ico'
              />
            </span>
          </span>
          <span className='dashboard-card-header'>
            <span id='count'>2</span>
            <a href='/alumni'>
              <img src={viewMoreBtn} alt='' id='viewmorecardsvg' />
            </a>
          </span>
        </div>
        <div className='card'>
          <span className='dashboard-card-header'>
            <span>Opportunity Verification Pending</span>
            <span>
              <img
                className='dash-card-icons'
                src={jobRequests}
                alt='verified ico'
              />
            </span>
          </span>
          <span className='dashboard-card-header'>
            <span id='count'>3</span>
            <a href='/opportunity'>
              <img src={viewMoreBtn} alt='' id='viewmorecardsvg' />
            </a>
          </span>
        </div>
      </div>
      <br />
      <div className='dashboard-charts'>
        <span>
          <span id='chart-label'>No of Alumni From Respective Colleges</span>
          <ResponsiveContainer width='80%' height={300}>
            <BarChart
              width={500}
              height={300}
              data={clgStudents}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='college_no' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='count'>
                {clgStudents.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </span>
        <span>
          Total No Of Opportunities
          <ResponsiveContainer width='100%' height={300}>
            <PieChart width={400} height={300}>
              <Pie
                data={postTypeCount}
                dataKey='count'
                nameKey='type'
                cx='50%'
                cy='50%'
                outerRadius={120}
                labelLine={true}
                label={({ name }) => name}
              >
                {postTypeCount.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[(index + 2) % COLORS.length]}
                  />
                ))}
                <Tooltip />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </span>
      </div>
      <a href='/reports' className='link-no-decoration '>
        View More Reports...(clickhere)
      </a>
    </div>
  );
}

export default Home;
