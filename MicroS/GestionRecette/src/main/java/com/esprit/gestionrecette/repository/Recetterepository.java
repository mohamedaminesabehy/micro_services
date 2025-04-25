package com.esprit.gestionrecette.repository;

import com.esprit.gestionrecette.entites.Recette;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Recetterepository extends JpaRepository<Recette, Long> {

}
