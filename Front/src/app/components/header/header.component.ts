import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserMenuOpen = false;
  
  // Mock user data - in a real app, this would come from a service
  user = {
    name: 'John Doe',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80'
  };
  
  cartItemCount: number = 0;
  private cartSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}
  
  ngOnInit(): void {
    // Subscribe to cart changes for real-time updates
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantite, 0);
    });
    
    // Also check localStorage as a fallback
    this.updateCartCount();
  }
  
  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  navigateToMyRecipes() {
    this.router.navigate(['/my-recipes']);
    this.isUserMenuOpen = false;
  }

  navigateToMyReviews() {
    this.router.navigate(['/my-reviews']);
    this.isUserMenuOpen = false;
  }

  logout() {
    // In a real app, this would call an authentication service
    console.log('User logged out');
    // Navigate to login page or home
    this.router.navigate(['/']);
    this.isUserMenuOpen = false;
  }
  
  updateCartCount(): void {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        this.cartItemCount = cart.reduce((count: number, item: any) => {
          // Handle both formats: {quantity} and {item, quantity}
          if (item.quantity) {
            return count + item.quantity;
          } else if (item.item && item.quantity) {
            return count + item.quantity;
          }
          return count;
        }, 0);
      } catch (error) {
        console.error('Error parsing cart data:', error);
        this.cartItemCount = 0;
      }
    } else {
      // If no localStorage data, use the cart service count
      this.cartItemCount = this.cartService.getCartCount();
    }
  }
}
