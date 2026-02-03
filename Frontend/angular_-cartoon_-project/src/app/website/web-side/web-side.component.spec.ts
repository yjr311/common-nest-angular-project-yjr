/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WebSideComponent } from './web-side.component';

describe('WebSideComponent', () => {
  let component: WebSideComponent;
  let fixture: ComponentFixture<WebSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
