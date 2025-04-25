package com.esprit.gestionrecette.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@FeignClient(name = "Avis")
public interface AvisClient {
    
    @GetMapping("/avis/recette/{recetteId}")
    List<Object> getAvisByRecetteId(@PathVariable("recetteId") Long recetteId);
    
    @PostMapping("/avis/recette/{recetteId}")
    Object addAvisForRecette(@PathVariable("recetteId") Long recetteId, @RequestBody Object avis);
    
    @GetMapping("/avis/recette/{recetteId}/average")
    Map<String, Object> getAverageRatingByRecetteId(@PathVariable("recetteId") Long recetteId);
}