import { Component, ElementRef, HostListener, AfterViewInit, OnDestroy, ViewChild,OnInit } from '@angular/core';


interface Snowflake {
  x: number;
  y: number;
  vx: number; // 水平速度（风）
  vy: number; // 垂直速度
  size: number;
  opacity: number;
  driftPhase: number;
}

@Component({
  selector: 'app-snow',
  standalone: true,
  templateUrl: './snow.component.html',
  styleUrls: ['./snow.component.css']
})
export class SnowComponent implements OnInit {

  ngOnInit(): void {}

  @ViewChild('canvasEl', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D | null;
  private flakes: Snowflake[] = [];
  private rafId: number | null = null;
  private dpr = window.devicePixelRatio || 1;

  // 可调参数
  count = 120; // 雪花数量
  wind = 0.3; // 全局风力，正值右风
  gravity = 0.01; // 下落加速度

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.resizeCanvas();
    this.initFlakes();
    this.loop();
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  @HostListener('window:resize')
  resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const rectW = window.innerWidth;
    const rectH = window.innerHeight;
    this.dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rectW * this.dpr);
    canvas.height = Math.floor(rectH * this.dpr);
    canvas.style.width = `${rectW}px`;
    canvas.style.height = `${rectH}px`;
    if (this.ctx) {
      this.ctx.scale(this.dpr, this.dpr);
    }
  }

  private initFlakes() {
    this.flakes = [];
    for (let i = 0; i < this.count; i++) {
      this.flakes.push(this.randomFlake(true));
    }
  }

  private randomFlake(startAbove = false): Snowflake {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const size = 2 + Math.random() * 8; // 2 ~ 10 px
    const x = Math.random() * w;
    const y = startAbove ? Math.random() * -h : Math.random() * h;
    const vy = 0.5 + Math.random() * 0.6; // 下落速度基准
    const vx = (Math.random() - 0.5) * 0.6; // 水平基准
    const opacity = 0.3 + Math.random() * 0.7;
    const driftPhase = Math.random() * Math.PI * 2;
    return { x, y, vx, vy, size, opacity, driftPhase };
  }

  private loop = () => {
    const canvas = this.canvasRef.nativeElement;
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = canvas.width / this.dpr;
    const h = canvas.height / this.dpr;

    ctx.clearRect(0, 0, w, h);

    for (let flake of this.flakes) {
      // 简单物理：风 + 重力 + 波动
      flake.vx += (Math.sin(flake.driftPhase) * 0.002) + (this.wind * 0.001);
      flake.vy += this.gravity * (0.8 + flake.size / 10);

      flake.x += flake.vx;
      flake.y += flake.vy;

      // 周期性摆动
      flake.driftPhase += 0.01 + Math.random() * 0.02;

      // 边界处理：从顶部重生或左右循环
      if (flake.y > h + 20) {
        // 重新置顶
        const nf = this.randomFlake(true);
        flake.x = nf.x;
        flake.y = nf.y;
        flake.vx = nf.vx;
        flake.vy = nf.vy;
        flake.size = nf.size;
        flake.opacity = nf.opacity;
        flake.driftPhase = nf.driftPhase;
      }
      if (flake.x > w + 20) flake.x = -20;
      if (flake.x < -20) flake.x = w + 20;

      // 渲染：简单圆形渐变做雪花
      ctx.beginPath();
      const radius = flake.size;
      const grad = ctx.createRadialGradient(flake.x, flake.y, 0, flake.x, flake.y, radius);
      grad.addColorStop(0, `rgba(255,255,255,${Math.min(1, flake.opacity)})`);
      grad.addColorStop(0.6, `rgba(255,255,255,${Math.min(0.6, flake.opacity)})`);
      grad.addColorStop(1, `rgba(255,255,255,0)`);
      ctx.fillStyle = grad;
      ctx.arc(flake.x, flake.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    this.rafId = requestAnimationFrame(this.loop);
  }

  // 暴露方法：可以在父组件动态修改风/数量等
  setWind(v: number) {
    this.wind = v;
  }

  setCount(n: number) {
    this.count = n;
    this.initFlakes();
  }
}
