import { Component } from '@angular/core';

@Component({
  selector: 'app-food-categories',
  templateUrl: './food-categories.component.html',
  styleUrls: ['./food-categories.component.css']
})
export class FoodCategoriesComponent {
  foodCategories = [
    {
      name: 'Pizza',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      restaurants: 18
    },
    {
      name: 'Cheese Burger',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      restaurants: 8
    },
    {
      name: 'Club Sandwich',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      restaurants: 9
    },
    {
      name: 'Grilled Chicken',
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      restaurants: 5
    },
    {
      name: 'Idli, Sambar',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      restaurants: 6
    }
  ];
}