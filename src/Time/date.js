function toShamsi(dateStr) {
  if (!dateStr) return '--';

  const date = new Date(dateStr);

  return new Intl.DateTimeFormat('fa-IR-u-ca-persian-nu-latn', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export { toShamsi };

export const normalizeTime = (time) => {
  if (!time) return '';
  return time.slice(0, 5);
};
