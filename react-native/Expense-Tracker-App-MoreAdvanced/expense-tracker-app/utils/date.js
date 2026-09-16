export function getFormattedDate(date) {
  // Gönderilen değerin geçerli bir Date objesi olduğundan emin oluyoruz
  if (!(date instanceof Date) || isNaN(date)) {
    return "Invalid Date";
  }
  
  return date.toLocaleDateString('en-US', {
    day: 'numeric',   // Gün (Sayı)
    month: 'long',    // Ay (İsim)
    year: 'numeric'   // Yıl (Sayı)
  });
}

export function getDateMinusDays(date, days) {
  // Gönderilen değerin geçerli bir Date objesi olduğundan emin oluyoruz
  if (!(date instanceof Date) || isNaN(date)) {
    return "Invalid Date";
  }

  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - days);
  return newDate;
}
