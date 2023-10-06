import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAcnoComponent } from './delete-acno.component';

describe('DeleteAcnoComponent', () => {
  let component: DeleteAcnoComponent;
  let fixture: ComponentFixture<DeleteAcnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAcnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAcnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
