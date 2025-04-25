package tn.esprit.microserviceproject.services;

import tn.esprit.microserviceproject.entities.Menu;

import java.util.List;

public interface IMenu {
    Menu createMenu(Menu menu);
    Menu createMenuForRestaurant(Long restaurantId, Menu menu);
    List<Menu> getAllMenus();
    List<Menu> getMenusByRestaurantId(Long restaurantId);
    Menu getMenuById(Long id);
    Menu updateMenu(Long id, Menu menuDetails);
    void deleteMenu(Long id);
}
