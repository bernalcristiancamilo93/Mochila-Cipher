import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cifrado',
  templateUrl: './cifrado.page.html',
  styleUrls: ['./cifrado.page.scss'],
})
export class CifradoPage {
  // Forms
  public claveForm = new FormGroup({
    mochilaFacil: new FormControl(
      '2,5,8,17,34,71,138,300',
      Validators.required
    ),
    valorW: new FormControl('580', Validators.required),
    valorT: new FormControl('43', Validators.required),
    mochilaDificil: new FormControl(),
  });

  public cifradoForm: FormGroup = new FormGroup({
    textoClaroInputAscii: new FormControl('Buenos días', Validators.required),
    textoClaroEnBits: new FormControl(),
    textoClaroEnBitsEnBloque: new FormControl(),
    bitsTextoClaroCifrados: new FormControl(),
    textoCifradoOutputAscii: new FormControl(),
  });

  public descifradoForm: FormGroup = new FormGroup({
    textoCifradoInputAscii: new FormControl('aa', Validators.required),
    textoCifradoFormatoBits: new FormControl(),
    bitsTextoCifradoEnClaro: new FormControl(),
    textoClaroOutputAscii: new FormControl(),
  });

  constructor(private alertCtrl: AlertController) {}

  verificarMochila() {
    const elementosMochila: number[] = this.claveForm
      .get('mochilaFacil')
      ?.value?.split(',')!
      .map((array) => +array)!;

    let total = 0;

    for (let i = 0; i < elementosMochila?.length - 1; i++) {
      total += elementosMochila[i];

      if (total >= elementosMochila[i + 1]) {
        this.notificacionError('Los valores de la mochila no son correctos.');
        return;
      }
    }
  }

  totalMochila(): number {
    const elementosMochila: number[] = this.claveForm
      .get('mochilaFacil')
      ?.value?.split(',')!
      .map((array) => +array)!;

    let totalMochila = 0;

    for (let i = 1; i < elementosMochila?.length; i++) {
      totalMochila += elementosMochila[i];
    }

    return totalMochila;
  }

  verificarW() {
    const valorW: number = +this.claveForm.get('valorW')?.value!;

    if (valorW <= this.totalMochila()) {
      this.notificacionError('El valor de w no es válido.');
    }
  }

  verificarT() {
    const valorW: number = +this.claveForm.get('valorW')?.value!;
    const valorT: number = +this.claveForm.get('valorT')?.value!;

    if (!(0 < valorT && valorT < valorW)) {
      this.notificacionError('El valor de t no es menor que w.');
      return;
    }

    if (!this.esPrimoRelativo(valorT, valorW)) {
      return;
    }
  }

  calcularTInversa(): number {
    const valorW: number = +this.claveForm.get('valorW')?.value!;
    const valorT: number = +this.claveForm.get('valorT')?.value!;

    let tInversa = 0;
    for (let i = 1; i < valorW; i++) {
      if ((i * valorW + 1) % valorT === 0) {
        tInversa = (i * valorW + 1) / valorT;
        break;
      }
    }

    return tInversa;
  }

  calcularMochilaDificil() {
    const valorT: number = +this.claveForm.get('valorT')?.value!;
    const valorW: number = +this.claveForm.get('valorW')?.value!;

    const elementosMochila: number[] = this.claveForm
      .get('mochilaFacil')
      ?.value?.split(',')!
      .map((array) => +array)!;

    const mochilaDificil: number[] = [];

    for (const valorA of elementosMochila) {
      mochilaDificil.push((valorA * valorT) % valorW);
    }

    this.claveForm.get('mochilaDificil')?.patchValue(mochilaDificil);
  }

