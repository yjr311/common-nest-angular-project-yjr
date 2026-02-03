import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface chapters {
  id: string;
  title: string;
}

interface Book {
  id: string;
  title: string;
  image: string;
  color: string; // 用作 --avarage-color
  status: 'Reading' | 'Completed' | 'Planning';
  author?: string;
  description?: string;
  chapters?: chapters[];
}

@Component({
  selector: 'app-cartoon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartoon.component.html',
  styleUrls: ['./cartoon.component.less']
})
export class CartoonComponent implements OnInit {

  books: Book[] = [
    {
      id: '1',
      title: 'Frieren: Beyond Journey’s End',
      image: 'https://i.imgur.com/HWxOtcQ.jpeg',
      color: '#b0b6a9',
      status: 'Reading',
      author: '山田钟人',
      description: '故事发生在勇者一行打倒魔王之后。在冒险的终点，和平到来。人们开始新生活，但队伍中的精灵魔法使芙莉莲因为寿命极长，看着人类伙伴逐渐老去，才深刻体会到“分别的重量”。于是她开启了新的旅途：一边探索未知的魔法，一边尝试理解和珍惜“人类短暂而美丽的情感”。',
      chapters: [
        { id: 'c1', title: '第1话 勇者的终点' },
        { id: 'c2', title: '第2话 新的旅途' }
      ]
    },
    {
      id: '2',
      title: 'Shinozaki-kun no Mente Jijou',
      image: 'https://i.imgur.com/wRoptbT.png',
      color: '#afa294',
      status: 'Reading',
      author: 'Burio Michiru',
      description: '志野崎—一个最近头部容易脱落的普通上班族——突然被一个名叫夕焼的年轻女子打断了原本平凡的生活。据她所说，夕焼的魔法祖母过去对志野崎的身体进行了极端的改造——他现在体内布满了机械！…所有这些都需要维护，而 Yuuyake 显然将定期进行。从那时起，一个完全普通的上班族、一个魔术师和一个名为 Grey 的奇怪黑色生物的略带不正经的日常生活开始了！'
    },
    {
      id: '3',
      title: 'Bibliomania',
      image: 'https://i.imgur.com/MwRrRSd.jpeg',
      color: '#3c3c3d',
      status: 'Reading'
    },
    {
      id: '4',
      title: 'Dandadan',
      image: 'https://i.imgur.com/7FQ6L5j.jpeg',
      color: '#b47460',
      status: 'Reading'
    },
    {
      id: '5',
      title: 'The Summer Hikaru Died',
      image: 'https://i.imgur.com/IQSq88g.jpeg',
      color: '#60a6ce',
      status: 'Reading'
    },
    {
      id: '6',
      title: 'The Color of the End: Mission in the Apocalypse',
      image: 'https://i.imgur.com/QfF46xU.jpeg',
      color: '#46666f',
      status: 'Reading'
    },
    {
      id: '7',
      title: 'Smoking Behind the Supermarket with You',
      image: 'https://i.imgur.com/jcgbHCO.jpeg',
      color: '#8e898f',
      status: 'Reading'
    },
    {
      id: '8',
      title: 'Another',
      image: 'https://i.imgur.com/lIPenqN.jpeg',
      color: '#8d516e',
      status: 'Reading'
    },
    {
      id: '9',
      title: 'My Broken Mariko',
      image: 'https://i.imgur.com/OS0VRhm.png',
      color: '#6e695e',
      status: 'Completed'
    },
    {
      id: '10',
      title: 'Adabana',
      image: 'https://i.imgur.com/uqktm8j.jpeg',
      color: '#b16e79',
      status: 'Completed'
    },
    {
      id: '11',
      title: 'Yiska',
      image: 'https://i.imgur.com/QKXIJlH.jpeg',
      color: '#bdbdbd',
      status: 'Completed'
    },
    {
      id: '12',
      title: 'BLAME!',
      image: 'https://i.imgur.com/yCBmW1b.png',
      color: '#7b4d35',
      status: 'Planning'
    },
    {
      id: '13',
      title: 'I Have a Crush at Work',
      image: 'https://i.imgur.com/ZGvNhE7.jpeg',
      color: '#ceb5a8',
      status: 'Planning'
    },
    {
      id: '14',
      title: 'Carnelian: the Sille Dragon Odyssey',
      image: 'https://i.imgur.com/kTmZvmd.jpeg',
      color: '#6d413f',
      status: 'Planning'
    },
    {
      id: '15',
      title: 'Ougon no Keikenchi',
      image: 'https://i.imgur.com/jXc2WJf.jpeg',
      color: '#666060',
      status: 'Planning'
    },
    {
      id: '16',
      title: 'Cigarette & Cherry',
      image: 'https://i.imgur.com/fHFUOYg.jpeg',
      color: '#827d88',
      status: 'Planning'
    }
  ];

  readingBooks = this.books.filter(b => b.status === 'Reading');
  completedBooks = this.books.filter(b => b.status === 'Completed');
  planningBooks = this.books.filter(b => b.status === 'Planning');

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ToCarttonDetail(id: string, book: any) {
    console.log(id)
    if (id) {
      //调用后端接口传id获取详情
      this.router.navigate(['/carttonDeail', id]);
      localStorage.setItem('cartoonData', JSON.stringify(book));
    }
  }
}
