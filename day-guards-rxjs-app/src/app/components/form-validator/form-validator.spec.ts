import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidator } from './form-validator';

describe('FormValidator', () => {
  let component: FormValidator;
  let fixture: ComponentFixture<FormValidator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormValidator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormValidator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
