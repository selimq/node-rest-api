export function turkishToEnglish(text) {
  return text
    .replace(/Ğ/gim, "G")
    .replace(/Ü/gim, "U")
    .replace(/Ş/gim, "S")
    .replace(/I/gim, "I")
    .replace(/İ/gim, "I")
    .replace(/Ö/gim, "O")
    .replace(/Ç/gim, "C")
    .replace(/ğ/gim, "g")
    .replace(/ü/gim, "u")
    .replace(/ş/gim, "s")
    .replace(/ı/gim, "i")
    .replace(/ö/gim, "o")
    .replace(/ç/gim, "c");
}
