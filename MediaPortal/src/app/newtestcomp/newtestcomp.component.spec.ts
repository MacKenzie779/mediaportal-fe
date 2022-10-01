import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtestcompComponent } from './newtestcomp.component';

describe('NewtestcompComponent', () => {
  let component: NewtestcompComponent;
  let fixture: ComponentFixture<NewtestcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewtestcompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewtestcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
