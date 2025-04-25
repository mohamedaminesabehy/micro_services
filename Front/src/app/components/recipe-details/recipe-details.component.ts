import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: any = null;
  reviews: any[] = [];
  averageRating: number | null = null;
  newReview = { clientNom: '', note: 5, commentaire: '' };
  recetteId: number = 0;
  loading = false;
  ingredientsList: string[] = [];
  instructionsList: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.recetteId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchRecipeAndReviews();
  }

  fetchRecipeAndReviews() {
    this.loading = true;
    this.recipeService.getRecipeWithAvis(this.recetteId).subscribe({
      next: (data) => {
        this.recipe = data.recette;
        // Split ingredients and instructions if they are strings
        this.ingredientsList = this.recipe.ingredients
          ? this.recipe.ingredients.split('\n').filter((i: string) => i.trim() !== '')
          : [];
        this.instructionsList = this.recipe.etape
          ? this.recipe.etape.split('\n').filter((i: string) => i.trim() !== '')
          : [];
        this.reviews = data.avis;
        this.averageRating = data.averageRating;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  addReview() {
    if (!this.newReview.clientNom || !this.newReview.commentaire) return;
    this.reviewService.addReview(this.recetteId, this.newReview).subscribe({
      next: () => {
        this.newReview = { clientNom: '', note: 5, commentaire: '' };
        this.fetchRecipeAndReviews();
      }
    });
  }

  getRoundedAverage(): number {
    return Math.round(this.averageRating ?? 0);
  }

  getStars(n: number): any[] {
    return Array(n);
  }

  downloadPdf() {
    if (!this.recipe?.id) return;
    this.recipeService.downloadRecipePdf(this.recipe.id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recette_${this.recipe.id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
