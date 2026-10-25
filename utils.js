// Funções puras (sem DOM, sem rede) — fáceis de testar com Jest.
function formatarNumero(id) {
  return String(id).padStart(3, "0");
}
function formatarAltura(decimetros) {
  return (decimetros / 10).toFixed(1).replace(".", ",");
}
function formatarPeso(hectogramas) {
  return (hectogramas / 10).toFixed(1).replace(".", ",");
}
function normalizarTermo(texto) {
  return String(texto).trim().toLowerCase();
}
function larguraBarra(valor, maximo = 150) {
  return Math.min((valor / maximo) * 100, 100);
}
if (typeof module !== "undefined") {
  module.exports = { formatarNumero, formatarAltura, formatarPeso, normalizarTermo, larguraBarra };
}
