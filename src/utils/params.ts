import type { Sort, Expand } from '@types';

export function getSortParam(sort?: Sort): string {
  if (!sort) return '';

  return `&sort=${sort.type}:${sort.order}`;
}

export function getExpandParam(expand?: Expand): string {
  let expandParam = '';

  if (expand === 'all') {
    expandParam = '&expand=all';
  } else if (typeof expand === 'object') {
    expandParam = '?expand=property:';

    expand.forEach((item, index) => {
      expandParam += index === 0 ? item : `,${item}`;
    });
  }

  return expandParam;
}
