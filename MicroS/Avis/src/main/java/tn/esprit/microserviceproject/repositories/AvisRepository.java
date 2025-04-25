package tn.esprit.microserviceproject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.microserviceproject.entities.Avis;

import java.util.List;

public interface AvisRepository extends JpaRepository<Avis,Integer> {
    @Query("SELECT AVG(a.note) FROM Avis a")
    Double getAverageRating();
    
    // Find reviews by recette ID
    List<Avis> findByRecetteId(Long recetteId);
    
    // Get average rating for a specific recipe
    @Query("SELECT AVG(a.note) FROM Avis a WHERE a.recetteId = ?1")
    Double getAverageRatingByRecetteId(Long recetteId);
}
