import React from "react";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedformat";
import JobInfo from "./JobInfo";
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import { Wrapper } from "../assets/wrappers/Job";

day.extend(advancedFormat);
const Job = ({ job }) => {
  const date = day(job.createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{job.company.charAt(0)} </div>
        <div className="info">
          <h5>{job.position}</h5>
          <p>{job.company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={job.jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={job.jobType} />
          <div className={`status ${job.jobStatus}`}>{job.jobStatus}</div>
        </div>
        <footer className="actions">
        <Link className="btn edit-btn">Edit</Link>
        <Form>
          <button type="submit" className="btn delete-btn">
            Delete
          </button>
        </Form>
      </footer>
      </div>

    </Wrapper>
  );
};

export default Job;
