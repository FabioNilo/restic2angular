import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormComprasComponent } from "../form-compras/form-compras.component";
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from '../profile/profile.component';
import { Items } from './list.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ListService } from './list.service';



@Component({
  selector: 'app-lista-compras',
  standalone: true,
  imports: [CommonModule, FormComprasComponent,FormsModule,ProfileComponent],
  templateUrl: './lista-compras.component.html',
  styleUrl: './lista-compras.component.css'
})
export class ListaComprasComponent implements OnInit {
  items: Items[] = [];
  errorMessage: string | null = null;
  itemSave = signal<Items[]>([]);
  
  private listService = inject(ListService);

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems(): void {
    this.listService.getItems().subscribe({
      next: (items) => {
        this.items = items;
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Erro ao carregar itens:', error);
        this.handleError('Erro ao carregar itens');
      }
    });
  }

  enableEdit(item: Items): void {
    item.editing = true;
  }

  cancelEdit(item: Items): void {
    item.editing = false;
  }

  onNewItem(newItems: Items[]): void {
    newItems.forEach(item => {
      this.listService.addItem(item).subscribe({
        next: (items) => {
        this.items = items;
        this.errorMessage = null;},
        error: (error) => this.handleError('Erro ao adicionar item')
      });
    });
  }

  saveEdit(item: Items): void {
    item.editing = false;
    this.listService.updateItem(item).subscribe({
      next: (items) => {
        this.items = items;
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Erro ao atualizar item:', error);
        this.handleError('Erro ao atualizar item');
      }
    });
  }

  togglePurchased(item: Items): void {
    const updatedItem = {
      ...item,
      purchased: !item.purchased
    };

    this.listService.updateItem(updatedItem).subscribe({
      next: (items) => {
        this.items = items;
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Erro ao atualizar status de compra:', error);
        this.handleError('Erro ao atualizar status de compra');
        item.purchased = !item.purchased;
      }
    });
  }

  removeItem(item: Items): void {
    if (confirm('Tem certeza que deseja remover este item?')) {
      this.listService.deleteItem(item.id).subscribe({
        next: (items) => {
          this.items = items;
          this.errorMessage = null; 
        },
        error: (error) => {
          console.error('Erro ao remover item:', error);
          this.handleError('Erro ao remover item');
        }
      });
    }
  }

  private handleError(message: string): void {
    this.errorMessage = message;
  }
}