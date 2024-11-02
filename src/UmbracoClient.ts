import { getExpandParam, getSortParam } from '@utils/params.ts';
import type { Options } from '@types';

class UmbracoClient {
  private deliveryApiUrl: string;

  constructor({ baseUrl, version }: { baseUrl: string; version: string }) {
    this.deliveryApiUrl = `${baseUrl}/umbraco/delivery/api/${version}/content`;
  }

  public async getContentById(id: string) {
    const response = await fetch(`${this.deliveryApiUrl}/item/${id}`);
    const data = await response.json();

    return data;
  }

  public async getContentByType(itemType: string, options?: Options) {
    const { sort, expand } = options || {};

    const response = await fetch(
      `${this.deliveryApiUrl}?filter=contentType:${itemType}${getSortParam(
        sort
      )}${getExpandParam(expand)}`
    );
    const data = await response.json();

    return data.items;
  }
}

export default UmbracoClient;
