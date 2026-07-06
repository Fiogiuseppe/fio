/** Split a project title into two lines for discreet overlay typography. */
export function splitOverlayTitle(title: string): [string, string] {
  const text = title.trim();
  if (!text) return ['', ''];

  const collabMatch = text.match(/^(.+?)\s+[x×]\s+(.+)$/i);
  if (collabMatch) {
    return [collabMatch[1].trim(), `x ${collabMatch[2].trim()}`];
  }

  const dashMatch = text.match(/^(.+?)\s[—–-]\s+(.+)$/);
  if (dashMatch) {
    return [dashMatch[1].trim(), dashMatch[2].trim()];
  }

  const words = text.split(/\s+/);
  if (words.length >= 2) {
    const midpoint = Math.ceil(words.length / 2);
    return [words.slice(0, midpoint).join(' '), words.slice(midpoint).join(' ')];
  }

  const word = words[0];
  const splitAt = Math.max(2, Math.ceil(word.length / 2));
  return [word.slice(0, splitAt), word.slice(splitAt)];
}
