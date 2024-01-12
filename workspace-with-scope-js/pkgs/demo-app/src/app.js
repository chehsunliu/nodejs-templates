import { Calculator } from "@chehsunliu/demo-lib1";

async function main() {
  if (process.argv.length <= 2) {
    console.log("No arg was given.");
    process.exit(1);
  }

  const n = parseInt(process.argv[2], 10);
  const calculator = new Calculator();

  const isEven = calculator.isEven(n);
  console.log(`The number ${n} is`, isEven ? "even" : "odd");
}

main().then();
