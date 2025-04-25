
package tn.esprit.microserviceproject.services;

import tn.esprit.microserviceproject.entities.Evenement;
import java.util.List;
import java.util.Optional;

public interface EvenementS {
    List<Evenement> getAllEvenements();

    Optional<Evenement> getEvenementById(Long id);

    Evenement createEvenement(Evenement evenement);

    Evenement updateEvenement(Long id, Evenement evenement);

    void deleteEvenement(Long id);

    double calculerMoyenneCapacite();

}
