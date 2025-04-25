package tn.esprit.microserviceproject.services;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.microserviceproject.config.RabbitMQConfig;
import tn.esprit.microserviceproject.entities.Menu;

import java.util.HashMap;
import java.util.Map;

@Service
public class RabbitMQSender {

    @Autowired
    private AmqpTemplate rabbitTemplate;

    public void sendMenuUpdate(Menu menu, String action) {
        Map<String, Object> message = new HashMap<>();
        message.put("action", action);
        message.put("menuId", menu.getId());
        message.put("nom", menu.getNom());
        message.put("prix", menu.getPrix());
        message.put("description", menu.getDescription());
        message.put("image", menu.getImage());
        message.put("restaurantId", menu.getRestaurantId());
        
        rabbitTemplate.convertAndSend(RabbitMQConfig.MENU_EXCHANGE, RabbitMQConfig.MENU_ROUTING_KEY, message);
        System.out.println("Menu " + action + " message sent: " + menu.getId());
    }
    
    public void sendAddToCartRequest(Long menuId, int quantity) {
        Map<String, Object> message = new HashMap<>();
        message.put("menuId", menuId);
        message.put("quantity", quantity);
        
        rabbitTemplate.convertAndSend(RabbitMQConfig.MENU_EXCHANGE, RabbitMQConfig.ADD_TO_CART_ROUTING_KEY, message);
        System.out.println("Add to cart request sent for menu: " + menuId + " with quantity: " + quantity);
    }
}