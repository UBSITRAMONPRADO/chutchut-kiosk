import { Injectable, signal, computed } from '@angular/core';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartServices {

  menuItems = signal<MenuItem[]>([
    // CHICKEN WINGS & RICE
    { id: 1, name: 'Wings & Rice 2pcs', price: 90, category: 'Wings & Rice', description: '2 pcs chicken wings with steamed rice', image: 'wings-rice.jpg' },
    { id: 2, name: 'Wings & Rice 3pcs', price: 110, category: 'Wings & Rice', description: '3 pcs chicken wings with steamed rice', image: 'wings-rice.jpg' },

    // CHICKEN WINGS & FRIES
    { id: 3, name: 'Wings & Fries 2pcs', price: 100, category: 'Wings & Fries', description: '2 pcs chicken wings with fries', image: 'wings-fries.jpg' },
    { id: 4, name: 'Wings & Fries 3pcs', price: 120, category: 'Wings & Fries', description: '3 pcs chicken wings with fries', image: 'wings-fries.jpg' },
    { id: 5, name: 'Wings & Fries 4pcs', price: 125, category: 'Wings & Fries', description: '4 pcs chicken wings with fries', image: 'wings-fries.jpg' },
    { id: 6, name: 'Wings & Fries 5pcs', price: 140, category: 'Wings & Fries', description: '5 pcs chicken wings with fries', image: 'wings-fries.jpg' },

    // WINGS & RICE WITH GRAVY
    { id: 7, name: 'Wings & Rice w/ Gravy 2pcs', price: 80, category: 'Wings & Gravy', description: '2 pcs chicken wings with rice and gravy', image: 'wings-gravy.jpg' },
    { id: 8, name: 'Wings & Rice w/ Gravy 3pcs', price: 90, category: 'Wings & Gravy', description: '3 pcs chicken wings with rice and gravy', image: 'wings-gravy2.jpg' },

    // WINGS WITH DRINKS
    { id: 9, name: 'Wings & Rice w/ Drinks', price: 175, category: 'Wings & Drinks', description: 'Chicken wings with plain rice and drinks', image: 'wings-rice-drinks.jpg' },

    // COMBOS
    { id: 10, name: 'Combo 1', price: 180, category: 'Combos', description: '6 pcs chicken only (2 flavor of choice)', image: 'combo1.jpg' },
    { id: 11, name: 'Combo 2', price: 240, category: 'Combos', description: '8 pcs chicken only (flavor of choice)', image: 'combo2.jpg' },
    { id: 12, name: 'Combo 3', price: 154, category: 'Combos', description: '2 pcs chicken with cheese hotdog', image: 'combo3.jpg' },

    // FRIES
    { id: 13, name: 'Fries Small', price: 50, category: 'Fries', description: 'Small fries — Cheese, Sour Cream, or BBQ', image: 'fries-small.jpg' },
    { id: 14, name: 'Fries Medium', price: 60, category: 'Fries', description: 'Medium fries — Cheese, Sour Cream, or BBQ', image: 'fries-medium.jpg' },
    { id: 15, name: 'Fries Large', price: 80, category: 'Fries', description: 'Large fries — Cheese, Sour Cream, or BBQ', image: 'fries-large.jpg' },

    // CORNDOG
    { id: 16, name: 'Mozzarella Corndog', price: 100, category: 'Corndog', description: 'Chut Chut style mozzarella corndog', image: 'corndog-mozz.jpg' },
    { id: 17, name: 'Cheese Hotdog Corndog', price: 85, category: 'Corndog', description: 'Chut Chut style cheese hotdog corndog', image: 'corndog-cheese.jpg' },
  ]);

  cartItems = signal<CartItem[]>([]);

  cartTotal = computed(() =>
    this.cartItems().reduce((total, entry) => total + entry.item.price * entry.quantity, 0)
  );

  cartCount = computed(() =>
    this.cartItems().reduce((count, entry) => count + entry.quantity, 0)
  );

  addToCart(item: MenuItem): void {
    const current = this.cartItems();
    const existing = current.find(entry => entry.item.id === item.id);
    if (existing) {
      this.cartItems.set(
        current.map(entry =>
          entry.item.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        )
      );
    } else {
      this.cartItems.set([...current, { item, quantity: 1 }]);
    }
  }

  removeFromCart(itemId: number): void {
    this.cartItems.set(
      this.cartItems().filter(entry => entry.item.id !== itemId)
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}