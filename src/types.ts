export type Sort = {
  type: 'createDate' | 'updateDate' | 'sortOrder' | 'name' | 'level';
  order: 'asc' | 'desc';
};

export type Expand = 'all' | string[];

export type Options = {
  sort?: Sort;
  expand?: Expand;
};
