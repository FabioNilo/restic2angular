import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Items } from './list.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private readonly apiUrl = 'http://localhost:3000/items';
  private httpClient = inject(HttpClient);

  getItems(): Observable<Items[]> {
    return this.httpClient.get<{ items: Items[] }>(this.apiUrl).pipe(
      map(response => response.items),
      catchError(this.handleError('Erro ao buscar itens'))
    );
  }

  addItem(newItem: Items): Observable<Items[]> {
    return this.httpClient.post<{ items: Items[] }>(this.apiUrl, newItem).pipe(
      map(response => response.items),
      tap(items => console.log('Item adicionado com sucesso:', items)),
      catchError(this.handleError('Erro ao adicionar item'))
    );
  }

  updateItem(updatedItem: Items): Observable<Items[]> {
    return this.httpClient.put<{ items: Items[] }>(this.apiUrl, updatedItem).pipe(
      map(response => response.items),
      tap(items => console.log('Item atualizado com sucesso:', items)),
      catchError(this.handleError('Erro ao atualizar item'))
    );
  }

  deleteItem(itemId: string): Observable<Items[]> {
    return this.httpClient.delete<{ items: Items[] }>(`${this.apiUrl}/${itemId}`).pipe(
      map(response => response.items),
      tap(items => console.log('Item removido com sucesso:', items)),
      catchError(this.handleError('Erro ao remover item'))
    );
  }

  private handleError(message: string) {
    return (error: any): Observable<never> => {
      console.error(message, error);
      return throwError(() => new Error(`${message} no backend`));
    };
  }
}
