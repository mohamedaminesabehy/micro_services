import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../../../models/menu.model';
import { Restaurant } from '../../../models/restaurant.model';
import { MenuService } from '../../../services/menu.service';
import { RestaurantService } from '../../../services/restaurant.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  menuItems: Menu[] = [];
  restaurants: Restaurant[] = [];
  menuForm: FormGroup;
  isEditing = false;
  currentMenuId: number | null = null;
  loading = false;
  errorMessage = '';
  selectedRestaurantId: number | null = null;
  currentRestaurant: Restaurant | null = null;
  imagePreview: string | null = null;

  constructor(
    private menuService: MenuService,
    private restaurantService: RestaurantService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.menuForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0.01)]],
      calories: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      restaurantId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRestaurants();
    
    // Check if we're viewing menus for a specific restaurant
    this.route.queryParams.subscribe(params => {
      if (params['restaurantId']) {
        this.selectedRestaurantId = +params['restaurantId'];
        this.loadRestaurantDetails();
        this.loadMenusByRestaurant(this.selectedRestaurantId);
      } else {
        this.loadAllMenus();
      }
    });
  }

  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data;
      },
      error: (error) => {
        console.error('Error fetching restaurants', error);
      }
    });
  }

  loadRestaurantDetails(): void {
    if (this.selectedRestaurantId) {
      this.restaurantService.getRestaurantById(this.selectedRestaurantId).subscribe({
        next: (data) => {
          this.currentRestaurant = data.restaurant;
        },
        error: (error) => {
          console.error('Error fetching restaurant details', error);
        }
      });
    }
  }

  loadAllMenus(): void {
    this.loading = true;
    this.menuService.getAllMenus().subscribe({
      next: (data) => {
        this.menuItems = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching menus', error);
        this.errorMessage = 'Failed to load menus. Please try again later.';
        this.loading = false;
      }
    });
  }

  loadMenusByRestaurant(restaurantId: number): void {
    this.loading = true;
    this.menuService.getMenusByRestaurantId(restaurantId).subscribe({
      next: (data) => {
        this.menuItems = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching menus for restaurant', error);
        this.errorMessage = 'Failed to load menus for this restaurant. Please try again later.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.menuForm.invalid) {
      return;
    }

    const menu: Menu = this.menuForm.value;
    
    if (this.isEditing && this.currentMenuId) {
      this.menuService.updateMenu(this.currentMenuId, menu).subscribe({
        next: () => {
          this.refreshMenus();
          this.resetForm();
          // Close modal
          document.getElementById('closeEditModal')?.click();
        },
        error: (error) => {
          console.error('Error updating menu', error);
          this.errorMessage = 'Failed to update menu. Please try again.';
        }
      });
    } else {
      // If we're in restaurant context, use that ID
      if (this.selectedRestaurantId && !menu.restaurantId) {
        menu.restaurantId = this.selectedRestaurantId;
      }
      
      this.menuService.createMenu(menu).subscribe({
        next: () => {
          this.refreshMenus();
          this.resetForm();
          // Close modal
          document.getElementById('closeAddModal')?.click();
        },
        error: (error) => {
          console.error('Error creating menu', error);
          this.errorMessage = 'Failed to create menu. Please try again.';
        }
      });
    }
  }

  refreshMenus(): void {
    if (this.selectedRestaurantId) {
      this.loadMenusByRestaurant(this.selectedRestaurantId);
    } else {
      this.loadAllMenus();
    }
  }

  editMenu(menu: Menu): void {
    this.isEditing = true;
    this.currentMenuId = menu.id!;
    this.menuForm.patchValue({
      nom: menu.nom,
      description: menu.description,
      prix: menu.prix,
      calories: menu.calories,
      image: menu.image,
      restaurantId: menu.restaurantId
    });
    this.imagePreview = menu.image ? menu.image : null;
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const imagePath = `assets/images/${file.name}`;
      this.menuForm.patchValue({ image: imagePath });
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
    this.currentMenuId = null;
    this.menuForm.reset({
      prix: 0,
      calories: 0,
      restaurantId: this.selectedRestaurantId || null
    });
    this.errorMessage = '';
    this.imagePreview = null;
  }
  deleteMenu(id: number): void {
    if (confirm('Are you sure you want to delete this menu item?')) {
      this.menuService.deleteMenu(id).subscribe({
        next: () => {
          this.refreshMenus();
        },
        error: (error) => {
          console.error('Error deleting menu', error);
          this.errorMessage = 'Failed to delete menu. Please try again.';
        }
      });
    }
  }
}
