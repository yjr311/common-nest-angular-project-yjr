/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CartoonComponent } from './cartoon.component';

describe('CartoonComponent', () => {
  let component: CartoonComponent;
  let fixture: ComponentFixture<CartoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
