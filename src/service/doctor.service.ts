import { Injectable } from '@angular/core';
import { Doctor } from '../model/doctors.model';
import { Appointment } from '../model/appointment.model';
import { Slot } from '../model/slots.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  doctor: Doctor;
  selectedSlot: { dayIndex: number, slotIndex: number } | null = null;
  constructor() {
    this.doctor = {
      name: 'Dr. Sharma',
      daysWorking: 5,
      slotsPerDay: 4,
      schedule: this.generateSchedule(5, 4)
    };
   }

   generateSchedule(days: number, slotsPerDay: number): Slot[][] {
    const schedule: Slot[][] = [];
    for (let i = 0; i < days; i++) {
      const day: Slot[] = [];
      for (let j = 0; j < slotsPerDay; j++) {
        day.push({ time: `${j + 9}:00`, isAvailable: true });
      }
      schedule.push(day);
    }
    return schedule;
  }

  bookAppointment(dayIndex: number, slotIndex: number, appointment: Appointment): void {
    this.doctor.schedule[dayIndex][slotIndex].isAvailable = false;
    this.doctor.schedule[dayIndex][slotIndex].appointment = appointment;
    this.selectedSlot = null;
  }

  getSelectedSlot(): { dayIndex: number, slotIndex: number } | null {
    return this.selectedSlot;
  }

  selectSlot(dayIndex: number, slotIndex: number): void {
    this.selectedSlot = { dayIndex, slotIndex };
  }
}
