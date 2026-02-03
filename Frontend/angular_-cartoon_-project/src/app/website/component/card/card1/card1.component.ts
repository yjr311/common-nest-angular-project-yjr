import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnInit
} from '@angular/core';interface Flavor {
  name: [string, string];
  color: string;
  image: string;
  nutrition: string[];
}
@Component({
  selector: 'app-card1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card1.component.html',
  styleUrls: ['./card1.component.less']
})
export class Card1Component implements OnInit {


 flavors: Flavor[] = [
    {
      name: ['Chai', 'Vanilla'],
      color: '#4A90E2',
      image: 'https://raw.githubusercontent.com/nidal1111/storage/master/assets/milkshake_banana.png',
      nutrition: ['20g', '13g', '15', '1.8g', '1B']
    },
    {
      name: ['Maple', 'Peanut'],
      color: '#E94B4B',
      image: 'https://raw.githubusercontent.com/nidal1111/storage/master/assets/milkShake_caffe%CC%80.png',
      nutrition: ['35g', '10g', '10', '1.5g', '2B']
    },
    {
      name: ['Cacao', 'Coconut'],
      color: '#F4D03F',
      image: 'https://raw.githubusercontent.com/nidal1111/storage/master/assets/milkShake_fragole.png',
      nutrition: ['40g', '25g', '22', '2.2g', '1B']
    },
    {
      name: ['Berry', 'Blend'],
      color: '#8E44AD',
      image: 'https://raw.githubusercontent.com/nidal1111/storage/master/assets/milkshake_banana.png',
      nutrition: ['28g', '18g', '25', '2.0g', '3B']
    }
  ];

   currentIndex = 0;
  isAnimating = false;

  get currentFlavor() {
    return this.flavors[this.currentIndex];
  }

  // DOM 引用
  @ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;
  @ViewChild('firstWord') firstWord!: ElementRef<HTMLSpanElement>;
  @ViewChild('secondWord') secondWord!: ElementRef<HTMLSpanElement>;
  @ViewChild('imageElement') imageElement!: ElementRef<HTMLImageElement>;
  @ViewChildren('nutritionValue')
  nutritionValues!: QueryList<ElementRef<HTMLDivElement>>;

  ngAfterViewInit(): void {
    // 初始化样式
    this.overlay.nativeElement.style.background = this.currentFlavor.color;
  }

  /**
   * 文字 morph 动画
   */
  morphWords(fromWords: string[], toWords: string[], onComplete?: () => void) {
    const [fromFirst, fromSecond] = fromWords;
    const [toFirst, toSecond] = toWords;

    const firstEl = this.firstWord.nativeElement;
    const secondEl = this.secondWord.nativeElement;

    const maxMoveDistance = 20;
    let step = 0;
    const totalSteps = 40;

    const nextFrame = () => {
      if (step < totalSteps) {
        const progress = step / (totalSteps - 1);
        const easeProgress = progress * progress * progress;

        const moveDistance = maxMoveDistance * easeProgress;
        firstEl.style.transform = `translateX(${moveDistance}px)`;
        secondEl.style.transform = `translateX(-${moveDistance}px)`;

        const firstCharsToShow = Math.max(
          0,
          Math.ceil(fromFirst.length * (1 - easeProgress))
        );
        const secondCharsToShow = Math.max(
          0,
          Math.ceil(fromSecond.length * (1 - easeProgress))
        );

        firstEl.textContent = fromFirst.substring(0, firstCharsToShow);
        secondEl.textContent = fromSecond.substring(
          fromSecond.length - secondCharsToShow
        );

        step++;
        requestAnimationFrame(nextFrame);
      } else {
        setTimeout(() => {
          let expandStep = 0;
          const expandSteps = 40;

          const expandFrame = () => {
            const expandProgress = expandStep / (expandSteps - 1);
            const easeExpandProgress =
              expandProgress * expandProgress * (3 - 2 * expandProgress);

            const returnDistance =
              maxMoveDistance * (1 - easeExpandProgress);
            firstEl.style.transform = `translateX(${returnDistance}px)`;
            secondEl.style.transform = `translateX(-${returnDistance}px)`;

            const firstCharsToShow = Math.ceil(
              toFirst.length * easeExpandProgress
            );
            const secondCharsToShow = Math.ceil(
              toSecond.length * easeExpandProgress
            );

            firstEl.textContent = toFirst.substring(0, firstCharsToShow);
            secondEl.textContent = toSecond.substring(
              toSecond.length - secondCharsToShow
            );

            if (expandStep < expandSteps) {
              expandStep++;
              requestAnimationFrame(expandFrame);
            } else {
              firstEl.style.transform = 'translateX(0)';
              secondEl.style.transform = 'translateX(0)';
              firstEl.textContent = toFirst;
              secondEl.textContent = toSecond;
              if (onComplete) onComplete();
            }
          };

          expandFrame();
        }, 100);
      }
    };

    nextFrame();
  }

  /**
   * 营养值动画
   */
  animateNutritionValues(newValues: string[]) {
    this.nutritionValues.forEach((valueRef, index) => {
      const valueEl = valueRef.nativeElement;
      setTimeout(() => {
        valueEl.style.opacity = '0';
        setTimeout(() => {
          valueEl.textContent = newValues[index];
          valueEl.style.opacity = '1';
        }, 150);
      }, index * 80);
    });
  }

  /**
   * 切换幻灯片
   */
  changeSlide(newIndex: number) {
    if (newIndex === this.currentIndex || this.isAnimating) return;

    this.isAnimating = true;
    const currentFlavor = this.flavors[this.currentIndex];
    const newFlavor = this.flavors[newIndex];

    const overlayEl = this.overlay.nativeElement;
    overlayEl.style.background = newFlavor.color;
    overlayEl.classList.add('slide-down');

    setTimeout(() => {
      this.morphWords(currentFlavor.name, newFlavor.name);
      this.animateNutritionValues(newFlavor.nutrition);

      setTimeout(() => {
        const imgEl = this.imageElement.nativeElement;
        imgEl.style.opacity = '0';

        setTimeout(() => {
          imgEl.src = newFlavor.image;
          imgEl.style.opacity = '1';

          overlayEl.classList.remove('slide-down');
          overlayEl.style.transform = 'translateY(-100%)';

          setTimeout(() => {
            overlayEl.style.transform = '';
            this.isAnimating = false;
          }, 300);
        }, 400);
      }, 400);
    }, 0);

    this.currentIndex = newIndex;
  }

  /**
   * 自动轮播
   */
  autoSlide() {
    if (!this.isAnimating) {
      const nextIndex = (this.currentIndex + 1) % this.flavors.length;
      this.changeSlide(nextIndex);
    }
  }

  ngOnInit() {
    setInterval(() => this.autoSlide(), 4000);
  }


}
