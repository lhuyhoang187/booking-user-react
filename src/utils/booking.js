export function formatVnd(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Số đêm giữa check-in và check-out (tối thiểu 1) */
export function countNights(checkInStr, checkOutStr) {
  if (!checkInStr || !checkOutStr) return 1;
  const start = new Date(checkInStr);
  const end = new Date(checkOutStr);
  const ms = end.getTime() - start.getTime();
  if (Number.isNaN(ms) || ms <= 0) return 1;
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export function todayISODate() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

export function addDaysISODate(isoDate, days) {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
