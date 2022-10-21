import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswdComponent } from './changepasswd.component';

describe('ChangepasswdComponent', () => {
  let component: ChangepasswdComponent;
  let fixture: ComponentFixture<ChangepasswdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangepasswdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangepasswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
