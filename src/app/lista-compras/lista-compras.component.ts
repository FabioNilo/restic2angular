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

  // Função para adicionar novo item
  addItem(newItem: { item: string; quantity: number }) {
    this.items.push({ ...newItem, editing: false,purchased:false });
  }

  // Função para remover um item
  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  // Função para habilitar a edição de um item
  enableEdit(index: number) {
    this.items[index].editing = true;
  }

  // Função para salvar as alterações
  saveEdit(index: number) {
    this.items[index].editing = false; // Sai do modo de edição
  }

  
  cancelEdit(index: number) {
    this.items[index].editing = false; 
  }

  togglePurchased(index: number): void {
    this.items[index].purchased = !this.items[index].purchased;
  }
}
