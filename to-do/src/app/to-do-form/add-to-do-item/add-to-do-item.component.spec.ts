import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToDoItemComponent } from './add-to-do-item.component';

describe('AddToDoItemComponent', () => {
  let component: AddToDoItemComponent;
  let fixture: ComponentFixture<AddToDoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToDoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToDoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
