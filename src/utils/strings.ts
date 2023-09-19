export function formatTimestamp(date: Date): string {
  try {
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
