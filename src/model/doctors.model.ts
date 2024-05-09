import { Slot } from "./slots.model";

export interface Doctor {
    name: string;
    daysWorking: number; // Number of days the doctor works in a week
    slotsPerDay: number; // Number of slots per day
    schedule: Slot[][]; 
  }

export { Slot };
