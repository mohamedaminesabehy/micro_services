package tn.esprit.microserviceproject.services;

import tn.esprit.microserviceproject.entities.Restaurant;

import java.util.List;

public interface IRestau {
   Restaurant createRestaurant(Restaurant restaurant);

    // Get all menus
    List<Restaurant> getAllrestaus();

    // Get a menu by ID
    Restaurant getRestaurantById(Long id);

    // Update a menu
   // Restaurant updateRestaurant(Long id, Restaurant menuDetails);

    // Delete a menu by ID
    Restaurant updateRestaurant(Long id, Restaurant restaurantDetails);

 void deleteRestaurant(Long id);

}
