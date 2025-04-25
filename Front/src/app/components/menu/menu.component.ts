import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../../models/menu.model';
import { Restaurant } from '../../models/restaurant.model';
import { MenuService } from '../../services/menu.service';
import { RestaurantService } from '../../services/restaurant.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: Menu[] = [];
  restaurant: Restaurant | null = null;
  loading = false;
  errorMessage = '';
  restaurantId: number | null = null;
  selectedMenu: Menu | null = null;

  constructor(
    private menuService: MenuService,
    private restaurantService: RestaurantService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['restaurantId']) {
        this.restaurantId = +params['restaurantId'];
        this.loadRestaurantDetails();
        this.loadMenusByRestaurant(this.restaurantId);
      } else {
        this.loadAllMenus();
      }
    });
  }

  loadRestaurantDetails(): void {
    if (this.restaurantId) {
      this.loading = true;
      this.restaurantService.getRestaurantById(this.restaurantId).subscribe({
        next: (data) => {
          this.restaurant = data.restaurant;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching restaurant details', error);
          this.errorMessage = 'Failed to load restaurant details. Please try again later.';
          this.loading = false;
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

  showDetails(menu: Menu): void {
    this.selectedMenu = menu;
  }

  // Add this method to the MenuComponent class
  addToCart(menu: Menu): void {
    // First try to add to backend
    this.cartService.addMenuToCart(menu.id!, 1).subscribe({
      next: (response) => {
        alert(`${menu.nom} added to your cart!`);
      },
      error: (error) => {
        console.error('Error adding to cart via API', error);
        // Fallback to local storage if API fails
        this.addToLocalCart(menu);
      }
    });
  }

  // Fallback method for local storage
  private addToLocalCart(menu: Menu): void {
    let cart: { item: Menu, quantity: number }[] = [];
    const savedCart = localStorage.getItem('shoppingCart');
    
    if (savedCart) {
      cart = JSON.parse(savedCart);
      
      // Check if item already exists in cart
      const existingItemIndex = cart.findIndex(cartItem => cartItem.item.id === menu.id);
      
      if (existingItemIndex !== -1) {
        // Increase quantity if item already in cart
        cart[existingItemIndex].quantity += 1;
      } else {
        // Add new item to cart
        cart.push({ item: menu, quantity: 1 });
      }
    } else {
      // Create new cart with this item
      cart = [{ item: menu, quantity: 1 }];
    }
    
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    alert(`${menu.nom} added to your cart! (local storage)`);
  }
}
