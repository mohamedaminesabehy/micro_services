package tn.esprit.microserviceproject.controllers;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microserviceproject.entities.Avis;
import tn.esprit.microserviceproject.repositories.AvisRepository;
import tn.esprit.microserviceproject.services.AvisService;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/avis")
public class AvisRestController {
    @Autowired
    private AvisService avisService;

    @Autowired
    private AvisRepository avisRepository;

    private String escapeCsv(String field) {
        if (field == null) return "";
        if (field.contains(",") || field.contains("\"") || field.contains("\n")) {
            field = field.replace("\"", "\"\"");
            return "\"" + field + "\"";
        }
        return field;
    }


    @GetMapping
    public List<Avis> getAllAvis() {
        return avisService.getAllAvis();
    }

    @GetMapping("/{id}")
    public Optional<Avis> getAvisById(@PathVariable int id) {
        return avisService.getAvisById(id);
    }

    @PostMapping
    public Avis addAvis(@RequestBody Avis avis) {
        return avisService.addAvis(avis);
    }

    @PutMapping("/{id}")
    public Avis updateAvis(@PathVariable int id, @RequestBody Avis avisDetails) {
        return avisService.updateAvis(id, avisDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteAvis(@PathVariable int id) {
        avisService.deleteAvis(id);
    }

    @GetMapping("/average")
    public Map<String, Object> getAverageRating() {
        Double moyenne = avisRepository.getAverageRating();
        double average = moyenne != null ? moyenne : 0.0;

        Map<String, Object> response = new HashMap<>();
        response.put("The average rating is", average);

        return response;
    }

    @GetMapping("/export")
    public void exportAvisToCSV(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        String filename = "avis_export.csv";
        response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\"");

        List<Avis> avisList = avisService.getAllAvis();

        PrintWriter writer = response.getWriter();
        writer.println("ID,Client Name,Note,Comment,Date Submitted,Resolved");

        for (Avis avis : avisList) {
            writer.printf("%d,%s,%d,%s,%s,%s%n",
                    avis.getId(),
                    escapeCsv(avis.getClientNom()),
                    avis.getNote(),
                    escapeCsv(avis.getCommentaire()),
                    avis.getDateSoumission(),
                    avis.isResolu());
        }

        writer.flush();
        writer.close();
    }

    // Get all reviews for a specific recipe
    @GetMapping("/recette/{recetteId}")
    public List<Avis> getAvisByRecetteId(@PathVariable Long recetteId) {
        return avisService.getAvisByRecetteId(recetteId);
    }
    
    // Add a review for a specific recipe
    @PostMapping("/recette/{recetteId}")
    public Avis addAvisForRecette(@PathVariable Long recetteId, @RequestBody Avis avis) {
        return avisService.addAvisForRecette(recetteId, avis);
    }
    
    // Get average rating for a specific recipe
    @GetMapping("/recette/{recetteId}/average")
    public Map<String, Object> getAverageRatingByRecetteId(@PathVariable Long recetteId) {
        Double moyenne = avisService.getAverageRatingByRecetteId(recetteId);
        double average = moyenne != null ? moyenne : 0.0;

        Map<String, Object> response = new HashMap<>();
        response.put("recetteId", recetteId);
        response.put("averageRating", average);

        return response;
    }
}
