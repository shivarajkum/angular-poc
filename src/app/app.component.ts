import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DoctorComponent } from '../app/doctor/doctor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DoctorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-first-project';
}
