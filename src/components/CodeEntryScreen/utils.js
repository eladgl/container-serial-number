const normalizeCellToPatternValue = (cell) => {
  const s = String(cell ?? '').trim();
  if (!s) return null;
  return s[0].toUpperCase(); // 1 char
}

export {
    normalizeCellToPatternValue
};