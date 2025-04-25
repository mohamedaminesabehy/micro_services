import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit {
  recipes: any[] = [];
  selectedRecipe: any = null;
  isAddModalOpen = false;
  isEditModalOpen = false;
  isDeleteModalOpen = false;

  recipeForm: any = {
    id: 0,
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
    image: '',
    prepTime: '',
    cookTime: '',
    servings: 0,
    difficulty: 'Medium'
  };

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        this.recipes = data.map((r: any) => ({
          ...r,
          name: r.titre,
          ingredients: r.ingredients ? r.ingredients.split('\n') : [],
          instructions: r.etape ? r.etape.split('\n') : [],
          image: r.image,
          description: r.description,
          prepTime: r.prepTime || '',
          cookTime: r.cookTime || '',
          servings: r.servings || 0,
          difficulty: r.difficulty || 'Medium'
        }));
      }
    });
  }

  openAddModal() {
    this.resetForm();
    this.isAddModalOpen = true;
  }

  openEditModal(recipe: any) {
    this.selectedRecipe = recipe;
    this.recipeForm = {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients.join('\n'),
      instructions: recipe.instructions.join('\n'),
      image: recipe.image,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty
    };
    this.isEditModalOpen = true;
  }

  openDeleteModal(recipe: any) {
    this.selectedRecipe = recipe;
    this.isDeleteModalOpen = true;
  }

  closeModals() {
    this.isAddModalOpen = false;
    this.isEditModalOpen = false;
    this.isDeleteModalOpen = false;
  }

  resetForm() {
    this.recipeForm = {
      id: 0,
      name: '',
      description: '',
      ingredients: '',
      instructions: '',
      image: '',
      prepTime: '',
      cookTime: '',
      servings: 0,
      difficulty: 'Medium'
    };
  }

  addRecipe() {
    const newRecipe = {
      titre: this.recipeForm.name,
      description: this.recipeForm.description,
      ingredients: this.recipeForm.ingredients, // string, each ingredient on a new line
      etape: this.recipeForm.instructions,      // string, each step on a new line
      image: this.recipeForm.image
    };
    this.recipeService.addRecipe(newRecipe).subscribe(() => {
      this.loadRecipes();
      this.closeModals();
      this.resetForm();
    });
  }

  updateRecipe() {
    const updatedRecipe = {
      titre: this.recipeForm.name,
      description: this.recipeForm.description,
      ingredients: this.recipeForm.ingredients,
      etape: this.recipeForm.instructions,
      image: this.recipeForm.image
    };
    this.recipeService.updateRecipe(this.selectedRecipe.id, updatedRecipe).subscribe(() => {
      this.loadRecipes();
      this.closeModals();
    });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.selectedRecipe.id).subscribe(() => {
      this.loadRecipes();
      this.closeModals();
    });
  }

  onImageSelected(event: any, mode: 'add' | 'edit') {
    const file: File = event.target.files[0];
    if (file) {
      // Only set the path, actual upload to assets/images must be handled manually or via backend
      const imagePath = `assets/images/${file.name}`;
      this.recipeForm.image = imagePath;
    }
  }

  getImageSrc(image: string): string {
    // If image is already a full URL, return as is; otherwise, treat as assets path
    if (image && (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('assets/'))) {
      return image;
    }
    return `assets/images/${image}`;
  }
}
