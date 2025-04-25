import { Component } from '@angular/core';

@Component({
  selector: 'app-top-meals',
  templateUrl: './top-meals.component.html',
  styleUrls: ['./top-meals.component.css']
})
export class TopMealsComponent {
  topMeals = [
    {
      name: 'French Fries',
      image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      price: 3.50
    },
    {
      name: 'Sweet Bread',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      price: 2.75
    },
    {
      name: 'Classic French Fries',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      price: 3.80
    },
    {
      name: 'Hamburger',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      price: 4.20
    },
    {
      name: 'Chicken Nuggets',
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      price: 4.50
    }
  ];
}