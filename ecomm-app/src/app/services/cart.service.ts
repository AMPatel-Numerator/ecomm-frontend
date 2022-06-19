import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new BehaviorSubject({
    orderId: this.orderId,
    itemCount: this.itemCount
  });

  cartValue = this.cart.asObservable();

  constructor(private storage: LocalStorageService) { }

  get orderId(): number {
    const id = this.storage.getItem('order-id');
    return id ? parseInt(id) : 0;
  }

  set orderId(id: number) {
    this.storage.addItem('order-id', id.toString());
    this.cart.next({ orderId: id, itemCount: this.itemCount });
  }

  get itemCount(): number {
    const itemCount = this.storage.getItem('item-count');

    return itemCount ? parseInt(itemCount) : 0;
  }

  set itemCount(amount: number) {
    this.storage.addItem('item-count', amount.toString());
    this.cart.next({ orderId: this.orderId, itemCount: amount });
  }

  incrementItemCount(amount: number) {
    this.itemCount = this.itemCount + amount;
  }

  decrementItemCount(amount: number) {
    this.itemCount = this.itemCount - amount;
  }

  clearCart() {
    this.storage.deleteItem('item-count');
    this.storage.deleteItem('order-id');
    this.cart.next({ orderId: 0, itemCount: 0 });
  }
}
