export function formatTimestamp(timestamp: number): string {
  try {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat('en-US', options)?.format(date);
  } catch (error) {
    return '';
  }
}
