package tn.esprit.microserviceproject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microserviceproject.entities.Restaurant;
import tn.esprit.microserviceproject.services.IRestau;
import tn.esprit.microserviceproject.clients.MenuClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/restaurants")
public class restauController {

    @Autowired
    private IRestau restauService;
    
    @Autowired
    private MenuClient menuClient;

    // Create a new restaurant
    @PostMapping
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant) {
        Restaurant createdRestaurant = restauService.createRestaurant(restaurant);
        return new ResponseEntity<>(createdRestaurant, HttpStatus.CREATED);
    }

    // Get all restaurants
    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        List<Restaurant> restaurants = restauService.getAllrestaus();
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

    // Get a restaurant by ID with its menus
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getRestaurantById(@PathVariable Long id) {
        Restaurant restaurant = restauService.getRestaurantById(id);
        if (restaurant != null) {
            // Get menus for this restaurant
            ResponseEntity<List<Object>> menusResponse = menuClient.getMenusByRestaurantId(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("restaurant", restaurant);
            response.put("menus", menusResponse.getBody());
            
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update a restaurant by ID
    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @RequestBody Restaurant restaurantDetails) {
        Restaurant updatedRestaurant = restauService.updateRestaurant(id, restaurantDetails);
        if (updatedRestaurant != null) {
            return new ResponseEntity<>(updatedRestaurant, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a restaurant by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
        restauService.deleteRestaurant(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    // Add a menu to a restaurant
    @PostMapping("/{id}/menus")
    public ResponseEntity<Object> addMenuToRestaurant(@PathVariable Long id, @RequestBody Object menu) {
        // First check if restaurant exists
        Restaurant restaurant = restauService.getRestaurantById(id);
        if (restaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        // Use Feign client to create menu for this restaurant
        return menuClient.createMenuForRestaurant(id, menu);
    }
    
    // Get menus for a restaurant
    @GetMapping("/{id}/menus")
    public ResponseEntity<List<Object>> getRestaurantMenus(@PathVariable Long id) {
        // First check if restaurant exists
        Restaurant restaurant = restauService.getRestaurantById(id);
        if (restaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        // Use Feign client to get menus for this restaurant
        return menuClient.getMenusByRestaurantId(id);
    }
}