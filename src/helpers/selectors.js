export default function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find(stateDay => day === stateDay.name);
  if (!foundDay) {
    return [];
  }
  const foundAppointments = foundDay.appointments.map(appointment => {
    return state.appointments[appointment];
  });
  return foundAppointments;
}