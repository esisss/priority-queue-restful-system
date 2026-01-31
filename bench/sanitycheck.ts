export function benchmark(name: string, fn: () => void) {
  const start = process.hrtime.bigint();
  fn();
  const end = process.hrtime.bigint();
  const ms = Number(end - start) / 1_000_000;
  console.log(`${name}: ${ms.toFixed(2)} ms`);
}
