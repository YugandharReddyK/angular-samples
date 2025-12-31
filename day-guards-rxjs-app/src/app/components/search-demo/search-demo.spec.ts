import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDemo } from './search-demo';

describe('SearchDemo', () => {
  let component: SearchDemo;
  let fixture: ComponentFixture<SearchDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
