import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Cell,
  Scatter,
  ScatterChart,
  ComposedChart,
} from "recharts";

import "./Reports.css";
import axios from "axios";

function Reports() {
  const [locationCount, setLocationCount] = useState([
    { location: "Lucknow", count: 120 },
    { location: "Agra", count: 98 },
    { location: "Kanpur", count: 26 },
    { location: "Delhi", count: 80 },
    { location: "Gurgaon", count: 90 },
  ]);
  const [minMaxPackage, setMinMaxPackage] = useState([
    { location: "Lucknow", min: 40, max: 20 },
    { location: "Agra", min: 10, max: 30 },
    { location: "Delhi", min: 2, max: 20 },
    { location: "Gurgaon", min: 60, max: 21 },
  ]);
  const [verifiedAlumni, setVerifiedAlumni] = useState([
    { verified: "Not Verified", count: 20 },
    { verified: "Verified", count: 10 },
  ]);

  const [verifiedOpportunity, setVerifiedOpportunity] = useState([
    { verified: "Not Verified", count: 20 },
    { verified: "Verified", count: 10 },
  ]);

  const [monthlyPosts, setMonthlyPosts] = useState([
    { name: "Jan", internshipcount: 0, jobcount: 0 },
    { name: "Feb", internshipcount: 0, jobcount: 0 },
    { name: "Mar", internshipcount: 0, jobcount: 0 },
    { name: "Apr", internshipcount: 0, jobcount: 0 },
    { name: "May", internshipcount: 0, jobcount: 0 },
    { name: "Jun", internshipcount: 0, jobcount: 0 },
    { name: "Jul", internshipcount: 0, jobcount: 0 },
    { name: "Aug", internshipcount: 0, jobcount: 0 },
    { name: "Sep", internshipcount: 0, jobcount: 0 },
    { name: "Oct", internshipcount: 0, jobcount: 0 },
    { name: "Nov", internshipcount: 0, jobcount: 0 },
    { name: "Dec", internshipcount: 0, jobcount: 0 },
  ]);
  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const VERIFIED_COLORS = ["gray", "#00C49F"];
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = [
    { name: "Jan", internshipcount: 0, jobcount: 0 },
    { name: "Feb", internshipcount: 0, jobcount: 0 },
    { name: "Mar", internshipcount: 0, jobcount: 0 },
    { name: "Apr", internshipcount: 0, jobcount: 0 },
    { name: "May", internshipcount: 60, jobcount: 21 },
    { name: "Jun", internshipcount: 0, jobcount: 0 },
    { name: "Jul", internshipcount: 20, jobcount: 4 },
    { name: "Aug", internshipcount: 40, jobcount: 9 },
    { name: "Sep", internshipcount: 60, jobcount: 22 },
    { name: "Oct", internshipcount: 20, jobcount: 14 },
    { name: "Nov", internshipcount: 30, jobcount: 11 },
    { name: "Dec", internshipcount: 10, jobcount: 19 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/reports/location"
        );
        console.log(response);
        setLocationCount(response.data.data);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/reports/minmaxpackage"
        );
        console.log(response);
        setMinMaxPackage(response.data.data);
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/reports/get-monthly-posts"
        );
        setMonthlyPosts((prevPosts) => {
          const updatedPosts = [...prevPosts];
          response.data.data.map((post) => {
            const index = post.month - 1;
            console.log(index);
            updatedPosts[index] = {
              ...updatedPosts[index],
              internshipcount: post.internshipcount,
              jobcount: post.jobcount,
            };
          });
          return updatedPosts;
        });

        console.log(monthlyPosts);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/reports/verified-alumni"
        );
        console.log(response);
        setVerifiedAlumni(
          response.data.data.map((alumni) => ({
            ...alumni,
            verified: alumni.verified ? "verified" : "Not Verified",
          }))
        );
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/reports/verified-job"
        );
        console.log(response);
        setVerifiedOpportunity(
          response.data.data.map((opportunity) => ({
            ...opportunity,
            verified: opportunity.verified ? "verified" : "Not Verified",
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='reports-container margin-left-250'>
      <h1>CHARTS ARE HERE</h1>

      <div>
        <span>
          Opportunity Posted Monthly
          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              data={monthlyPosts}
              margin={{ top: 10, left: 5, bottom: 5, right: 20 }}
            >
              <Line
                dataKey='jobcount'
                stroke='#8884d8' /*activeDot={{ r: 8 }}*/
              />
              <Line dataKey='internshipcount' stroke='red' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: "green" }} />
              <Legend />
              <CartesianGrid strokeDasharray={"3 3"} />
            </LineChart>
          </ResponsiveContainer>
        </span>
      </div>
      <div className='dashboard-charts'>
        <span>
          <ResponsiveContainer width='100%' height={400}>
            <RadarChart
              cx='50%'
              cy='50%'
              outerRadius={100}
              data={locationCount}
              margin={{
                top: 0,
                right: 40,
                left: 40,
                bottom: 0,
              }}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey='location' />
              <PolarRadiusAxis angle={30} domain={[0, "auto"]} stroke='red' />
              <Radar
                name='count'
                dataKey='count'
                stroke='#8884d8'
                fill='#8884d8'
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
          No of Opportunities Posted In Different Area
        </span>
        <span>
          <ResponsiveContainer width='100%' height={400}>
            <LineChart data={minMaxPackage}>
              <Line dataKey='min' stroke='#8884d8' />
              <Line dataKey='max' stroke='red' />
              <XAxis dataKey='location' />
              <YAxis
                tickFormatter={(value) => `${value}LPA`}
                tick={{ fill: "blue" }}
                axisLine={{ stroke: "green" }}
              />

              <Legend />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
          Minimum and Maximum Package Offered in Different Cities
        </span>
      </div>
      <div className='dashboard-charts'>
        <span>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              width={500}
              height={300}
              data={verifiedAlumni}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='verified' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='count'>
                {verifiedAlumni.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={VERIFIED_COLORS[index % VERIFIED_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          No Verified and Non Verified Alumni
        </span>
        <span>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              width={500}
              height={300}
              data={verifiedOpportunity}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='verified' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='count'>
                {verifiedOpportunity.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={VERIFIED_COLORS[index % VERIFIED_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          No Verified and Non Verified Opportunities
        </span>
      </div>
    </div>
  );
}

export default Reports;
