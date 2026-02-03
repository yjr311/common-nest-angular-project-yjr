import { Component, OnInit } from '@angular/core';
import { Card1Component } from '../component/card/card1/card1.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  imports: [Card1Component,CommonModule,FormsModule],
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
