import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Doctor, Slot } from '../../model/doctors.model';
import { DoctorService } from '../../service/doctor.service';
import { UtilityService } from '../../service/utility.service';
import { Appointment } from '../../model/appointment.model';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {
  doctor: Doctor;
  appointment: Appointment = {
    patientName: '',
    dateTime: '',
    healthIssue: ''
  };
  errorMessage: string = '';


  constructor(private doctorService: DoctorService, private utilityService: UtilityService) {
    this.doctor = this.doctorService.doctor;
  }

  getDayOfWeek(dayIndex: number): string {
    return this.utilityService.getDayOfWeek(dayIndex);
  }

  isSlotAvailable(dayIndex: number, slotIndex: number): boolean {
    return this.doctor.schedule[dayIndex][slotIndex].isAvailable;
  }

  
  bookAppointment(dayIndex: number, slotIndex: number): void {
    const selectedSlot = this.doctor.schedule[dayIndex][slotIndex];
    
    if (selectedSlot.isAvailable) {
      if (this.appointment.patientName && this.appointment.dateTime && this.appointment.healthIssue) {
        if (!selectedSlot.appointment) {
          const appointment: Appointment = {
            patientName: this.appointment.patientName,
            dateTime: this.appointment.dateTime,
            healthIssue: this.appointment.healthIssue
          };
          this.doctorService.bookAppointment(dayIndex, slotIndex, appointment);
          this.appointment.patientName = '';
          this.appointment.dateTime = '';
          this.appointment.healthIssue = '';
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Slot already booked by another patient';
        }
      } else {
        this.errorMessage = 'Please fill in all fields';
      }
    } else {
      this.errorMessage = 'Slot already booked';
    }
  }
}
