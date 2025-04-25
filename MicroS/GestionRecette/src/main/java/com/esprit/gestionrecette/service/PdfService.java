package com.esprit.gestionrecette.service;

import com.esprit.gestionrecette.entites.Recette;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class PdfService {

    public byte[] generatePdfForRecette(Recette recette) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(byteArrayOutputStream);
        PdfDocument pdfDocument = new PdfDocument(writer);
        Document document = new Document(pdfDocument);

        // Ajout des détails de la recette dans le PDF
        document.add(new Paragraph("Recette : " + recette.getTitre()).setBold().setFontSize(18));
        document.add(new Paragraph("Description :\n" + recette.getDescription()).setFontSize(12));
        document.add(new Paragraph("Ingrédients :\n" + recette.getIngredients()).setFontSize(12));
        document.add(new Paragraph("Étapes :\n" + recette.getEtape()).setFontSize(12));

        document.close();
        return byteArrayOutputStream.toByteArray();
    }
}
