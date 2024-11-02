"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

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
  getAllContent() {
    return __async(this, null, function* () {
      const response = yield fetch(`${this.deliveryApiUrl}?expand=all`);
      const data = yield response.json();
      return data.items;
    });
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
