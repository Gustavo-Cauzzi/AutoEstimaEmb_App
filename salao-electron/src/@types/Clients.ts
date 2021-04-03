/* eslint-disable @typescript-eslint/no-unused-vars */
import Appointment from './Appointment';
import AppointmentNote from './AppointmentNote';
import Dept from './Dept';

export default interface Client {
  id: string;
  name: string;
  telephone: string[];
  description: string;
  appointmentNotes: AppointmentNote[];
  appointments: Appointment[];
  currentDept: Dept;
}
