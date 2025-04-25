
package tn.esprit.microserviceproject.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.microserviceproject.entities.Evenement;
import tn.esprit.microserviceproject.repositories.EvenementR;
import tn.esprit.microserviceproject.services.EvenementS;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IEvenementS implements EvenementS {

    private final EvenementR evenementRepository;

    @Override
    public List<Evenement> getAllEvenements() {
        return evenementRepository.findAll();
    }

    @Override
    public Optional<Evenement> getEvenementById(Long id) {
        return evenementRepository.findById(id);
    }

    @Override
    public Evenement createEvenement(Evenement evenement) {
        return evenementRepository.save(evenement);
    }

    @Override
    public Evenement updateEvenement(Long id, Evenement evenement) {
        return evenementRepository.findById(id)
                .map(existingEvenement -> {
                    existingEvenement.setNom(evenement.getNom());
                    existingEvenement.setDescription(evenement.getDescription());
                    existingEvenement.setDateDebut(evenement.getDateDebut());
                    existingEvenement.setDateFin(evenement.getDateFin());
                    existingEvenement.setCapaciteMax(evenement.getCapaciteMax());
                    return evenementRepository.save(existingEvenement);
                })
                .orElseThrow(() -> new RuntimeException("Événement non trouvé"));
    }

    @Override
    public void deleteEvenement(Long id) {
        evenementRepository.deleteById(id);
    }

    @Override
    public double calculerMoyenneCapacite() {
        List<Evenement> evenements = evenementRepository.findAll();
        if (evenements.isEmpty()) {
            return 0.0; // Éviter la division par zéro
        }
        double total = evenements.stream().mapToInt(Evenement::getCapaciteMax).sum();
        return total / evenements.size();
    }

}
