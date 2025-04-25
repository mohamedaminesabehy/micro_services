package tn.esprit.microserviceproject.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("adresse")
    private String adresse;

    @JsonProperty("capacite")
    private int capacite;

    @JsonProperty("image")
    private String image;

    @JsonProperty("nom")
    private String nom;

    @JsonProperty("telephone")
    private int telephone;

    // Constructeur par défaut
    public Restaurant() {
    }

    // Constructeur avec tous les champs
    public Restaurant(Long id, String adresse, int capacite, String image, String nom, int telephone) {
        this.id = id;
        this.adresse = adresse;
        this.capacite = capacite;
        this.image = image;
        this.nom = nom;
        this.telephone = telephone;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public int getCapacite() {
        return capacite;
    }

    public void setCapacite(int capacite) {
        this.capacite = capacite;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public int getTelephone() {
        return telephone;
    }

    public void setTelephone(int telephone) {
        this.telephone = telephone;
    }

    // Méthode toString
    @Override
    public String toString() {
        return "Restaurant{" +
                "id=" + id +
                ", adresse='" + adresse + '\'' +
                ", capacite=" + capacite +
                ", image='" + image + '\'' +
                ", nom='" + nom + '\'' +
                ", telephone=" + telephone +
                '}';
    }
}