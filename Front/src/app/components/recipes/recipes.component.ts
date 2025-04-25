import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: any[] = [];
  loading = false;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        this.recipes = data.map((r: any) => ({
          ...r,
          name: r.titre,
          description: r.description,
          image: r.image,
          category: r.category || '',
          cookingTime: r.cookingTime || '',
          rating: r.rating || 0
        }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  viewRecipe(recipe: any) {
    this.router.navigate(['/recipe-details', recipe.id]);
  }
}
