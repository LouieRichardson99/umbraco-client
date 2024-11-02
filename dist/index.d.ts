type Sort = {
    type: 'createDate' | 'updateDate' | 'sortOrder' | 'name' | 'level';
    order: 'asc' | 'desc';
};
type Expand = 'all' | string[];
type Options = {
    sort?: Sort;
    expand?: Expand;
};

declare class UmbracoClient {
    private deliveryApiUrl;
    constructor({ baseUrl, version }: {
        baseUrl: string;
        version: string;
    });
    getContentById(id: string): Promise<any>;
    getContentByType(itemType: string, options?: Options): Promise<any>;
}

declare const createClient: (baseUrl: string, { version }?: {
    version?: string | undefined;
}) => UmbracoClient;

export { createClient as default };
