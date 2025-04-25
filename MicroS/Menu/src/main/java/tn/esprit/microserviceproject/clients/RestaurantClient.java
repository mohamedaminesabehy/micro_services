package tn.esprit.microserviceproject.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "Restaurant")
public interface RestaurantClient {
    
    @GetMapping("/restaurants/{id}")
    ResponseEntity<Object> getRestaurantById(@PathVariable("id") Long id);
}