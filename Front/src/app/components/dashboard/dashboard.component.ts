import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { MenuService } from '../../services/menu.service';
import { EventService, Evenement } from '../../services/event.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Data properties
  featuredRestaurants: any[] = [];
  popularMenuItems: any[] = [];
  upcomingEvents: any[] = [];
  
  // Stats
  restaurantCount: number = 0;
  menuItemCount: number = 0;
  eventCount: number = 0;
  averageRating: number = 4.8; // Default value
  
  // Loading states
  loading: boolean = true;
  error: string = '';

  constructor(
    private restaurantService: RestaurantService,
    private menuService: MenuService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    
    // Use forkJoin to make parallel API calls
    forkJoin({
      restaurants: this.restaurantService.getAllRestaurants(),
      menus: this.menuService.getAllMenus(),
      events: this.eventService.getAllEvents()
    }).subscribe({
      next: (results) => {
        // Process restaurants
        if (results.restaurants && results.restaurants.length > 0) {
          this.restaurantCount = results.restaurants.length;
          this.featuredRestaurants = this.transformRestaurants(results.restaurants.slice(0, 4));
        } else {
          this.featuredRestaurants = this.getDefaultRestaurants();
        }
        
        // Process menus
        if (results.menus && results.menus.length > 0) {
          this.menuItemCount = results.menus.length;
          this.popularMenuItems = this.transformMenuItems(results.menus.slice(0, 4));
        } else {
          this.popularMenuItems = this.getDefaultMenuItems();
        }
        
        // Process events
        if (results.events && results.events.length > 0) {
          this.eventCount = results.events.length;
          this.upcomingEvents = this.transformEvents(results.events.slice(0, 2));
        } else {
          this.upcomingEvents = this.getDefaultEvents();
        }
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.error = 'Failed to load dashboard data. Using default values.';
        
        // Use default data if API calls fail
        this.featuredRestaurants = this.getDefaultRestaurants();
        this.popularMenuItems = this.getDefaultMenuItems();
        this.upcomingEvents = this.getDefaultEvents();
        
        this.loading = false;
      }
    });
  }

  transformRestaurants(restaurants: any[]): any[] {
    return restaurants.map(restaurant => ({
      id: restaurant.id,
      name: restaurant.nom || restaurant.name,
      cuisine: restaurant.cuisine || 'Various Cuisines',
      image: restaurant.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      rating: restaurant.rating || (Math.random() * (5 - 4) + 4).toFixed(1),
      deliveryTime: restaurant.deliveryTime || '25-35 min',
      priceRange: restaurant.priceRange || '$$'
    }));
  }

  transformMenuItems(menus: any[]): any[] {
    return menus.map(menu => ({
      id: menu.id,
      name: menu.nom || menu.name,
      description: menu.description || 'Delicious menu item',
      image: menu.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      price: menu.prix || menu.price || 9.99,
      vegetarian: menu.vegetarian || false
    }));
  }

  transformEvents(events: Evenement[]): any[] {
    return events.map(event => {
      const startDate = new Date(event.dateDebut);
      return {
        id: event.id,
        name: event.nom,
        description: event.description,
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        date: this.formatEventDate(event.dateDebut, event.dateFin),
        location: 'Convention Center',
        price: 'Free Entry',
        capacity: event.capaciteMax
      };
    });
  }

  formatEventDate(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startMonth = start.toLocaleString('en-US', { month: 'long' });
    const endMonth = end.toLocaleString('en-US', { month: 'long' });
    
    if (startMonth === endMonth && start.getDate() === end.getDate() && start.getFullYear() === end.getFullYear()) {
      // Same day event
      return `${startMonth} ${start.getDate()}, ${start.getFullYear()}`;
    } else if (startMonth === endMonth && start.getFullYear() === end.getFullYear()) {
      // Same month, different days
      return `${startMonth} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
    } else if (start.getFullYear() === end.getFullYear()) {
      // Different months, same year
      return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${start.getFullYear()}`;
    } else {
      // Different years
      return `${startMonth} ${start.getDate()}, ${start.getFullYear()} - ${endMonth} ${end.getDate()}, ${end.getFullYear()}`;
    }
  }

  // Default data methods (keep your existing data as fallbacks)
  getDefaultRestaurants(): any[] {
    return [
      {
        name: 'Pasta Paradise',
        cuisine: 'Italian, Mediterranean',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        rating: 4.8,
        deliveryTime: '25-35 min',
        priceRange: '$$'
      },
      // Keep your existing restaurant data...
      {
        name: 'Spice Garden',
        cuisine: 'Indian, Asian',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        rating: 4.6,
        deliveryTime: '30-40 min',
        priceRange: '$$'
      },
      {
        name: 'Burger Joint',
        cuisine: 'American, Fast Food',
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        rating: 4.5,
        deliveryTime: '15-25 min',
        priceRange: '$'
      },
      {
        name: 'Sushi Express',
        cuisine: 'Japanese, Sushi',
        image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        rating: 4.7,
        deliveryTime: '20-30 min',
        priceRange: '$$$'
      }
    ];
  }

  getDefaultMenuItems(): any[] {
    return [
      {
        name: 'Classic Burger',
        description: 'Beef patty with lettuce, tomato, cheese, and special sauce',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        price: 8.99,
        vegetarian: false
      },
      // Keep your existing menu items...
      {
        name: 'Margherita Pizza',
        description: 'Fresh tomatoes, mozzarella cheese, and basil on thin crust',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        price: 12.99,
        vegetarian: true
      },
      {
        name: 'Caesar Salad',
        description: 'Romaine lettuce, croutons, parmesan cheese with Caesar dressing',
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        price: 7.99,
        vegetarian: true
      },
      {
        name: 'Chicken Alfredo',
        description: 'Fettuccine pasta with creamy Alfredo sauce and grilled chicken',
        image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        price: 14.99,
        vegetarian: false
      }
    ];
  }

  getDefaultEvents(): any[] {
    return [
      {
        name: 'Annual Food & Wine Festival',
        description: 'Join us for the biggest culinary event of the year featuring top chefs, wine tastings, cooking demonstrations, and more!',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        date: 'June 15-18, 2023',
        location: 'Downtown Convention Center',
        price: '$45'
      },
      {
        name: 'Pasta Making Workshop',
        description: 'Learn to make authentic Italian pasta from scratch with Chef Mario.',
        image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        date: 'May 12, 2023',
        location: 'Culinary Institute',
        price: '$35'
      }
    ];
  }
}
