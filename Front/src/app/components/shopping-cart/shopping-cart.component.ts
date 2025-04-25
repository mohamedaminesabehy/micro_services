import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  taxRate: number = 0.08; // 8% tax rate
  loading: boolean = true;
  error: string = '';

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.loading = true;
    this.cartService.cartItems$.subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotals();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading cart items', err);
        this.error = 'Failed to load cart items. Using default items instead.';
        this.addDefaultItems();
        this.loading = false;
      }
    });
  }

  // Add default static items to the cart (fallback)
  addDefaultItems(): void {
    this.cartItems = [
      {
        nom: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
        prix: 12.99,
        quantite: 1,
        menuId: 1,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        restaurantId: 1
      },
      {
        nom: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan cheese',
        prix: 8.50,
        quantite: 2,
        menuId: 2,
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        restaurantId: 1
      },
      {
        nom: 'Chocolate Brownie',
        description: 'Rich chocolate brownie with vanilla ice cream',
        prix: 6.99,
        quantite: 1,
        menuId: 3,
        image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        restaurantId: 1
      }
    ];
    
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce((sum, current) => 
      sum + (current.prix * current.quantite), 0);
    this.tax = this.subtotal * this.taxRate;
    this.total = this.subtotal + this.tax;
  }

  increaseQuantity(item: CartItem): void {
    if (item._id) {
      // Update via API
      const updatedItem = { ...item, quantite: item.quantite + 1 };
      this.cartService.updateItem(item._id, updatedItem).subscribe({
        error: (err) => {
          console.error('Error updating quantity', err);
          // Fallback: update locally
          item.quantite++;
          this.calculateTotals();
        }
      });
    } else {
      // Update locally only
      item.quantite++;
      this.calculateTotals();
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantite > 1) {
      if (item._id) {
        // Update via API
        const updatedItem = { ...item, quantite: item.quantite - 1 };
        this.cartService.updateItem(item._id, updatedItem).subscribe({
          error: (err) => {
            console.error('Error updating quantity', err);
            // Fallback: update locally
            item.quantite--;
            this.calculateTotals();
          }
        });
      } else {
        // Update locally only
        item.quantite--;
        this.calculateTotals();
      }
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem): void {
    if (item._id) {
      // Remove via API
      this.cartService.deleteItem(item._id).subscribe({
        error: (err) => {
          console.error('Error removing item', err);
          // Fallback: remove locally
          this.cartItems = this.cartItems.filter(i => i !== item);
          this.calculateTotals();
        }
      });
    } else {
      // Remove locally only
      this.cartItems = this.cartItems.filter(i => i !== item);
      this.calculateTotals();
    }
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    this.calculateTotals();
  }

  checkout(): void {
    // Implement checkout logic here
    alert('Checkout functionality will be implemented soon!');
  }
}
