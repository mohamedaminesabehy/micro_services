package tn.esprit.microserviceproject.services;

import tn.esprit.microserviceproject.repositories.restauRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.microserviceproject.entities.Restaurant;

import java.util.List;

@Service
public class restauService implements IRestau {
    @Autowired
    private restauRepository restauRepository;
    @Autowired
    private SmsService twilioService;

    @Override
    public Restaurant createRestaurant(Restaurant restaurant) {
        return restauRepository.save(restaurant);
    }

    @Override
    public List<Restaurant> getAllrestaus() {
        return restauRepository.findAll();
    }

    @Override
    public Restaurant getRestaurantById(Long id) {
        return restauRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + id));
    }

    @Override
    public void deleteRestaurant(Long id) {
        restauRepository.deleteById(id);
    }

    @Override
    public Restaurant updateRestaurant(Long id, Restaurant restaurantDetails) {
        // Retrieve the existing restaurant
        Restaurant existingRestaurant = restauRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + id));

        // Check if the address has changed
        boolean isAddressChanged = !existingRestaurant.getAdresse().equals(restaurantDetails.getAdresse());

        // Update the restaurant properties
        existingRestaurant.setNom(restaurantDetails.getNom());
        existingRestaurant.setAdresse(restaurantDetails.getAdresse());
        existingRestaurant.setCapacite(restaurantDetails.getCapacite());
        existingRestaurant.setImage(restaurantDetails.getImage());
        existingRestaurant.setTelephone(restaurantDetails.getTelephone());

        // Save the updated restaurant
        Restaurant savedResto = restauRepository.save(existingRestaurant);

        // Send SMS if the address has changed
        if (isAddressChanged) {
            String smsMessage = String.format(
                    "The address has been updated!\nNom: %s\nAdresse: %s",
                    savedResto.getNom(),
                    savedResto.getAdresse()
            );

            // Retrieve the recipient phone number from configuration
            String recipientPhoneNumber = "+21621624277"; // Replace with @Value if needed

            // Send SMS
            twilioService.sendSms(recipientPhoneNumber, smsMessage);
        }

        return savedResto;
    }
}