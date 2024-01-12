import * as lib2 from "@chehsunliu/demo-lib2";

export class Calculator {
  constructor() {
    this.calculator = new lib2.Calculator();
  }

  /**
   * @param {number} n
   * @returns {boolean}
   */
  isEven(n) {
    return !this.calculator.isOdd(n);
  }
}
