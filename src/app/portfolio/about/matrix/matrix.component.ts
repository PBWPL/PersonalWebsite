import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'about-matrix',
  template: `<canvas #matrixCanvas></canvas>`
})
export class MatrixComponent implements AfterViewInit, OnDestroy {
  @Input() signType = 'numbers';
  @Input() set darkTheme(value: boolean) {
    this.colorTheme = value ? '#000' : '#fff';
  }

  @ViewChild('matrixCanvas') matrixCanvas!: ElementRef;

  ctx!: CanvasRenderingContext2D;

  isActive = false;
  colorTheme = '#000';

  width = 0;
  height = 0;
  yPos: number[] = [];
  intervalId: any;

  ngAfterViewInit(): void {
    this.ctx = this.matrixCanvas.nativeElement.getContext('2d');
    this.width = this.ctx.canvas.width = document.body.offsetWidth;
    this.height = this.ctx.canvas.height = document.body.offsetHeight;

    const cols = Math.floor(this.width / 20) + 1;
    this.yPos = Array(cols).fill(0);

    this.ctx.fillStyle = this.colorTheme;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.start();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = this.ctx.canvas.width = document.body.offsetWidth;
    this.height = this.ctx.canvas.height = document.body.offsetHeight;

    const cols = Math.floor(this.width / 20) + 1;
    this.yPos = Array(cols).fill(0);

    this.ctx.fillStyle = this.colorTheme;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  toggleMatrix() {
    this.isActive ? this.stop() : this.start();
  }

  start(): void {
    this.intervalId = setInterval(() => this.drawContent(), 50);
    this.isActive = true;
  }

  stop(): void {
    clearInterval(this.intervalId);
    this.ctx.fillStyle = this.colorTheme;
    this.isActive = false;
  }

  drawContent(): void {
    this.ctx.fillStyle = this.colorTheme + '1';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = '#00c710';
    this.ctx.font = '16px Consolas';

    let yPosCopy = this.yPos;

    yPosCopy.forEach((y, index) => {
      let sign =
        this.signType === 'characters'
          ? String.fromCharCode(Math.random() * 128)
          : Math.round(Math.random()).toString();

      let x = index * 20;
      this.ctx.fillText(sign, x, y);
      y > 100 + Math.random() * 10000 ? (this.yPos[index] = 0) : (this.yPos[index] = y + 20);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  constructor() {}
}
