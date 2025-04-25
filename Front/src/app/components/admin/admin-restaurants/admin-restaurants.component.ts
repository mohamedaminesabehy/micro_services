import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from '../../../models/restaurant.model';
import { RestaurantService } from '../../../services/restaurant.service';

@Component({
  selector: 'app-admin-restaurants',
  templateUrl: './admin-restaurants.component.html',
  styleUrls: ['./admin-restaurants.component.css']
})
export class AdminRestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  restaurantForm: FormGroup;
  isEditing = false;
  currentRestaurantId: number | null = null;
  loading = false;
  errorMessage = '';
  imagePreview: string | null = null;

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
  ) {
    this.restaurantForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      capacite: [0, [Validators.required, Validators.min(1)]],
      image: ['', Validators.required],
      telephone: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.loading = true;
    this.restaurantService.getAllRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching restaurants', error);
        this.errorMessage = 'Failed to load restaurants. Please try again later.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.restaurantForm.invalid) {
      return;
    }

    const restaurant: Restaurant = this.restaurantForm.value;
    
    if (this.isEditing && this.currentRestaurantId) {
      this.restaurantService.updateRestaurant(this.currentRestaurantId, restaurant).subscribe({
        next: () => {
          this.loadRestaurants();
          this.resetForm();
          // Close modal
          document.getElementById('closeEditModal')?.click();
        },
        error: (error) => {
          console.error('Error updating restaurant', error);
          this.errorMessage = 'Failed to update restaurant. Please try again.';
        }
      });
    } else {
      this.restaurantService.createRestaurant(restaurant).subscribe({
        next: () => {
          this.loadRestaurants();
          this.resetForm();
          // Close modal
          document.getElementById('closeAddModal')?.click();
        },
        error: (error) => {
          console.error('Error creating restaurant', error);
          this.errorMessage = 'Failed to create restaurant. Please try again.';
        }
      });
    }
  }

  editRestaurant(restaurant: Restaurant): void {
    this.isEditing = true;
    this.currentRestaurantId = restaurant.id!;
    this.restaurantForm.patchValue({
      nom: restaurant.nom,
      adresse: restaurant.adresse,
      capacite: restaurant.capacite,
      image: restaurant.image,
      telephone: restaurant.telephone
    });
    this.imagePreview = restaurant.image ? restaurant.image : null;
  }

  // Add this method to handle image selection
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      // For demo: just use the file name as if it's in assets/images/
      const imagePath = `assets/images/${file.name}`;
      this.restaurantForm.patchValue({ image: imagePath });
      this.imagePreview = imagePath;

      // If you want to preview the actual file before uploading to assets/images,
      // you can use FileReader (optional, for local preview):
      // const reader = new FileReader();
      // reader.onload = (e: any) => {
      //   this.imagePreview = e.target.result;
      // };
      // reader.readAsDataURL(file);
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentRestaurantId = null;
    this.restaurantForm.reset({
      capacite: 0,
      telephone: 0
    });
    this.errorMessage = '';
    this.imagePreview = null;
  }

  deleteRestaurant(id: number): void {
    if (confirm('Are you sure you want to delete this restaurant?')) {
      this.restaurantService.deleteRestaurant(id).subscribe({
        next: () => {
          this.loadRestaurants();
        },
        error: (error) => {
          console.error('Error deleting restaurant', error);
          this.errorMessage = 'Failed to delete restaurant. Please try again.';
        }
      });
    }
  }

  viewMenus(restaurantId: number): void {
    // Navigate to menu component with restaurant ID
    // This will be implemented in the routing update
  }
}
