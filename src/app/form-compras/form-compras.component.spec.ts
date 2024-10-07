import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComprasComponent } from './form-compras.component';

describe('FormComprasComponent', () => {
  let component: FormComprasComponent;
  let fixture: ComponentFixture<FormComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComprasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
