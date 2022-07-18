import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditToDoItemComponent } from './edit-to-do-item.component';

describe('EditToDoItemComponent', () => {
  let component: EditToDoItemComponent;
  let fixture: ComponentFixture<EditToDoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditToDoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditToDoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