  cifrar() {
    // Quita los acentos, signos de puntuación y pasa todo a mayúsculas y
    // separa el mensaje en caracteres individuales.
    const textoFragmentado: string[] = this.cifradoForm
      .get('textoClaroInputAscii')
      ?.value.replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()!¡¿?]/g, '')
      .split('');

    const mensajeEnBitsSinAjustar: number[] = [];
    const mensajeEnBitsAjustado: number[][] = [];

    // Lee el valor en binario para cada caracter Ascii
    for (const letra of textoFragmentado) {
      mensajeEnBitsSinAjustar.push(letra.charCodeAt(0));
    }
    console.log('Valores Ascii: ', mensajeEnBitsSinAjustar);

    for (const letra of mensajeEnBitsSinAjustar) {
      const bitsparaCadaLetra: number[] = letra
        .toString(2)
        .split('')
        .map((array) => +array);

      mensajeEnBitsAjustado.push(this.verificarVector(bitsparaCadaLetra, 8));
    }

    const textoClaroEnBitsFormateado: string[] = [];
    for (const item of mensajeEnBitsAjustado) {
      textoClaroEnBitsFormateado.push(item.toString().replace(/,/g, ''));
    }
    this.cifradoForm
      .get('textoClaroEnBits')
      ?.patchValue(textoClaroEnBitsFormateado);

    // Organiza los datos en bloques de la misma longitud de la mochila
    const datosBinariosEnBloque: number[][] = mensajeEnBitsAjustado;

    this.cifradoForm
      .get('textoClaroEnBitsEnBloque')
      ?.patchValue(datosBinariosEnBloque);

    // Cálculo de la ecuación de cifrado
    const mochilaDificil: number[] =
      this.claveForm.get('mochilaDificil')?.value!;
    const datosCrudosCifrado: number[] = [];

    for (const bloque of datosBinariosEnBloque) {
      let total = 0;
      for (const [index, elemento] of mochilaDificil.entries()) {
        total += elemento * bloque[index];
      }
      datosCrudosCifrado.push(total);
    }

    this.cifradoForm
      .get('textoCifradoOutputAscii')
      ?.patchValue(datosCrudosCifrado);
  }

  descifrar() {
    // Obtener datos en crudo
    const datosCrudosEnDecimal: number[] = this.cifradoForm.get(
      'textoCifradoOutputAscii'
    )?.value!;

    // Cálculo de la t inversa
    const tInversa = this.calcularTInversa();

    // Se calcula la ecuación de descifrado
    const valorW: number = +this.claveForm.get('valorW')?.value!;
    const datosConTInversa: number[] = [];

    for (const elemento of datosCrudosEnDecimal) {
      datosConTInversa.push((elemento * tInversa) % valorW);
    }

    console.log(datosConTInversa);

    // Procedimiento iterativo con la mochila fácil
    const elementosMochila: number[] = this.claveForm
      .get('mochilaFacil')
      ?.value?.split(',')!
      .map((array) => +array)
      .reverse()!;

    const binarioDescifrado: number[][] = [];

    for (const datoTInversa of datosConTInversa) {
      let valor = datoTInversa;
      let resultado: number[] = [];
      for (const elementoMochila of elementosMochila) {
        console.log(
          valor,
          '/',
          elementoMochila,
          '=',
          Math.trunc(valor / elementoMochila)
        );

        resultado.push(Math.trunc(valor / elementoMochila));
        if (Math.trunc(valor / elementoMochila) == 1) {
          valor %= elementoMochila;
        }
      }
      binarioDescifrado.push(resultado.reverse());
    }

    console.log(binarioDescifrado);
  }

  notificacionError(mensaje: string): void {
    this.alertCtrl
      .create({
        header: '¡Error!',
        message: mensaje,
        buttons: ['Okay'],
      })
      .then((alertElement) => {
        alertElement.present();
      });
  }

  esPrimoRelativo(numeroA: number, numeroB: number): boolean {
    for (let i = 2; i < numeroA; i++) {
      if (numeroA % i === 0 && numeroB % i === 0) {
        this.notificacionError(
          `${numeroA} no es primo relativo de ${numeroB}.`
        );
        return false;
      }
    }
    return true;
  }

  verificarVector(vector: number[], longitudEsperada: number): number[] {
    if (vector.length === longitudEsperada) {
      return [...vector];
    } else {
      const numeroCeros = longitudEsperada - vector.length;
      const vectorAjustado = [...vector];
      for (let i = 0; i < numeroCeros; i++) {
        vectorAjustado.unshift(0);
      }

      return vectorAjustado;
    }
  }
}
