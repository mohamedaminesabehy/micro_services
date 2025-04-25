package tn.esprit.microserviceproject.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;

@Table(name = "evenement") // Use lowercase for table names (best practice)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Evenement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String nom;

    @Column(columnDefinition = "TEXT")
    String description;

    @Column(nullable = false)
    LocalDateTime dateDebut;

    @Column(nullable = false)
    LocalDateTime dateFin;

    @Column(nullable = false)
    int capaciteMax; // Nombre maximal de participants

}
