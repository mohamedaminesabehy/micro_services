package tn.esprit.microserviceproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.microserviceproject.entities.Menu;
import tn.esprit.microserviceproject.repositories.menuRepository;
import tn.esprit.microserviceproject.clients.RestaurantClient;

import java.util.List;

@Service
public class menuService implements IMenu {

    @Autowired
    private menuRepository menuRepository;

    @Autowired
    private EmailService emailService;
    
    @Autowired
    private RestaurantClient restaurantClient;
    
    @Autowired
    private RabbitMQSender rabbitMQSender;

    @Override
    public Menu createMenu(Menu menu) {
        Menu savedMenu = menuRepository.save(menu);

        // Send Email Notification for new menu
        String subject = "New Menu Added: " + menu.getNom();
        String body = "A new menu has been added:\n\n" +
                "Name: " + menu.getNom() + "\n" +
                "Price: $" + menu.getPrix() + "\n" +
                "Description: " + menu.getDescription();
        emailService.sendEmail(subject, body);
        
        // Send RabbitMQ message for menu creation
        rabbitMQSender.sendMenuUpdate(savedMenu, "created");

        return savedMenu;
    }
    
    @Override
    public Menu createMenuForRestaurant(Long restaurantId, Menu menu) {
        // Verify restaurant exists by calling Restaurant service
        var restaurantResponse = restaurantClient.getRestaurantById(restaurantId);
        if (restaurantResponse.getStatusCode().is2xxSuccessful()) {
            menu.setRestaurantId(restaurantId);
            return createMenu(menu);
        }
        return null; // Or throw an exception
    }

    @Override
    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }
    
    @Override
    public List<Menu> getMenusByRestaurantId(Long restaurantId) {
        // Implement a method in repository to find menus by restaurantId
        return menuRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public Menu getMenuById(Long id) {
        return menuRepository.findById(id).orElse(null);
    }

    @Override
    public Menu updateMenu(Long id, Menu menuDetails) {
        Menu existingMenu = menuRepository.findById(id).orElse(null);

        if (existingMenu == null) {
            return null; // or throw an exception
        }

        // Check if the price has changed
        boolean isPriceChanged = existingMenu.getPrix() != menuDetails.getPrix();

        // Update fields
        existingMenu.setNom(menuDetails.getNom());
        existingMenu.setImage(menuDetails.getImage());
        existingMenu.setCalories(menuDetails.getCalories());
        existingMenu.setPrix(menuDetails.getPrix());
        existingMenu.setDescription(menuDetails.getDescription());
        // Preserve the restaurant ID
        if (menuDetails.getRestaurantId() != null) {
            existingMenu.setRestaurantId(menuDetails.getRestaurantId());
        }

        Menu updatedMenu = menuRepository.save(existingMenu);

        // Send Email Notification only if the price has changed
        if (isPriceChanged) {
            String subject = "Menu Price Updated: " + existingMenu.getNom();
            String body = "The price of the menu '" + existingMenu.getNom() + "' has been updated.\n" +
                    "New Price: $" + existingMenu.getPrix() + "\n" +
                    "Description: " + existingMenu.getDescription();
            emailService.sendEmail(subject, body);
        }
        
        // Send RabbitMQ message for menu update
        rabbitMQSender.sendMenuUpdate(updatedMenu, "updated");

        return updatedMenu;
    }

    @Override
    public void deleteMenu(Long id) {
        Menu menu = menuRepository.findById(id).orElse(null);
        if (menu != null) {
            // Send RabbitMQ message for menu deletion before deleting
            rabbitMQSender.sendMenuUpdate(menu, "deleted");
            menuRepository.deleteById(id);
        }
    }
    
    public void addMenuToCart(Long menuId, int quantity) {
        Menu menu = menuRepository.findById(menuId).orElse(null);
        if (menu != null) {
            rabbitMQSender.sendAddToCartRequest(menuId, quantity);
        }
    }
}