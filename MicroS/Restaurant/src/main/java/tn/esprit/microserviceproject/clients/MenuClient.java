package tn.esprit.microserviceproject.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@FeignClient(name = "Menu")
public interface MenuClient {
    
    @GetMapping("/menus/restaurant/{restaurantId}")
    ResponseEntity<List<Object>> getMenusByRestaurantId(@PathVariable("restaurantId") Long restaurantId);
    
    @PostMapping("/menus/restaurant/{restaurantId}")
    ResponseEntity<Object> createMenuForRestaurant(@PathVariable("restaurantId") Long restaurantId, @RequestBody Object menu);
}