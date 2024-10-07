import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-compras',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-compras.component.html',
  styleUrl: './form-compras.component.css'
})
export class FormComprasComponent {
  shoppingForm: FormGroup;

  @Output() newItemEvent = new EventEmitter<{ item: string, quantity: number }>(); 
  constructor(private fb: FormBuilder) {
    this.shoppingForm = this.fb.group({
      item: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]] 
    });
  }

  onSubmit() {
    if (this.shoppingForm.valid) {
     
      this.newItemEvent.emit(this.shoppingForm.value);
      this.shoppingForm.reset({ quantity: 1 }); 
    }
  }

}
