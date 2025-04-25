import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite-restaurants',
  templateUrl: './favorite-restaurants.component.html',
  styleUrls: ['./favorite-restaurants.component.css']
})
export class FavoriteRestaurantsComponent {
  favoriteRestaurants = [
    {
      name: 'Dine Fine',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      location: '27/1 Jamaica Fast Food, Limit Hill No 08',
      cuisine: 'Chinese, North Indian',
      type: 'Fast Food'
    },
    {
      name: 'Forkful',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      location: '27 Jamaica Fast Food, Hill No 05',
      cuisine: 'Chinese, North Indian',
      type: 'Fast Food'
    },
    {
      name: 'Bistrobuilders',
      image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      location: '27/1 Jamaica Fast Food, Limit Hill No 08',
      cuisine: 'Chinese, North Indian',
      type: 'Fast Food'
    }
  ];
}