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

// src/createClient.ts
var DELIVERY_API_PATH = "/umbraco/delivery/api/v1/content";
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
function createClient(domain) {
  const deliveryApiUrl = `${domain}${DELIVERY_API_PATH}`;
  return {
    getContentById: (id) => __async(this, null, function* () {
      const response = yield fetch(`${deliveryApiUrl}/item/${id}`);
      const data = yield response.json();
      return data;
    }),
    getContentByType: (itemType, options) => __async(this, null, function* () {
      const { sort, expand } = options || {};
      const response = yield fetch(
        `${deliveryApiUrl}?filter=contentType:${itemType}${getSortParam(
          sort
        )}${getExpandParam(expand)}`
      );
      const data = yield response.json();
      return data.items;
    })
  };
}

// src/index.ts
var src_default = createClient;
