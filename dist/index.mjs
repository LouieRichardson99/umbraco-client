var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/utils/params.ts
function getSortParam(sort) {
  if (!sort)
    return "";
  return `&sort=${sort.type}:${sort.order}`;
}
function getExpandParam(expand) {
  let expandParam = "";
  if (expand === "all") {
    expandParam = "&expand=all";
  } else if (typeof expand === "object") {
    expandParam = "?expand=property:";
    expand.forEach((item, index) => {
      expandParam += index === 0 ? item : `,${item}`;
    });
  }
  return expandParam;
}

// src/UmbracoClient.ts
var UmbracoClient = class {
  constructor({ baseUrl, version }) {
    this.deliveryApiUrl = `${baseUrl}/umbraco/delivery/api/${version}/content`;
  }
  getContentById(id) {
    return __async(this, null, function* () {
      const response = yield fetch(`${this.deliveryApiUrl}/item/${id}`);
      const data = yield response.json();
      return data;
    });
  }
  getContentByType(itemType, options) {
    return __async(this, null, function* () {
      const { sort, expand } = options || {};
      const response = yield fetch(
        `${this.deliveryApiUrl}?filter=contentType:${itemType}${getSortParam(
          sort
        )}${getExpandParam(expand)}`
      );
      const data = yield response.json();
      return data.items;
    });
  }
};
var UmbracoClient_default = UmbracoClient;

// src/index.ts
var createClient = (baseUrl, { version = "v2" } = {}) => {
  return new UmbracoClient_default({ baseUrl, version });
};
var src_default = createClient;
export {
  src_default as default
};
