import { Appointment } from "./appointment.model";

export interface Slot {
    time: string; // Time of the slot
    isAvailable: boolean; // Flag to indicate if the slot is available
    appointment?: Appointment; // Optional appointment booked for this slot
  }