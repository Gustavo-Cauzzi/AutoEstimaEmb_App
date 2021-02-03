/* eslint-disable @typescript-eslint/no-unused-vars */
import Appointment from './Appointment';
import AppointmentNote from './AppointmentNote';

export default interface Client {
  id: string;
  name: string;
  telephone: string[];
  appointmentNotes: AppointmentNote[];
  appointments: Appointment[];
  currentDept: number;
}
