export function formatTimestamp(date: Date): string {
  try {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat('en-US', options)?.format(date);
  } catch (error) {
    return '';
  }
}

export function formatNumber(num: number, decimals?: number): string {
  if (Number.isInteger(num)) {
    return num.toString();
  } else {
    return num.toFixed(decimals || 0);
  }
}
