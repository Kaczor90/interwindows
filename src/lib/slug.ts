// ASCII slug for URLs and anchors: ą→a, ć→c, ę→e, ł→l, ń→n, ó→o, ś→s, ź/ż→z (docs/seo-plan.md §5.8).
// "ł" is mapped before NFD normalisation because it has no decomposed form.
export const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
