import { useEffect, useState } from "react";

import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    }).catch(err => console.log(err.mesage));
  }, []);

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`api/appointments/${id}`, appointment).then(res => {
      setState({
        ...state,
        appointments,
      })
      axios.get("/api/days")
      .then((res)=>{
        setState(prev => ({ ...prev, days: res.data}));
      })
      return res;
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id]
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`api/appointments/${id}`).then(res => {
      setState({
        ...state,
        appointments,
      })
      axios.get("/api/days")
      .then((res)=>{
        setState(prev => ({ ...prev, days: res.data}));
      })
      return res;
    })
  }

  return { state, setDay, bookInterview, cancelInterview };
}