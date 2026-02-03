import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cartoonRead',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartoonRead.component.html',
  styleUrls: ['./cartoonRead.component.less']
})
export class CartoonReadComponent implements OnInit {

  booId!:string;
  chapterId!:string;
  pages:string[] = [];

  private chapterPages: Record<string, string[]> = {
    'c1':[
       '../../../assets/images/cartoon/01-1.jpeg',
       '../../../assets/images/cartoon/01-2.jpeg',
       '../../../assets/images/cartoon/01-3.jpeg'
    ],
    'c2':[
      '../../../assets/images/cartoon/01-1.jpeg',
       '../../../assets/images/cartoon/01-2.jpeg',
    ],
    
  }

  constructor(private route:ActivatedRoute) { }

  ngOnInit():void {
    const bookId = this.route.snapshot.paramMap.get('bookId');
    const chapterId = this.route.snapshot.paramMap.get('chapterId')!;
    console.log('Book ID:', bookId);
    console.log('Chapter ID:', chapterId);
    // 根据章节ID加载对应图片
    this.pages = this.chapterPages[chapterId] || [];
    console.log(this.chapterId);
    // TODO: 根据 bookId + chapterId 去获取漫画的图片数据
    // 示例写死
    // this.pages = [
    //   '../../../assets/images/cartoon/01-1.jpeg',
    //   '../../../assets/images/cartoon/01-2.jpeg',
    //   '../../../assets/images/cartoon/01-3.jpeg'
    // ];
  }

  

  

}
