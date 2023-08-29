/**
 * Shorten the checksummed version of the input address to have 0x + 4 characters at start and end
 * @param hash
 * @param chars
 */
export function shortenHash(hash?: string, chars = 4): string {
  if (!hash || hash.length <= chars * 2 + 2) {
    return hash || '';
  }

  const prefix = hash.slice(0, chars + 2);
  const suffix = hash.slice(-chars);
  return `${prefix}...${suffix}`;
}
