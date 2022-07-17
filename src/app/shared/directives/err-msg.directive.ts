import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrMsgDirective implements OnInit, OnChanges {

  private _color: string = 'red';
  private _message: string = 'Este campo es requerido';

  htmlElement: ElementRef<HTMLElement>;
  // @Input() color  : string = 'red';
  @Input() set color(valor: string) { // Hacer cambios de color desde ts
    // this.htmlElement.nativeElement.style.color = valor;
    this._color = valor;
    this.setColor();
  }

  // @Input() message: string = 'Este campo es necesario';
  @Input() set message(valor: string) {
    // this.htmlElement.nativeElement.innerText = valor;
    this._message = valor;
    this.setMessage();
  }

  @Input() set valido(valor: boolean) {
    if (valor) {
      this.htmlElement.nativeElement.classList.add('hidden');
    } else {
      this.htmlElement.nativeElement.classList.remove('hidden');
    }
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    // console.log('contructor directive');
    // console.log(el);
    this.htmlElement = el; // Referencia
  }

  ngOnInit(): void {
    // console.log('ngOnInit directiva');
    // console.log(this.color); // Son undefined al inicio
    // console.log(this.message); // Son undefined al inicio

    this.setStyle();
    this.setColor();
    this.setMessage();
  }

  // No se utiliza
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);

    // No es buena práctica
    // if (changes['message']) {
    //   const message = changes['message'].currentValue;
    //   // console.log(message);
    //   this.htmlElement.nativeElement.innerText = message;
    //   console.log(changes);
    // }

    // if (changes['color']) {
    //   const color = changes['color'].currentValue;
    //   this.htmlElement.nativeElement.style.color = color;
    // }
  }

  setColor(): void {
    this.htmlElement.nativeElement.style.color = this._color;
    // this.htmlElement.nativeElement.classList.add('form-text');
  }

  setMessage(): void {
    this.htmlElement.nativeElement.innerText = this._message;
  }

  // Se utiliza para insertar la clase en el HTML form-text de Bootstrap
  setStyle(): void {
    this.htmlElement.nativeElement.classList.add('form-text');
  }
}
