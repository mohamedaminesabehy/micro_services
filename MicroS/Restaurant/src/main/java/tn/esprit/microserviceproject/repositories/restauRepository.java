package tn.esprit.microserviceproject.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.microserviceproject.entities.Restaurant;

public interface restauRepository extends JpaRepository<Restaurant, Long> {

}
