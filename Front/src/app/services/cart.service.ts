import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Menu } from '../models/menu.model';
import { tap } from 'rxjs/operators';

export interface CartItem {
  _id?: string;
  nom: string;
  quantite: number;
  prix: number;
  menuId?: number;
  image?: string;
  description?: string;
  restaurantId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/panier';
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private loadCart(): void {
    this.getAllItems().subscribe({
      next: (response) => {
        this.cartItemsSubject.next(response.produits);
      },
      error: (error) => {
        console.error('Error loading cart', error);
        // Fallback to local storage if API fails
        this.loadFromLocalStorage();
      }
    });
  }

  private loadFromLocalStorage(): void {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      try {
        const localCart = JSON.parse(savedCart);
        // Convert local cart format to backend format
        const backendFormat = localCart.map((item: { item: CartItem; quantity: number }) => ({
          nom: item.item.nom,
          quantite: item.quantity,
          prix: item.item.prix,
          menuId: item.item.menuId,
          image: item.item.image,
          description: item.item.description,
          restaurantId: item.item.restaurantId
        }));
        this.cartItemsSubject.next(backendFormat);
      } catch (e) {
        console.error('Error parsing local cart', e);
        this.cartItemsSubject.next([]);
      }
    }
  }

  getAllItems(): Observable<{produits: CartItem[]}> {
    return this.http.get<{produits: CartItem[]}>(this.apiUrl);
  }

  getItemById(id: string): Observable<CartItem> {
    return this.http.get<CartItem>(`${this.apiUrl}/${id}`);
  }

  getItemsByMenuId(menuId: number): Observable<{produits: CartItem[]}> {
    return this.http.get<{produits: CartItem[]}>(`${this.apiUrl}/menu/${menuId}`);
  }

  addItem(item: CartItem): Observable<{message: string, produit: CartItem}> {
    return this.http.post<{message: string, produit: CartItem}>(this.apiUrl, item)
      .pipe(
        tap(response => {
          const currentItems = this.cartItemsSubject.value;
          this.cartItemsSubject.next([...currentItems, response.produit]);
        })
      );
  }

  addMenuToCart(menuId: number, quantite: number): Observable<{message: string, produit: CartItem}> {
    return this.http.post<{message: string, produit: CartItem}>(`${this.apiUrl}/menu/${menuId}`, { quantite })
      .pipe(
        tap(response => {
          // Update the cart items after adding
          this.loadCart();
        })
      );
  }

  updateItem(id: string, item: CartItem): Observable<{message: string, produit: CartItem}> {
    return this.http.put<{message: string, produit: CartItem}>(`${this.apiUrl}/${id}`, item)
      .pipe(
        tap(response => {
          const currentItems = this.cartItemsSubject.value;
          const updatedItems = currentItems.map(item => 
            item._id === id ? response.produit : item
          );
          this.cartItemsSubject.next(updatedItems);
        })
      );
  }

  deleteItem(id: string): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          const currentItems = this.cartItemsSubject.value;
          const filteredItems = currentItems.filter(item => item._id !== id);
          this.cartItemsSubject.next(filteredItems);
        })
      );
  }

  getCartCount(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.quantite, 0);
  }

  getCartTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + (item.prix * item.quantite), 0);
  }

  clearCart(): void {
    // This is a client-side clear only
    // In a real app, you might want to add a backend endpoint to clear the cart
    this.cartItemsSubject.value.forEach(item => {
      if (item._id) {
        this.deleteItem(item._id).subscribe();
      }
    });
  }
}