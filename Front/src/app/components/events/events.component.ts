import { Component, OnInit } from '@angular/core';
import { EventService, Evenement } from '../../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any[] = [];
  featuredEvent: any = null;
  loading: boolean = true;
  error: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.eventService.getAllEvents().subscribe(
      (data) => {
        if (data && data.length > 0) {
          // Transform the data for display
          this.events = data.map(event => this.transformEventData(event));
          
          // Set the first event as featured or pick a random one
          this.featuredEvent = this.events[0];
          
          this.loading = false;
        } else {
          this.events = this.getDefaultEvents();
          this.featuredEvent = this.events[0];
          this.loading = false;
        }
      },
      (error) => {
        console.error('Error loading events:', error);
        this.error = 'Failed to load events. Using default data instead.';
        this.events = this.getDefaultEvents();
        this.featuredEvent = this.events[0];
        this.loading = false;
      }
    );
  }

  transformEventData(event: Evenement): any {
    // Extract month and day from the date
    const startDate = new Date(event.dateDebut);
    const month = startDate.toLocaleString('en-US', { month: 'short' });
    const day = startDate.getDate().toString();
    
    return {
      id: event.id,
      name: event.nom,
      description: event.description,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
      type: 'Food Festival',
      location: 'Convention Center',
      month: month,
      day: day,
      price: 'Free Entry',
      startDate: this.formatDate(event.dateDebut),
      endDate: this.formatDate(event.dateFin),
      capacity: event.capaciteMax
    };
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  // Fallback method to provide default events if API fails
  getDefaultEvents(): any[] {
    return [
      {
        name: 'Pasta Making Workshop',
        description: 'Learn to make authentic Italian pasta from scratch with Chef Mario.',
        image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        type: 'Cooking Class',
        location: 'Culinary Institute',
        month: 'May',
        day: '12',
        price: '$35'
      },
      {
        name: 'Street Food Festival',
        description: 'Experience diverse street foods from around the world in one place.',
        image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        type: 'Food Festival',
        location: 'City Park',
        month: 'May',
        day: '20',
        price: 'Free Entry'
      },
      {
        name: 'Wine & Cheese Pairing',
        description: 'Discover the art of pairing fine wines with artisanal cheeses.',
        image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        type: 'Tasting',
        location: 'Vineyard Estates',
        month: 'Jun',
        day: '05',
        price: '$50'
      }
    ];
  }
}
