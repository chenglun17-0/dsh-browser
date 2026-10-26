import Schema from '@deepseek-ai/schemastery'

const PACKAGE_NAME = '@chenglun17-0/dsh-browser'
const ENTRY_ID = 'include:dsh-browser'

export const inject = ['connection', 'configEditor']

export const Config = Schema.object({
  defaultUrl: Schema.string()
    .required()
    .pattern(/^https?:\/\/[^\s]+$/iu)
    .role('url')
    .description('Default HTTP(S) URL opened by Home, Cmd+T, and new tabs.'),
  afterSendBehavior: Schema.union([
    Schema.const('open-session'),
    Schema.const('stay-browser'),
  ])
    .required()
    .description('Where to remain after Send to DSH succeeds.'),
})

function json(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: {
      'cache-control': 'no-store',
      'content-type': 'application/json; charset=utf-8',
    },
  })
}

function normalizeDefaultUrl(value) {
  if (typeof value !== 'string' || !value.trim() || value.length > 16384) return undefined
  try {
    const url = new URL(value.trim())
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return undefined
    if (url.username || url.password) return undefined
    return url.href
  } catch {
    return undefined
  }
}

function normalizeAfterSendBehavior(value) {
  return value === 'open-session' || value === 'stay-browser' ? value : undefined
}

export function apply(ctx, config) {
  ctx.effect(() => ctx.connection.fetch.register({
    path: '/api/dsh-browser/config',
    methods: ['GET', 'POST'],
    requestBody: 'buffered',
    async fetch(request) {
      if (request.method === 'GET') {
        return json({
          defaultUrl: config.defaultUrl,
          afterSendBehavior: config.afterSendBehavior,
        })
      }

      let payload
      try {
        payload = await request.json()
      } catch {
        return json({ error: 'invalid-json' }, 400)
      }
      const defaultUrl = normalizeDefaultUrl(payload?.defaultUrl)
      if (!defaultUrl) return json({ error: 'invalid-default-url' }, 400)
      const afterSendBehavior = normalizeAfterSendBehavior(payload?.afterSendBehavior)
      if (!afterSendBehavior) return json({ error: 'invalid-after-send-behavior' }, 400)

      const entry = ctx.configEditor.entries().find((candidate) => (
        candidate.id === ENTRY_ID
        || candidate.name === PACKAGE_NAME
        || candidate.moduleName === PACKAGE_NAME
      ))
      if (!entry) return json({ error: 'config-entry-not-found' }, 500)

      await ctx.configEditor.edit(entry, (current) => ({
        ...current,
        defaultUrl,
        afterSendBehavior,
      }))
      return json({ defaultUrl, afterSendBehavior })
    },
  }), 'dsh-browser.config-route')
}
