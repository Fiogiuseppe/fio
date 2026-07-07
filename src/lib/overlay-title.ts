const MAX_SINGLE_LINE_CHARS = 20;

/** Pick a word boundary so both lines stay as even as possible. */
function balanceWords(words: string[]): [string, string] {
  if (words.length <= 1) {
    const word = words[0] ?? '';
    if (word.length <= 1) return [word, ''];
    const splitAt = Math.max(2, Math.ceil(word.length / 2));
    return [word.slice(0, splitAt), word.slice(splitAt)];
  }

  let bestIndex = 1;
  let bestScore = Infinity;

  for (let index = 1; index < words.length; index += 1) {
    const lineOne = words.slice(0, index).join(' ');
    const lineTwo = words.slice(index).join(' ');
    const score = Math.max(lineOne.length, lineTwo.length);
    if (score < bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }

  return [words.slice(0, bestIndex).join(' '), words.slice(bestIndex).join(' ')];
}

function splitCollabTitle(left: string, client: string): [string, string] {
  const leftWords = left.split(/\s+/).filter(Boolean);
  const right = `x ${client}`;

  if (left.length <= MAX_SINGLE_LINE_CHARS || leftWords.length <= 2) {
    return [left, right];
  }

  const [lineOne, lineTwoPrefix] = balanceWords(leftWords);
  return [lineOne, lineTwoPrefix ? `${lineTwoPrefix} ${right}` : right];
}

/** Split a project title into exactly two overlay lines — never a third wrap. */
export function splitOverlayTitle(title: string): [string, string] {
  const text = title.trim();
  if (!text) return ['', ''];

  const collabMatch = text.match(/^(.+?)\s+[x×]\s+(.+)$/i);
  if (collabMatch) {
    return splitCollabTitle(collabMatch[1].trim(), collabMatch[2].trim());
  }

  const dashMatch = text.match(/^(.+?)\s[—–-]\s+(.+)$/);
  if (dashMatch) {
    const left = dashMatch[1].trim();
    const right = dashMatch[2].trim();
    if (left.length <= MAX_SINGLE_LINE_CHARS) return [left, right];
    const [lineOne, lineTwoPrefix] = balanceWords(left.split(/\s+/));
    return [lineOne, lineTwoPrefix ? `${lineTwoPrefix} — ${right}` : right];
  }

  return balanceWords(text.split(/\s+/).filter(Boolean));
}
