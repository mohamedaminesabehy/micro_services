
package tn.esprit.microserviceproject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.microserviceproject.entities.Evenement;
import java.util.List;

@Repository
public interface EvenementR extends JpaRepository<Evenement, Long> {

    // Méthode pour récupérer les événements par nom (exemple)
    List<Evenement> findByNomContainingIgnoreCase(String nom);

    // Méthode pour récupérer les événements après une date donnée
    List<Evenement> findByDateDebutAfterOrderByDateDebutAsc(java.time.LocalDateTime date);

}
