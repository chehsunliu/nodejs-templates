import * as lib2 from "@chehsunliu/demo-lib2";

export class Calculator {
  constructor() {
    this.calculator = new lib2.Calculator();
  }

  isEven(n) {
    return !this.calculator.isOdd(n);
  }
}
