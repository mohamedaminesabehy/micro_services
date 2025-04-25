package tn.esprit.microserviceproject.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "menus")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("image")
    private String image;

    @JsonProperty("nom")
    private String nom;

    @JsonProperty("calories")
    private int calories;

    @JsonProperty("prix")
    private double prix;

    @JsonProperty("description")
    private String description;
    
    @JsonProperty("restaurantId")
    private Long restaurantId;

    // No-argument constructor
    public Menu() {
    }

    // Constructor with all fields
    public Menu(Long id, String image, String nom, int calories, double prix, String description, Long restaurantId) {
        this.id = id;
        this.image = image;
        this.nom = nom;
        this.calories = calories;
        this.prix = prix;
        this.description = description;
        this.restaurantId = restaurantId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    // Update toString method
    @Override
    public String toString() {
        return "Menu{" +
                "id=" + id +
                ", image='" + image + '\'' +
                ", nom='" + nom + '\'' +
                ", calories=" + calories +
                ", prix=" + prix +
                ", description='" + description + '\'' +
                ", restaurantId=" + restaurantId +
                '}';
    }
}
