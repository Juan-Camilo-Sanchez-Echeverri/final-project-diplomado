import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditToyComponent } from './edit-toy.component';

describe('EditToyComponent', () => {
  let component: EditToyComponent;
  let fixture: ComponentFixture<EditToyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditToyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditToyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
