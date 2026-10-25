const { formatarNumero, formatarAltura, formatarPeso, normalizarTermo, larguraBarra } = require("./utils");

test("formatarNumero completa com zeros", () => {
  expect(formatarNumero(25)).toBe("025");
  expect(formatarNumero(1025)).toBe("1025");
});
test("formatarAltura converte decímetros em metros com vírgula", () => {
  expect(formatarAltura(4)).toBe("0,4");
});
test("formatarPeso converte hectogramas em kg com vírgula", () => {
  expect(formatarPeso(60)).toBe("6,0");
});
test("normalizarTermo remove espaços e põe minúsculas", () => {
  expect(normalizarTermo("  PiKaChu ")).toBe("pikachu");
});
test("larguraBarra limita a 100%", () => {
  expect(larguraBarra(75)).toBe(50);
  expect(larguraBarra(300)).toBe(100);
});
