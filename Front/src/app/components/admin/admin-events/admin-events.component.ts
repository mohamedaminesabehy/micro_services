import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService, Evenement } from '../../../services/event.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {
  events: any[] = [];
  eventForm: FormGroup;
  isEditing = false;
  currentEventId: number | null = null;
  averageCapacity: number = 0;

  constructor(
    private eventService: EventService,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      capaciteMax: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadAverageCapacity();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data) => {
        this.events = data.map(event => ({
          id: event.id,
          name: event.nom,
          description: event.description,
          startDate: this.formatDate(event.dateDebut),
          endDate: this.formatDate(event.dateFin),
          capaciteMax: event.capaciteMax,
          // Default values for fields not in the backend
          image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
          location: 'Location not specified',
          time: 'Time not specified',
          price: 'Price not specified',
          type: 'Event',
          active: true
        }));
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }

  loadAverageCapacity(): void {
    this.eventService.getMoyenneCapacite().subscribe(
      (data) => {
        this.averageCapacity = data;
      },
      (error) => {
        console.error('Error loading average capacity:', error);
      }
    );
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      return;
    }

    // Format dates properly for the backend
    const formattedDateDebut = this.formatDateForBackend(this.eventForm.value.dateDebut);
    const formattedDateFin = this.formatDateForBackend(this.eventForm.value.dateFin);

    const eventData: Evenement = {
      nom: this.eventForm.value.nom,
      description: this.eventForm.value.description,
      dateDebut: formattedDateDebut,
      dateFin: formattedDateFin,
      capaciteMax: this.eventForm.value.capaciteMax
    };

    if (this.isEditing && this.currentEventId) {
      this.eventService.updateEvent(this.currentEventId, eventData).subscribe(
        () => {
          this.resetForm();
          this.loadEvents();
          this.loadAverageCapacity();
        },
        (error) => {
          console.error('Error updating event:', error);
        }
      );
    } else {
      this.eventService.createEvent(eventData).subscribe(
        () => {
          this.resetForm();
          this.loadEvents();
          this.loadAverageCapacity();
        },
        (error) => {
          console.error('Error creating event:', error);
        }
      );
    }
  }

  // Add this new method to format dates properly for the backend
  formatDateForBackend(dateString: string): string {
    if (!dateString) return '';
    // Create a date object from the input date string
    const date = new Date(dateString);
    // Set the time to noon to avoid timezone issues
    date.setHours(12, 0, 0, 0);
    // Return the date in ISO format
    return date.toISOString();
  }

  editEvent(event: any): void {
    this.isEditing = true;
    this.currentEventId = event.id;
    this.eventForm.patchValue({
      nom: event.name,
      description: event.description,
      dateDebut: event.startDate,
      dateFin: event.endDate,
      capaciteMax: event.capaciteMax
    });
  }

  deleteEvent(id: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe(
        () => {
          this.loadEvents();
          this.loadAverageCapacity();
        },
        (error) => {
          console.error('Error deleting event:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.eventForm.reset();
    this.isEditing = false;
    this.currentEventId = null;
  }
}
