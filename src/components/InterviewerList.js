import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "components/InterviewerListItem";
import "./InterviewerList.scss"

const classNames = require("classnames");

export default function InterviewerList (props) {

  // code for InterviewerList component that validates the value and onChange props.
  InterviewerList.propTypes = {
    interviewer: PropTypes.number,
    setInterviewer: PropTypes.func.isRequired
  };

  const interviewerClass = classNames("interviewers", {
    interviewers__header: props.header,
    interviewers__list: props.list
  });

  const interviewers = props.interviewers.map((interviewer => (
    <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.value }
    setInterviewer={event => props.onChange(interviewer.id)}
    />
  )))
  return (
    <section className={interviewerClass}>
      <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}