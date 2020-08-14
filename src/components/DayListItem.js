import React from "react";
import './DayListItem.scss';

const classNames = require('classnames');

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", props.className, {
  'day-list__item--selected': props.selected,
  'day-list__item--full' : props.spots === 0
});
  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}

function formatSpots(spots) {
  if (spots === 1) {
    return spots + " spot remaining";
  } else {
    return spots ? spots + " spots remaining" : "no spots remaining";
  }
};

