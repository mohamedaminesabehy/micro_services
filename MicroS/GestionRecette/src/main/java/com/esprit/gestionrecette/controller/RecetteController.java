package com.esprit.gestionrecette.controller;

import com.esprit.gestionrecette.client.AvisClient;
import com.esprit.gestionrecette.entites.Recette;
import com.esprit.gestionrecette.service.PdfService;
import com.esprit.gestionrecette.service.RecetteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/recettes")
public class RecetteController {

    @Autowired
    private RecetteService recetteService;

    @Autowired
    private PdfService pdfService;
    
    @Autowired
    private AvisClient avisClient;

    // Créer une recette
    @PostMapping
    public Recette createRecette(@RequestBody Recette recette) {
        return recetteService.createRecette(recette);
    }

    // Lire toutes les recettes
    @GetMapping
    public List<Recette> getAllRecettes() {
        return recetteService.getAllRecettes();
    }

    // Lire une recette par son ID
    @GetMapping("update/{id}")
    public Optional<Recette> getRecetteById(@PathVariable Long id) {
        return recetteService.getRecetteById(id);
    }

    // Mettre à jour une recette
    @PutMapping("/{id}")
    public Recette updateRecette(@PathVariable Long id, @RequestBody Recette recetteDetails) {
        return recetteService.updateRecette(id, recetteDetails);
    }


    // Supprimer une recette
    @DeleteMapping("delete/{id}")
    public void deleteRecette(@PathVariable Long id) {
        recetteService.deleteRecette(id);
    }


    // Télécharger une recette en PDF
    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadRecettePdf(@PathVariable Long id) throws IOException {
        Optional<Recette> recetteOptional = recetteService.getRecetteById(id);
        if (recetteOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        byte[] pdfBytes = pdfService.generatePdfForRecette(recetteOptional.get());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=recette_" + id + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }

    // Lire une recette par son ID avec ses avis
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getRecetteWithAvis(@PathVariable Long id) {
        Optional<Recette> recetteOptional = recetteService.getRecetteById(id);
        
        if (recetteOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        // Get the recipe
        Recette recette = recetteOptional.get();
        
        // Get reviews for this recipe using Feign client
        List<Object> avis = avisClient.getAvisByRecetteId(id);
        
        // Get average rating for this recipe
        Map<String, Object> averageRating = avisClient.getAverageRatingByRecetteId(id);
        
        // Create response with recipe and its reviews
        Map<String, Object> response = new HashMap<>();
        response.put("recette", recette);
        response.put("avis", avis);
        response.put("averageRating", averageRating.get("averageRating"));
        
        return ResponseEntity.ok(response);
    }
    
    // Ajouter un avis pour une recette
    @PostMapping("/{id}/avis")
    public ResponseEntity<Object> addAvisForRecette(@PathVariable Long id, @RequestBody Object avis) {
        // Check if recipe exists
        Optional<Recette> recetteOptional = recetteService.getRecetteById(id);
        
        if (recetteOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        // Add review for this recipe using Feign client
        Object createdAvis = avisClient.addAvisForRecette(id, avis);
        
        return ResponseEntity.ok(createdAvis);
    }
    
    // Get all reviews for a recipe
    @GetMapping("/{id}/avis")
    public ResponseEntity<List<Object>> getAvisForRecette(@PathVariable Long id) {
        // Check if recipe exists
        Optional<Recette> recetteOptional = recetteService.getRecetteById(id);
        
        if (recetteOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        // Get reviews for this recipe using Feign client
        List<Object> avis = avisClient.getAvisByRecetteId(id);
        
        return ResponseEntity.ok(avis);
    }
}


