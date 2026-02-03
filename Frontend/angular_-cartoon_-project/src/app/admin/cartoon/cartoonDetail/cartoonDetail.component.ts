import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';

interface chapters {
  id: string;
  title: string;
}

interface Book {
description: any;
author: any;
  id: string;
  title: string;
  image: string;
  color: string;
  status: 'Reading' | 'Completed' | 'Planning';
  chapters?: chapters[];
}
@Component({
  selector: 'app-cartoonDetail',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './cartoonDetail.component.html',
  styleUrls: ['./cartoonDetail.component.less']
})
export class CartoonDetailComponent implements OnInit {

 book: Book | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    // 优先从 localStorage 读取
    const data = localStorage.getItem('cartoonData');
    if (data) {
      const book = JSON.parse(data);
      if (book.id === id) {
        this.book = book;
      }
    }
  }

  goBack() {
    this.router.navigate(['/cartoon']);
  }

  readChapter(id:string){
    this.router.navigate(['/cartoonRead',this.book!.id,id]);
  }
}
