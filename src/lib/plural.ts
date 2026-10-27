/** Polish plural: plural(1, 'zdjęcie', 'zdjęcia', 'zdjęć') → 'zdjęcie'; 3 → 'zdjęcia'; 5, 12, 25 → 'zdjęć'; 22 → 'zdjęcia'. */
export const plural = (n: number, one: string, few: string, many: string) => {
  if (n === 1) return one;
  const d = n % 10;
  const t = n % 100;
  return d >= 2 && d <= 4 && (t < 12 || t > 14) ? few : many;
};

/** "4 zdjęcia", "10 zdjęć" */
export const count = (n: number, one: string, few: string, many: string) => `${n} ${plural(n, one, few, many)}`;
