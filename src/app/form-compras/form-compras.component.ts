import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Items } from '../lista-compras/list.model';

@Component({
  selector: 'app-form-compras',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-compras.component.html',
  styleUrls: ['./form-compras.component.css',]
})
export class FormComprasComponent {
  shoppingForm: FormGroup;
  editing = false;
  purchased = false

  @Output() newItemEvent = new EventEmitter<Items[]>(); 
  constructor(private fb: FormBuilder) {
    this.shoppingForm = this.fb.group({
      item: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      editing: this.editing,
      purchased:this.purchased,
    });
  }

  onSubmit() {
    if (this.shoppingForm.valid) {
      const newItem: Items = this.shoppingForm.value as Items;
      this.newItemEvent.emit([newItem]);  
      this.shoppingForm.reset({ quantity: 1 });
      console.log('Novo item enviado:', newItem);
  }
  }
}
