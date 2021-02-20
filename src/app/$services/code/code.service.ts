import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  code = '';

  constructor() { }

  addCode(code) {
    this.code = code;
  }

  getCode() {
    return this.code;
  }

  clearCode() {
    this.code = '';
    return this.code;
  }
}
