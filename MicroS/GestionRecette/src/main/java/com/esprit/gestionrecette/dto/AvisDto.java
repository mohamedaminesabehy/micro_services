package com.esprit.gestionrecette.dto;

import java.time.LocalDateTime;

public class AvisDto {
    private int id;
    private String clientNom;
    private int note;
    private String commentaire;
    private LocalDateTime dateSoumission;
    private boolean resolu;
    private Long recetteId;
    
    // Constructors, getters, and setters
    
    public AvisDto() {
    }
    
    // Getters and setters
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public String getClientNom() {
        return clientNom;
    }
    
    public void setClientNom(String clientNom) {
        this.clientNom = clientNom;
    }
    
    public int getNote() {
        return note;
    }
    
    public void setNote(int note) {
        this.note = note;
    }
    
    public String getCommentaire() {
        return commentaire;
    }
    
    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }
    
    public LocalDateTime getDateSoumission() {
        return dateSoumission;
    }
    
    public void setDateSoumission(LocalDateTime dateSoumission) {
        this.dateSoumission = dateSoumission;
    }
    
    public boolean isResolu() {
        return resolu;
    }
    
    public void setResolu(boolean resolu) {
        this.resolu = resolu;
    }
    
    public Long getRecetteId() {
        return recetteId;
    }
    
    public void setRecetteId(Long recetteId) {
        this.recetteId = recetteId;
    }
}