package tn.esprit.microserviceproject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microserviceproject.entities.Menu;
import tn.esprit.microserviceproject.services.IMenu;
import tn.esprit.microserviceproject.services.menuService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/menus")
public class menuController {

    @Autowired
    private IMenu iMenu;
    
    @Autowired
    private menuService menuServiceImpl;

    // Create a new menu
    @PostMapping
    public ResponseEntity<Menu> createMenu(@RequestBody Menu menu) {
        Menu createdMenu = iMenu.createMenu(menu);
        return ResponseEntity.ok(createdMenu);
    }
    
    // Create a menu for a specific restaurant
    @PostMapping("/restaurant/{restaurantId}")
    public ResponseEntity<Menu> createMenuForRestaurant(
            @PathVariable Long restaurantId,
            @RequestBody Menu menu) {
        Menu createdMenu = iMenu.createMenuForRestaurant(restaurantId, menu);
        if (createdMenu != null) {
            return ResponseEntity.ok(createdMenu);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get all menus
    @GetMapping
    public ResponseEntity<List<Menu>> getAllMenus() {
        List<Menu> menus = iMenu.getAllMenus();
        return ResponseEntity.ok(menus);
    }
    
    // Get menus by restaurant ID
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Menu>> getMenusByRestaurantId(@PathVariable Long restaurantId) {
        List<Menu> menus = iMenu.getMenusByRestaurantId(restaurantId);
        return ResponseEntity.ok(menus);
    }

    // Get a menu by ID
    @GetMapping("/{id}")
    public ResponseEntity<Menu> getMenuById(@PathVariable Long id) {
        Menu menu = iMenu.getMenuById(id);
        if (menu != null) {
            return ResponseEntity.ok(menu);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update a menu
    @PutMapping("/{id}")
    public ResponseEntity<Menu> updateMenu(@PathVariable Long id, @RequestBody Menu menuDetails) {
        Menu updatedMenu = iMenu.updateMenu(id, menuDetails);
        if (updatedMenu != null) {
            return ResponseEntity.ok(updatedMenu);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a menu by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        iMenu.deleteMenu(id);
        return ResponseEntity.noContent().build();
    }
    
    // Add menu to cart
    @PostMapping("/{id}/add-to-cart")
    public ResponseEntity<String> addMenuToCart(@PathVariable Long id, @RequestBody Map<String, Integer> request) {
        Integer quantity = request.get("quantity");
        if (quantity == null || quantity <= 0) {
            return ResponseEntity.badRequest().body("Invalid quantity");
        }
        
        Menu menu = iMenu.getMenuById(id);
        if (menu == null) {
            return ResponseEntity.notFound().build();
        }
        
        menuServiceImpl.addMenuToCart(id, quantity);
        return ResponseEntity.ok("Menu added to cart successfully");
    }
}
