import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-web-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-categories.component.html',
  styleUrls: ['./web-categories.component.less']
})
export class WebCategoriesComponent implements OnInit {

  @ViewChild('samuraiRef') samuraiRef!: ElementRef<HTMLDivElement>;

  currentAction: 'idle' | 'run' | 'attack' = 'idle';
  scaleX = 4;
  scaleY = 4;

  keys: { [key: string]: boolean } = {};

  // 横向位置 (百分比)
  posX = 45; // 初始位置 (相当于 left: 45%)

  ngOnInit(): void {
    // 定时刷新移动
    setInterval(() => {
      if (this.keys['a']) {
        this.moveLeft();
      }
      if (this.keys['d']) {
        this.moveRight();
      }

      // 没有按键时 idle
      if (!this.keys['a'] && !this.keys['d'] && !this.keys['k']) {
        this.setIdle();
      }
    }, 50); // 每 50ms 更新一次
  }

  private setIdle() {
    this.currentAction = 'idle';
  }

  private moveLeft() {
    this.posX = Math.max(0, this.posX - 1); // 防止出界
    this.scaleX = -4;
    this.scaleY = 4;
    this.currentAction = 'run';
  }

  private moveRight() {
    this.posX = Math.min(90, this.posX + 1); // 防止出界
    this.scaleX = 4;
    this.scaleY = 4;
    this.currentAction = 'run';
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.keys[event.key] = true;

    if (event.key === 'k') {
      this.currentAction = 'attack';
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    this.keys[event.key] = false;
  }

}
