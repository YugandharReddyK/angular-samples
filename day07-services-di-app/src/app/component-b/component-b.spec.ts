import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentB } from './component-b';

describe('ComponentB', () => {
  let component: ComponentB;
  let fixture: ComponentFixture<ComponentB>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentB]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentB);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
