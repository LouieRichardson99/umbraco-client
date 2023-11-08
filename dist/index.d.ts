type Options = {
    sort?: {
        type: 'createDate' | 'updateDate' | 'sortOrder' | 'name' | 'level';
        order: 'asc' | 'desc';
    };
    expand?: 'all' | string[];
};
declare function createClient(domain: string): {
    getContentById: (id: string) => Promise<any>;
    getContentByType: (itemType: string, options?: Options) => Promise<any>;
};

export { createClient as default };
