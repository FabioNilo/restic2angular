import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormComprasComponent } from "../form-compras/form-compras.component";
import { FormsModule } from '@angular/forms';

export interface ShoppingItem {
  item: string;
  quantity: number;
  editing:boolean;
  purchased: boolean;
}

@Component({
  selector: 'app-lista-compras',
  standalone: true,
  imports: [CommonModule, FormComprasComponent,FormsModule],
  templateUrl: './lista-compras.component.html',
  styleUrl: './lista-compras.component.css'
})
export class ListaComprasComponent {
  items: { item: string, quantity: number,editing:boolean, purchased: boolean }[] = [];

 
  addItem(newItem: { item: string; quantity: number }) {
    this.items.push({ ...newItem, editing: false,purchased:false });
  }

  
  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  
  enableEdit(index: number) {
    this.items[index].editing = true;
  }


  saveEdit(index: number) {
    this.items[index].editing = false; 
  }

  
  cancelEdit(index: number) {
    this.items[index].editing = false; 
  }

  togglePurchased(index: number): void {
    this.items[index].purchased = !this.items[index].purchased;
  }
}
