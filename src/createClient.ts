const DELIVERY_API_PATH = '/umbraco/delivery/api/v1/content'

type Options = {
  sort?: {
    type: 'createDate' | 'updateDate' | 'sortOrder' | 'name' | 'level'
    order: 'asc' | 'desc'
  }
  expand?: 'all' | string[]
}

function getSortParam(sort: Options['sort']) {
  if (!sort) return ''

  return `&sort=${sort.type}:${sort.order}`
}

function getExpandParam(expand: Options['expand']): string {
  let expandParam = ''

  if (expand === 'all') {
    expandParam = '&expand=all'
  } else if (typeof expand === 'object') {
    expandParam = '?expand=property:'

    expand.forEach((item, index) => {
      expandParam += index === 0 ? item : `,${item}`
    })
  }

  return expandParam
}

function createClient(domain: string) {
  const deliveryApiUrl = `${domain}${DELIVERY_API_PATH}`

  return {
    getContentById: async (id: string) => {
      const response = await fetch(`${deliveryApiUrl}/item/${id}`)
      const data = await response.json()

      return data
    },
    getContentByType: async (itemType: string, options?: Options) => {
      const { sort, expand } = options || {}

      const response = await fetch(
        `${deliveryApiUrl}?filter=contentType:${itemType}${getSortParam(
          sort
        )}${getExpandParam(expand)}`
      )
      const data = await response.json()

      return data.items
    }
  }
}

export { createClient }
