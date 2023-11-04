import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningcompComponent } from './warningcomp.component';

describe('WarningcompComponent', () => {
  let component: WarningcompComponent;
  let fixture: ComponentFixture<WarningcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningcompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarningcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
