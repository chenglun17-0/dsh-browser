import * as React from 'react'
import { createStore } from 'zustand/vanilla'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder'

const STORAGE_KEY = 'dsh.global-browser.tabs.v2'
const PANEL_ID = 'browser'
const NAMESPACE = 'dshBrowser'
const MAX_TABS = 20
const SIDEBAR_COLLAPSED_WIDTH = 104
const SIDEBAR_DEFAULT_WIDTH = 190
const SIDEBAR_MIN_WIDTH = 132
const SIDEBAR_MAX_WIDTH = 420
const DND_TYPE = 'dsh-browser-tab'
const IFRAME_SANDBOX = 'allow-scripts allow-forms allow-same-origin'

const zh = {
  'panel.label': '浏览器',
  'tabs.label': '浏览器标签',
  'tabs.new': '新建标签',
  'tabs.close': '关闭标签',
  'tabs.drag': '拖动排序',
  'tabs.limit': '最多保留 20 个标签',
  'tabs.collapse': '收起标签栏',
  'tabs.expand': '展开标签栏',
  'tabs.resize': '调整标签栏宽度',
  back: '后退',
  forward: '前进',
  reload: '刷新',
  home: '主页',
  'error.config': '无法读取默认 URL 设置。',
  'settings.open': '设置默认 URL',
  'settings.title': '默认 URL',
  'settings.label': '新标签和主页打开的网址',
  'settings.afterSend': '任意门行为',
  'settings.openSession': '跳转到新会话',
  'settings.stayBrowser': '留在浏览器',
  'settings.cancel': '取消',
  'settings.save': '保存',
  'settings.saving': '正在保存…',
  'settings.saveError': '保存失败，请重试。',
  'portal.open': '发送到 DSH',
  'portal.title': '发送到 DSH',
  'portal.workspace': '工作区',
  'portal.noWorkspace': '暂无可用工作区',
  'portal.text': '发送内容',
  'portal.note': '补充文字',
  'portal.notePlaceholder': '为截图添加说明（可选）',
  'portal.cancel': '取消',
  'portal.send': '发送',
  'portal.sending': '正在发送…',
  'portal.capture': '拖动截取网页区域',
  'portal.captureError': '截图失败，请重试。',
  'portal.sendError': '无法创建会话或发送内容，请重试。',
  go: '前往',
  'address.label': '网址',
  'address.placeholder': '输入网址',
  'address.changed': '页面已跳转，地址无法读取',
  'error.empty': '请输入地址。',
  'error.invalid': '地址无效或过长。',
  'error.protocol': '只支持 HTTP 和 HTTPS 地址。',
  'error.credentials': '地址不能包含用户名或密码。',
  'error.application-origin': '不能在内嵌浏览器中打开 DSH 自身。',
  'error.load': '页面加载失败，请刷新重试。',
  'find.placeholder': '在页面中查找',
  'find.previous': '上一个匹配项',
  'find.next': '下一个匹配项',
  'find.close': '关闭搜索',
  'shortcut.select': '切换到浏览器标签',
  'shortcut.new': '新建浏览器标签',
  'shortcut.close': '关闭当前浏览器标签',
  'shortcut.reload': '刷新当前浏览器标签',
  'shortcut.find': '在当前页面中查找',
}

const en = {
  'panel.label': 'Browser',
  'tabs.label': 'Browser tabs',
  'tabs.new': 'New tab',
  'tabs.close': 'Close tab',
  'tabs.drag': 'Drag to reorder',
  'tabs.limit': 'Up to 20 tabs can be kept',
  'tabs.collapse': 'Collapse tab sidebar',
  'tabs.expand': 'Expand tab sidebar',
  'tabs.resize': 'Resize tab sidebar',
  back: 'Back',
  forward: 'Forward',
  reload: 'Reload',
  home: 'Home',
  'error.config': 'Could not load the default URL setting.',
  'settings.open': 'Set default URL',
  'settings.title': 'Default URL',
  'settings.label': 'Address opened by new tabs and Home',
  'settings.afterSend': 'Portal behavior',
  'settings.openSession': 'Open the new session',
  'settings.stayBrowser': 'Stay in Browser',
  'settings.cancel': 'Cancel',
  'settings.save': 'Save',
  'settings.saving': 'Saving…',
  'settings.saveError': 'Could not save. Try again.',
  'portal.open': 'Send to DSH',
  'portal.title': 'Send to DSH',
  'portal.workspace': 'Workspace',
  'portal.noWorkspace': 'No workspace available',
  'portal.text': 'Content',
  'portal.note': 'Additional text',
  'portal.notePlaceholder': 'Add context for the capture (optional)',
  'portal.cancel': 'Cancel',
  'portal.send': 'Send',
  'portal.sending': 'Sending…',
  'portal.capture': 'Drag to capture a page region',
  'portal.captureError': 'Could not capture the page. Try again.',
  'portal.sendError': 'Could not create a session or send the content. Try again.',
  go: 'Go',
  'address.label': 'Address',
  'address.placeholder': 'Enter an address',
  'address.changed': 'The page navigated and its address is unavailable',
  'error.empty': 'Enter an address.',
  'error.invalid': 'The address is invalid or too long.',
  'error.protocol': 'Only HTTP and HTTPS addresses are supported.',
  'error.credentials': 'Addresses cannot contain a username or password.',
  'error.application-origin': 'The embedded browser cannot open DSH itself.',
  'error.load': 'The page could not load. Reload it to try again.',
  'find.placeholder': 'Find on page',
  'find.previous': 'Previous match',
  'find.next': 'Next match',
  'find.close': 'Close find',
  'shortcut.select': 'Select browser tab',
  'shortcut.new': 'New browser tab',
  'shortcut.close': 'Close current browser tab',
  'shortcut.reload': 'Reload current browser tab',
  'shortcut.find': 'Find on current page',
}

const css = `
  .dsh-browser-root {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-base);
    display: flex;
    position: relative;
    overflow: hidden;
  }
  .dsh-browser-tabs {
    box-sizing: border-box;
    width: 190px;
    min-width: ${SIDEBAR_MIN_WIDTH}px;
    min-height: 0;
    flex: 0 1 190px;
    display: flex;
    flex-direction: column;
    background: var(--dsw-specific-sidebar-fill);
    border-right: 1px solid var(--dsw-alias-border-l1);
  }
  .dsh-browser-tabs-head {
    box-sizing: border-box;
    height: 44px;
    flex: none;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 8px 7px 12px;
    border-bottom: 1px solid var(--dsw-alias-border-l1);
  }
  .dsh-browser-tab-list {
    min-height: 0;
    flex: 1;
    overflow: auto;
    padding: 6px;
  }
  .dsh-browser-tab-row {
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-radius: 6px;
  }
  .dsh-browser-tab-row:hover { background: var(--dsw-alias-bg-layer-1); }
  .dsh-browser-tab-row.is-active {
    background: var(--dsw-alias-bg-layer-2);
    border-left-color: var(--dsw-alias-brand-primary);
  }
  .dsh-browser-tab-row.is-dragging { opacity: .5; }
  .dsh-browser-tab-row.is-drop-target {
    border-top-color: var(--dsw-alias-brand-primary);
  }
  .dsh-browser-drag-handle {
    width: 20px;
    height: 100%;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--dsw-alias-label-secondary);
    cursor: grab;
    touch-action: none;
  }
  .dsh-browser-drag-handle:active { cursor: grabbing; }
  .dsh-browser-tab-select {
    box-sizing: border-box;
    min-width: 0;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 0 4px 0 2px;
    color: var(--dsw-alias-label-secondary);
    background: transparent;
    border: 0;
    cursor: pointer;
    text-align: left;
  }
  .dsh-browser-tab-row.is-active .dsh-browser-tab-select {
    color: var(--dsw-alias-label-primary);
  }
  .dsh-browser-tab-title {
    min-width: 0;
    overflow: hidden;
    font-size: 12px;
    letter-spacing: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dsh-browser-favicon {
    width: 16px;
    height: 16px;
    flex: none;
    display: block;
    object-fit: contain;
  }
  .dsh-browser-sidebar-resizer {
    box-sizing: border-box;
    width: 5px;
    min-width: 5px;
    align-self: stretch;
    position: relative;
    z-index: 2;
    background: transparent;
    cursor: col-resize;
    touch-action: none;
  }
  .dsh-browser-sidebar-resizer::after {
    content: '';
    position: absolute;
    inset: 0 2px;
    background: var(--dsw-alias-border-l1);
  }
  .dsh-browser-sidebar-resizer:hover::after,
  .dsh-browser-sidebar-resizer:focus-visible::after,
  .dsh-browser-root.is-resizing-sidebar .dsh-browser-sidebar-resizer::after {
    inset: 0 1px;
    background: var(--dsw-alias-brand-primary);
  }
  .dsh-browser-sidebar-resizer:focus-visible { outline: none; }
  .dsh-browser-root.is-resizing-sidebar {
    cursor: col-resize;
    user-select: none;
  }
  .dsh-browser-pages {
    min-width: 0;
    min-height: 0;
    flex: 1;
    position: relative;
  }
  .dsh-browser-page {
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    display: none;
    flex-direction: column;
  }
  .dsh-browser-page.is-active { display: flex; }
  .dsh-browser-toolbar,
  .dsh-browser-findbar {
    box-sizing: border-box;
    flex: none;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 7px 10px;
    border-bottom: 1px solid var(--dsw-alias-border-l1);
    background: var(--dsw-alias-bg-layer-1);
  }
  .dsh-browser-toolbar { height: 44px; }
  .dsh-browser-findbar { height: 40px; justify-content: flex-end; }
  .dsh-browser-button {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: var(--dsw-alias-label-secondary);
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    cursor: pointer;
  }
  .dsh-browser-button:hover:not(:disabled),
  .dsh-browser-button:focus-visible,
  .dsh-browser-tab-select:focus-visible,
  .dsh-browser-drag-handle:focus-visible {
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-layer-2);
    border-color: var(--dsw-alias-border-l1);
    outline: none;
  }
  .dsh-browser-button:disabled {
    color: var(--dsw-alias-state-idle-primary);
    cursor: default;
    opacity: .55;
  }
  .dsh-browser-tab-close { opacity: 0; margin-right: 2px; }
  .dsh-browser-tab-row:hover .dsh-browser-tab-close,
  .dsh-browser-tab-row.is-active .dsh-browser-tab-close,
  .dsh-browser-tab-close:focus-visible { opacity: 1; }
  .dsh-browser-new-tab { margin-left: auto; }
  .dsh-browser-tabs.is-collapsed {
    min-width: ${SIDEBAR_COLLAPSED_WIDTH}px;
  }
  .dsh-browser-tabs.is-collapsed .dsh-browser-tabs-head {
    gap: 4px;
    padding: 7px 5px;
  }
  .dsh-browser-tabs.is-collapsed .dsh-browser-drag-handle,
  .dsh-browser-tabs.is-collapsed .dsh-browser-tab-title,
  .dsh-browser-tabs.is-collapsed .dsh-browser-tab-close {
    display: none;
  }
  .dsh-browser-tabs.is-collapsed .dsh-browser-tab-row {
    justify-content: center;
    border-left-color: transparent;
  }
  .dsh-browser-tabs.is-collapsed .dsh-browser-tab-row.is-active {
    border-left-color: var(--dsw-alias-brand-primary);
  }
  .dsh-browser-tabs.is-collapsed .dsh-browser-tab-select {
    width: 36px;
    flex: none;
    justify-content: center;
    padding: 0;
  }
  .dsh-browser-address-wrap { min-width: 96px; flex: 1 1 auto; position: relative; }
  .dsh-browser-address,
  .dsh-browser-find-input {
    box-sizing: border-box;
    height: 30px;
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-base);
    border: 1px solid var(--dsw-alias-border-l2);
    border-radius: 6px;
    font: inherit;
    font-size: 13px;
    letter-spacing: 0;
  }
  .dsh-browser-address { width: 100%; padding: 0 36px 0 10px; }
  .dsh-browser-find-input { width: min(320px, 45%); padding: 0 9px; }
  .dsh-browser-address:focus,
  .dsh-browser-find-input:focus {
    border-color: var(--dsw-alias-brand-primary);
    outline: 2px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent);
    outline-offset: 0;
  }
  .dsh-browser-go { position: absolute; top: 0; right: 0; }
  .dsh-browser-find-count {
    min-width: 54px;
    color: var(--dsw-alias-label-secondary);
    font-size: 12px;
    text-align: center;
  }
  .dsh-browser-status {
    box-sizing: border-box;
    min-height: 28px;
    flex: none;
    display: flex;
    align-items: center;
    padding: 5px 12px;
    color: var(--dsw-alias-label-secondary);
    background: var(--dsw-alias-bg-layer-2);
    border-bottom: 1px solid var(--dsw-alias-border-l1);
    font-size: 12px;
  }
  .dsh-browser-status-error { color: var(--dsw-alias-state-error-primary); }
  .dsh-browser-progress { height: 2px; flex: none; background: var(--dsw-alias-brand-primary); }
  .dsh-browser-viewport {
    min-width: 0;
    min-height: 0;
    flex: 1 1 auto;
    position: relative;
    background: var(--dsw-alias-bg-base);
  }
  .dsh-browser-frame,
  .dsh-browser-webview-host,
  .dsh-browser-webview-host webview {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 0;
    display: flex;
  }
  .dsh-browser-settings-backdrop {
    position: absolute;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: color-mix(in srgb, var(--dsw-alias-bg-base) 62%, transparent);
  }
  .dsh-browser-settings-dialog {
    box-sizing: border-box;
    width: min(520px, 100%);
    padding: 20px;
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-base);
    border: 1px solid var(--dsw-alias-border-l1);
    border-radius: 8px;
    box-shadow: 0 12px 36px color-mix(in srgb, black 24%, transparent);
  }
  .dsh-browser-settings-title {
    margin: 0 0 18px;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0;
  }
  .dsh-browser-settings-label {
    display: block;
    margin-bottom: 7px;
    color: var(--dsw-alias-label-secondary);
    font-size: 12px;
  }
  .dsh-browser-settings-input {
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    padding: 0 10px;
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-layer-1);
    border: 1px solid var(--dsw-alias-border-l2);
    border-radius: 6px;
    font: inherit;
    font-size: 13px;
    letter-spacing: 0;
  }
  .dsh-browser-settings-input:focus {
    border-color: var(--dsw-alias-brand-primary);
    outline: 2px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent);
  }
  .dsh-browser-settings-error {
    min-height: 18px;
    margin-top: 6px;
    color: var(--dsw-alias-state-error-primary);
    font-size: 12px;
  }
  .dsh-browser-settings-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 14px;
  }
  .dsh-browser-settings-action {
    min-width: 72px;
    height: 32px;
    padding: 0 14px;
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-layer-1);
    border: 1px solid var(--dsw-alias-border-l1);
    border-radius: 6px;
    cursor: pointer;
    font: inherit;
    font-size: 13px;
  }
  .dsh-browser-settings-action.is-primary {
    color: white;
    background: var(--dsw-alias-brand-primary);
    border-color: var(--dsw-alias-brand-primary);
  }
  .dsh-browser-settings-action:disabled { cursor: default; opacity: .55; }
  .dsh-browser-capture-layer {
    position: absolute;
    inset: 0;
    z-index: 8;
    overflow: hidden;
    background: color-mix(in srgb, black 32%, transparent);
    cursor: crosshair;
    touch-action: none;
  }
  .dsh-browser-capture-layer.has-selection { background: transparent; }
  .dsh-browser-capture-selection {
    position: absolute;
    box-sizing: border-box;
    border: 2px solid var(--dsw-alias-brand-primary);
    background: color-mix(in srgb, var(--dsw-alias-brand-primary) 8%, transparent);
    box-shadow: 0 0 0 9999px color-mix(in srgb, black 38%, transparent);
    pointer-events: none;
  }
  .dsh-browser-capture-layer.is-busy { cursor: wait; }
  .dsh-browser-portal-dialog {
    box-sizing: border-box;
    width: min(560px, 100%);
    max-height: min(680px, calc(100% - 40px));
    overflow: auto;
    padding: 20px;
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-base);
    border: 1px solid var(--dsw-alias-border-l1);
    border-radius: 8px;
    box-shadow: 0 12px 36px color-mix(in srgb, black 24%, transparent);
  }
  .dsh-browser-portal-preview {
    width: 100%;
    max-height: 260px;
    display: block;
    margin-bottom: 16px;
    object-fit: contain;
    background: var(--dsw-alias-bg-layer-1);
    border: 1px solid var(--dsw-alias-border-l1);
    border-radius: 6px;
  }
  .dsh-browser-portal-field { margin-bottom: 14px; }
  .dsh-browser-portal-select,
  .dsh-browser-portal-textarea {
    box-sizing: border-box;
    width: 100%;
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-layer-1);
    border: 1px solid var(--dsw-alias-border-l2);
    border-radius: 6px;
    font: inherit;
    font-size: 13px;
    letter-spacing: 0;
  }
  .dsh-browser-portal-select { height: 36px; padding: 0 10px; }
  .dsh-browser-portal-textarea {
    min-height: 112px;
    padding: 9px 10px;
    resize: vertical;
    line-height: 1.5;
  }
  .dsh-browser-portal-select:focus,
  .dsh-browser-portal-textarea:focus {
    border-color: var(--dsw-alias-brand-primary);
    outline: 2px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent);
  }
  .dsh-browser-portal-toast {
    position: absolute;
    right: 16px;
    bottom: 16px;
    z-index: 30;
    max-width: min(360px, calc(100% - 32px));
    padding: 9px 12px;
    color: var(--dsw-alias-state-error-primary);
    background: var(--dsw-alias-bg-base);
    border: 1px solid var(--dsw-alias-state-error-primary);
    border-radius: 6px;
    box-shadow: 0 8px 24px color-mix(in srgb, black 18%, transparent);
    font-size: 12px;
  }
  @media (max-width: 900px) {
    .dsh-browser-tabs { width: 152px; flex-basis: 152px; }
    .dsh-browser-toolbar, .dsh-browser-findbar { padding-left: 6px; padding-right: 6px; }
  }
`

function canonicalAddress(input) {
  const trimmed = String(input ?? '').trim()
  if (!trimmed) return { ok: false, reason: 'empty' }
  if (trimmed.length > 16384) return { ok: false, reason: 'invalid' }
  const candidate = /^[A-Za-z][A-Za-z\d+.-]*:(?!\d+(?:[/?#]|$))/u.test(trimmed)
    ? trimmed
    : `https://${trimmed}`
  let url
  try {
    url = new URL(candidate)
  } catch {
    return { ok: false, reason: 'invalid' }
  }
  if (url.username || url.password) return { ok: false, reason: 'credentials' }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return { ok: false, reason: 'protocol' }
  }
  if (url.origin === window.location.origin) {
    return { ok: false, reason: 'application-origin' }
  }
  return { ok: true, url: url.href }
}

function sanitizedFavicon(value) {
  if (typeof value !== 'string' || !value || value.length > 262144) return undefined
  if (value.startsWith('data:image/')) return value
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : undefined
  } catch {
    return undefined
  }
}

function fallbackFavicon(url) {
  try {
    return new URL('/favicon.ico', url).href
  } catch {
    return undefined
  }
}

function makeId() {
  return globalThis.crypto?.randomUUID?.()
    ?? `tab-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function clampSidebarWidth(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return SIDEBAR_DEFAULT_WIDTH
  return Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, Math.round(numeric)))
}

function makeTab(url) {
  const parsed = canonicalAddress(url)
  if (!parsed.ok) return undefined
  return {
    id: makeId(),
    title: new URL(parsed.url).hostname || 'Browser',
    url: parsed.url,
    favicon: fallbackFavicon(parsed.url),
  }
}

function sanitizedTabs(value) {
  if (!Array.isArray(value)) return []
  const seen = new Set()
  return value.slice(0, MAX_TABS).flatMap((tab) => {
    if (!tab || typeof tab.id !== 'string' || seen.has(tab.id)) return []
    const parsed = canonicalAddress(tab.url)
    if (!parsed.ok) return []
    seen.add(tab.id)
    return [{
      id: tab.id,
      title: typeof tab.title === 'string' && tab.title.trim()
        ? tab.title.trim().slice(0, 160)
        : new URL(parsed.url).hostname,
      url: parsed.url,
      favicon: sanitizedFavicon(tab.favicon) ?? fallbackFavicon(parsed.url),
    }]
  })
}

const browserStore = createStore(persist((set, get) => ({
  tabs: [],
  activeId: undefined,
  defaultUrl: undefined,
  afterSendBehavior: 'open-session',
  configError: false,
  sidebarWidth: SIDEBAR_DEFAULT_WIDTH,
  sidebarCollapsed: false,
  setSidebarWidth(value) {
    set({ sidebarWidth: clampSidebarWidth(value) })
  },
  toggleSidebar() {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }))
  },
  setConfig(rawUrl, afterSendBehavior) {
    const parsed = canonicalAddress(rawUrl)
    const behaviorValid = afterSendBehavior === 'open-session' || afterSendBehavior === 'stay-browser'
    if (!parsed.ok || !behaviorValid) {
      set({ configError: true })
      return false
    }
    const state = get()
    if (state.tabs.length) {
      set({
        defaultUrl: parsed.url,
        afterSendBehavior,
        configError: false,
      })
    } else {
      const tab = makeTab(parsed.url)
      set({
        defaultUrl: parsed.url,
        afterSendBehavior,
        configError: false,
        tabs: tab ? [tab] : [],
        activeId: tab?.id,
      })
    }
    return true
  },
  setConfigError() {
    set({ configError: true })
  },
  addTab(rawUrl) {
    const target = rawUrl ?? get().defaultUrl
    const parsed = canonicalAddress(target)
    if (!parsed.ok || get().tabs.length >= MAX_TABS) return undefined
    const tab = makeTab(parsed.url)
    if (!tab) return undefined
    set((state) => ({ tabs: [...state.tabs, tab], activeId: tab.id }))
    return tab.id
  },
  closeTab(id) {
    const state = get()
    const index = state.tabs.findIndex((tab) => tab.id === id)
    if (index < 0) return undefined
    let tabs = state.tabs.filter((tab) => tab.id !== id)
    if (!tabs.length) {
      const fallback = makeTab(state.defaultUrl)
      tabs = fallback ? [fallback] : []
    }
    const activeId = state.activeId === id
      ? tabs[Math.min(index, tabs.length - 1)]?.id
      : state.activeId
    set({ tabs, activeId })
    return activeId
  },
  selectTab(id) {
    if (get().tabs.some((tab) => tab.id === id)) set({ activeId: id })
  },
  updateTab(id, patch) {
    set((state) => {
      let changed = false
      const tabs = state.tabs.map((tab) => {
        if (tab.id !== id) return tab
        const next = { ...tab, ...patch }
        if (next.url === tab.url && next.title === tab.title && next.favicon === tab.favicon) return tab
        changed = true
        return next
      })
      return changed ? { tabs } : state
    })
  },
  moveTab(sourceId, targetId) {
    set((state) => {
      const startIndex = state.tabs.findIndex((tab) => tab.id === sourceId)
      const finishIndex = state.tabs.findIndex((tab) => tab.id === targetId)
      if (startIndex < 0 || finishIndex < 0 || startIndex === finishIndex) return state
      return { tabs: reorder({ list: state.tabs, startIndex, finishIndex }) }
    })
  },
}), {
  name: STORAGE_KEY,
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    tabs: state.tabs,
    activeId: state.activeId,
    sidebarWidth: state.sidebarWidth,
    sidebarCollapsed: state.sidebarCollapsed,
  }),
  merge: (persisted, current) => {
    const base = {
      ...current,
      sidebarWidth: clampSidebarWidth(persisted?.sidebarWidth),
      sidebarCollapsed: persisted?.sidebarCollapsed === true,
    }
    const tabs = sanitizedTabs(persisted?.tabs)
    if (!tabs.length) return base
    const activeId = tabs.some((tab) => tab.id === persisted?.activeId)
      ? persisted.activeId
      : tabs[0].id
    return { ...base, tabs, activeId }
  },
}))

function useBrowserStore(selector) {
  return React.useSyncExternalStore(
    browserStore.subscribe,
    () => selector(browserStore.getState()),
    () => selector(browserStore.getInitialState()),
  )
}

async function loadBrowserConfig(signal) {
  const response = await fetch('/api/dsh-browser/config', {
    method: 'GET',
    headers: { accept: 'application/json' },
    credentials: 'same-origin',
    signal,
  })
  if (!response.ok) throw new Error(`Config request failed: ${response.status}`)
  const payload = await response.json()
  if (!browserStore.getState().setConfig(payload?.defaultUrl, payload?.afterSendBehavior)) {
    throw new Error('Config returned invalid browser settings')
  }
}

async function saveBrowserConfig(defaultUrl, afterSendBehavior) {
  const response = await fetch('/api/dsh-browser/config', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({ defaultUrl, afterSendBehavior }),
  })
  if (!response.ok) throw new Error(`Config save failed: ${response.status}`)
  const payload = await response.json()
  if (!browserStore.getState().setConfig(payload?.defaultUrl, payload?.afterSendBehavior)) {
    throw new Error('Config save returned invalid browser settings')
  }
  return payload
}

function useWorkspaceItems(source) {
  return React.useSyncExternalStore(
    (listener) => source.subscribe(listener),
    () => source.getSnapshot().items,
    () => source.getSnapshot().items,
  )
}

async function sendPortalToWorkspace(ctx, workspaceId, payload, text, afterSendBehavior) {
  const content = []
  if (payload.kind === 'image') {
    const prefix = 'data:image/png;base64,'
    if (!payload.dataUrl.startsWith(prefix)) throw new Error('Invalid PNG capture')
    content.push({
      type: 'image',
      mediaType: 'image/png',
      data: payload.dataUrl.slice(prefix.length),
      name: 'browser-capture.png',
    })
    if (text) content.push({ type: 'text', text })
  } else {
    content.push({ type: 'text', text })
  }

  const sessionId = await ctx.sessions.create({ workspaceId })
  const reference = ctx.sessions.retain(sessionId, { source: 'dshBrowserCapture' })
  try {
    await reference.ready
    const result = await reference.binding.session.prompt(content, 'queue')
    if (!result.ok) {
      throw new Error(result.error?.message ?? 'Session prompt failed')
    }
    if (afterSendBehavior === 'open-session') ctx.uiWorkspace.openSession(sessionId)
    return sessionId
  } finally {
    reference.release()
  }
}

let panelLayout = { active: false, left: 0, top: 0, width: 0, height: 0 }
const panelLayoutSubscribers = new Set()
const desktopControllers = new Map()
const tabCommands = new Map()
let shortcutActions

function publishPanelLayout(next) {
  panelLayout = next
  for (const subscriber of panelLayoutSubscribers) subscriber()
}

function usePanelLayout() {
  return React.useSyncExternalStore(
    (listener) => {
      panelLayoutSubscribers.add(listener)
      return () => panelLayoutSubscribers.delete(listener)
    },
    () => panelLayout,
    () => panelLayout,
  )
}

function openEmbeddedTab(rawUrl) {
  const parsed = canonicalAddress(rawUrl)
  if (!parsed.ok) return false
  browserStore.getState().addTab(parsed.url)
  return true
}

function createDesktopController(tab, bridge) {
  let snapshot = {
    url: tab.url,
    title: tab.title,
    favicon: tab.favicon,
    loading: true,
    error: false,
    ready: false,
    canGoBack: false,
    canGoForward: false,
    findMatches: 0,
    findActive: 0,
  }
  let pendingUrl = tab.url
  let element
  let lease
  let host
  let unsubscribeOpen
  let bootstrapped = false
  let resetHistoryOnNextHttpLoad = true
  let findRequestId
  let pendingFind
  let loadEpoch = 0
  let loadingTimer
  let disposed = false
  const subscribers = new Set()
  const removers = []

  const publish = (patch) => {
    snapshot = { ...snapshot, ...patch }
    for (const subscriber of subscribers) subscriber()
  }

  const observe = () => {
    if (!element || disposed) return
    const parsed = canonicalAddress(element.getURL())
    if (!parsed.ok) return
    pendingUrl = parsed.url
    publish({
      url: parsed.url,
      title: element.getTitle() || new URL(parsed.url).hostname,
      loading: element.isLoading(),
      ready: true,
      canGoBack: element.canGoBack(),
      canGoForward: element.canGoForward(),
    })
  }

  const clearLoadingTimer = () => {
    if (loadingTimer !== undefined) window.clearTimeout(loadingTimer)
    loadingTimer = undefined
  }

  const beginLoading = () => {
    const epoch = ++loadEpoch
    clearLoadingTimer()
    publish({ loading: true, error: false })
    loadingTimer = window.setTimeout(() => {
      if (disposed || epoch !== loadEpoch) return
      try {
        if (element?.isLoading()) element.stop()
      } catch {}
      observe()
      publish({ loading: false })
      loadingTimer = undefined
    }, 30000)
  }

  const finishLoading = (patch = {}) => {
    loadEpoch += 1
    clearLoadingTimer()
    observe()
    publish({ loading: false, ...patch })
  }

  const add = (name, listener) => {
    element.addEventListener(name, listener)
    removers.push(() => element?.removeEventListener(name, listener))
  }

  const clearBootstrapHistory = () => {
    if (!resetHistoryOnNextHttpLoad || !element || disposed) return
    const parsed = canonicalAddress(element.getURL())
    if (!parsed.ok) return
    try {
      element.clearHistory()
      resetHistoryOnNextHttpLoad = false
    } catch {}
    observe()
  }

  const installSelectionTracker = async () => {
    if (!element || disposed) return
    try {
      await element.executeJavaScript(`(() => {
        const cacheKey = '__dshBrowserSelectionCacheV1'
        const trackerKey = '__dshBrowserSelectionTrackerV1'
        if (globalThis[trackerKey]) return
        globalThis[cacheKey] = ''
        const remember = () => {
          const text = String(globalThis.getSelection?.()?.toString() ?? '').trim()
          if (text) globalThis[cacheKey] = text
        }
        document.addEventListener('pointerdown', () => {
          globalThis[cacheKey] = ''
        }, true)
        document.addEventListener('selectionchange', remember, true)
        document.addEventListener('mouseup', remember, true)
        globalThis[trackerKey] = true
      })()`, true)
    } catch {}
  }

  const startFind = () => {
    if (!pendingFind || !element || !snapshot.ready || snapshot.loading) return false
    try {
      const requestId = element.findInPage(pendingFind.query, {
        forward: pendingFind.forward,
        findNext: pendingFind.findNext,
      })
      if (typeof requestId === 'number') findRequestId = requestId
      return true
    } catch {
      return false
    }
  }

  const controller = {
    getSnapshot: () => snapshot,
    subscribe(listener) {
      subscribers.add(listener)
      return () => subscribers.delete(listener)
    },
    attach(nextHost) {
      host = nextHost
      if (element && element.parentNode !== host) host.append(element)
      return () => {
        if (host === nextHost) host = undefined
      }
    },
    load(rawUrl) {
      const parsed = canonicalAddress(rawUrl)
      if (!parsed.ok) return parsed
      pendingUrl = parsed.url
      pendingFind = undefined
      findRequestId = undefined
      if (element && typeof element.stopFindInPage === 'function') {
        try { element.stopFindInPage('clearSelection') } catch {}
      }
      publish({
        url: parsed.url,
        title: new URL(parsed.url).hostname,
        favicon: fallbackFavicon(parsed.url),
        findMatches: 0,
        findActive: 0,
      })
      beginLoading()
      if (snapshot.ready && element) {
        element.loadURL(parsed.url).catch(() => finishLoading({ error: true }))
      }
      return parsed
    },
    reload() {
      if (!element) return
      pendingFind = undefined
      findRequestId = undefined
      if (typeof element.stopFindInPage === 'function') {
        try { element.stopFindInPage('clearSelection') } catch {}
      }
      try {
        if (element.isLoading()) element.stop()
        beginLoading()
        const current = canonicalAddress(element.getURL())
        if (current.ok) {
          element.reload()
        } else {
          resetHistoryOnNextHttpLoad = true
          element.loadURL(pendingUrl).catch(() => finishLoading({ error: true }))
        }
      } catch {
        finishLoading({ error: true })
      }
    },
    command(name) {
      if (!element) return
      try {
        element[name]()
      } catch {
        publish({ loading: false, error: true })
      }
    },
    find(query, forward = true, findNext = false) {
      if (!query) {
        controller.stopFind()
        return true
      }
      pendingFind = { query, forward, findNext }
      return startFind() || !snapshot.ready || snapshot.loading
    },
    stopFind() {
      pendingFind = undefined
      findRequestId = undefined
      if (element && typeof element.stopFindInPage === 'function') {
        try { element.stopFindInPage('clearSelection') } catch {}
      }
      publish({ findMatches: 0, findActive: 0 })
    },
    async selectedText() {
      if (!element || !snapshot.ready) return ''
      try {
        const value = await element.executeJavaScript(
          `(() => {
            const current = String(globalThis.getSelection?.()?.toString() ?? '').trim()
            return current || String(globalThis.__dshBrowserSelectionCacheV1 ?? '').trim()
          })()`,
          true,
        )
        return typeof value === 'string' ? value.trim() : ''
      } catch {
        return ''
      }
    },
    async captureRegion(rect) {
      if (!element || !snapshot.ready || typeof element.capturePage !== 'function') {
        throw new Error('WebView capture is unavailable')
      }
      const image = await element.capturePage({
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      })
      const dataUrl = image?.toDataURL?.()
      if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/png;base64,')) {
        throw new Error('WebView capture returned no PNG data')
      }
      return dataUrl
    },
    dispose() {
      if (disposed) return
      disposed = true
      loadEpoch += 1
      clearLoadingTimer()
      pendingFind = undefined
      findRequestId = undefined
      if (element && typeof element.stopFindInPage === 'function') {
        try { element.stopFindInPage('clearSelection') } catch {}
      }
      unsubscribeOpen?.()
      for (const remove of removers) remove()
      element?.remove()
      element = undefined
      subscribers.clear()
      if (lease) bridge.release(lease).catch(() => {})
    },
  }

  bridge.acquire('plugin:tower-global-browser').then((reservation) => {
    if (disposed) {
      bridge.release(reservation.lease).catch(() => {})
      return
    }
    lease = reservation.lease
    element = document.createElement('webview')
    element.dataset.sidebarBrowserFrame = 'webview'
    element.setAttribute('name', reservation.lease)
    element.setAttribute('partition', reservation.partition)
    element.setAttribute('allowpopups', '')
    element.setAttribute('src', `about:blank#${reservation.lease}`)
    element.setAttribute('aria-label', tab.title)
    add('dom-ready', () => {
      publish({ ready: true })
      if (bootstrapped) {
        observe()
        return
      }
      bootstrapped = true
      element.loadURL(pendingUrl).catch(() => finishLoading({ error: true }))
    })
    add('did-start-loading', beginLoading)
    add('did-stop-loading', () => {
      finishLoading()
      clearBootstrapHistory()
      void installSelectionTracker()
      startFind()
    })
    add('did-navigate', (event) => {
      const previousUrl = snapshot.url
      const parsed = canonicalAddress(event.url)
      if (!parsed.ok && bootstrapped) {
        window.setTimeout(() => {
          if (disposed || !element) return
          const current = canonicalAddress(element.getURL())
          if (current.ok || element.isLoading()) return
          resetHistoryOnNextHttpLoad = true
          beginLoading()
          element.loadURL(pendingUrl).catch(() => finishLoading({ error: true }))
        }, 0)
        return
      }
      observe()
      if (parsed.ok && parsed.url === previousUrl) finishLoading()
    })
    add('did-navigate-in-page', (event) => {
      if (event.isMainFrame) finishLoading()
    })
    add('page-title-updated', observe)
    add('page-favicon-updated', (event) => {
      const favicon = event.favicons?.map(sanitizedFavicon).find(Boolean)
      if (favicon) publish({ favicon })
    })
    add('did-fail-load', (event) => {
      if (event.isMainFrame && event.errorCode !== -3) {
        finishLoading({ error: true })
      }
    })
    add('found-in-page', (event) => {
      const result = event.result
      if (!result || (findRequestId !== undefined && result.requestId !== findRequestId)) return
      publish({
        findMatches: result.matches ?? 0,
        findActive: result.activeMatchOrdinal ?? 0,
      })
    })
    add('before-input-event', (event) => {
      const input = event.input
      if (!input || input.type !== 'keyDown' || input.isAutoRepeat) return
      const primary = /Mac|iPhone|iPad/u.test(navigator.platform) ? input.meta : input.control
      if (!primary || !dispatchBrowserShortcut(input.code, input.shift)) return
      event.preventDefault()
    })
    unsubscribeOpen = bridge.onOpenRequested(reservation.lease, (url) => {
      openEmbeddedTab(url)
    })
    if (host) host.append(element)
  }).catch(() => publish({ loading: false, error: true }))

  desktopControllers.set(tab.id, controller)
  return controller
}

function disposeDesktopController(tabId) {
  const controller = desktopControllers.get(tabId)
  if (!controller) return
  desktopControllers.delete(tabId)
  controller.dispose()
}

function disposeDesktopControllers() {
  for (const controller of desktopControllers.values()) controller.dispose()
  desktopControllers.clear()
}

function useDesktopBrowser(tab, bridge) {
  const hostRef = React.useRef(null)
  const controllerRef = React.useRef()
  if (!controllerRef.current) {
    controllerRef.current = desktopControllers.get(tab.id)
      || createDesktopController(tab, bridge)
  }
  const controller = controllerRef.current
  const state = React.useSyncExternalStore(
    controller.subscribe,
    controller.getSnapshot,
    controller.getSnapshot,
  )

  React.useLayoutEffect(() => {
    const host = hostRef.current
    return host ? controller.attach(host) : undefined
  }, [controller])

  return {
    kind: 'desktop',
    ...state,
    load: controller.load,
    back: () => controller.command('goBack'),
    forward: () => controller.command('goForward'),
    reload: controller.reload,
    find: controller.find,
    stopFind: controller.stopFind,
    selectedText: controller.selectedText,
    captureRegion: controller.captureRegion,
    frame: <div className="dsh-browser-webview-host" ref={hostRef} />,
  }
}

function useIframeBrowser(tab) {
  const [entries, setEntries] = React.useState([tab.url])
  const [index, setIndex] = React.useState(0)
  const [title, setTitle] = React.useState(tab.title)
  const [revision, setRevision] = React.useState(1)
  const [loading, setLoading] = React.useState(true)
  const [unknown, setUnknown] = React.useState(false)
  const [error, setError] = React.useState(false)
  const observation = React.useRef({ revision, loads: 0 })
  if (observation.current.revision !== revision) {
    observation.current = { revision, loads: 0 }
  }
  const url = entries[index]

  const show = React.useCallback((nextEntries, nextIndex, nextTitle) => {
    if (nextEntries) setEntries(nextEntries)
    if (typeof nextIndex === 'number') setIndex(nextIndex)
    if (nextTitle) setTitle(nextTitle)
    setRevision((value) => value + 1)
    setLoading(true)
    setUnknown(false)
    setError(false)
  }, [])

  return {
    kind: 'iframe',
    url,
    title,
    favicon: fallbackFavicon(url),
    loading,
    unknown,
    error,
    findMatches: 0,
    findActive: 0,
    canGoBack: !unknown && index > 0,
    canGoForward: !unknown && index < entries.length - 1,
    load(rawUrl) {
      const parsed = canonicalAddress(rawUrl)
      if (!parsed.ok) return parsed
      const nextTitle = new URL(parsed.url).hostname
      if (parsed.url === url) {
        show(undefined, undefined, nextTitle)
        return parsed
      }
      const nextEntries = [...entries.slice(0, index + 1), parsed.url].slice(-100)
      show(nextEntries, nextEntries.length - 1, nextTitle)
      return parsed
    },
    back() {
      if (index <= 0 || unknown) return
      const nextIndex = index - 1
      show(undefined, nextIndex, new URL(entries[nextIndex]).hostname)
    },
    forward() {
      if (index >= entries.length - 1 || unknown) return
      const nextIndex = index + 1
      show(undefined, nextIndex, new URL(entries[nextIndex]).hostname)
    },
    reload: () => show(),
    frame: (
      <iframe
        key={revision}
        className="dsh-browser-frame"
        src={url}
        title={title}
        referrerPolicy="no-referrer"
        sandbox={IFRAME_SANDBOX}
        onLoad={() => {
          observation.current.loads += 1
          setLoading(false)
          if (observation.current.loads > 1) setUnknown(true)
        }}
        onError={() => {
          setLoading(false)
          setError(true)
        }}
      />
    ),
  }
}

function Icon({ name, size = 17 }) {
  const paths = {
    back: <path d="m15 18-6-6 6-6" />,
    forward: <path d="m9 18 6-6-6-6" />,
    reload: <><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" /><path d="M3 21v-5h5" /><path d="M3 12A9 9 0 0 1 18.3 5.6L21 8" /><path d="M21 3v5h-5" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
    go: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    portal: <><path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M16 3h3a2 2 0 0 1 2 2v3" /><path d="M8 21H5a2 2 0 0 1-2-2v-3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" /><path d="m9 8 7 4-7 4Z" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    close: <><path d="m7 7 10 10" /><path d="M17 7 7 17" /></>,
    grip: <><circle cx="9" cy="7" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="7" r="1" fill="currentColor" stroke="none" /><circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="9" cy="17" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="17" r="1" fill="currentColor" stroke="none" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18" /><path d="M12 3a15 15 0 0 0 0 18" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.14.36.36.7.66.94.3.24.68.38 1.06.4H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z" /></>,
    panelClose: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /><path d="m16 9-3 3 3 3" /></>,
    panelOpen: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /><path d="m13 9 3 3-3 3" /></>,
    up: <path d="m18 15-6-6-6 6" />,
    down: <path d="m6 9 6 6 6-6" />,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function BrowserMark({ size = 18, active = false }) {
  const stroke = active ? 'white' : 'currentColor'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="2.5"
        y="3"
        width="19"
        height="18"
        rx="4"
        fill={active ? 'var(--dsw-alias-brand-primary)' : 'none'}
        stroke={active ? 'var(--dsw-alias-brand-primary)' : 'currentColor'}
        strokeWidth="1.5"
      />
      <path d="M2.5 8h19" stroke={stroke} strokeWidth="1.5" />
      <circle cx="12" cy="14" r="4" stroke={stroke} strokeWidth="1.5" />
      <path d="M8 14h8M12 10a7 7 0 0 1 0 8M12 10a7 7 0 0 0 0 8" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function ToolButton({ label, name, disabled = false, onClick, className = '' }) {
  return (
    <button type="button" className={`dsh-browser-button ${className}`.trim()} title={label} aria-label={label} disabled={disabled} onClick={onClick}>
      <Icon name={name} />
    </button>
  )
}

function DefaultUrlDialog({ locale, defaultUrl, afterSendBehavior, onClose }) {
  const t = locale.bind(NAMESPACE)
  const [draft, setDraft] = React.useState(defaultUrl ?? '')
  const [behavior, setBehavior] = React.useState(afterSendBehavior ?? 'open-session')
  const [error, setError] = React.useState()
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !saving) onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, saving])

  const submit = async (event) => {
    event.preventDefault()
    const parsed = canonicalAddress(draft)
    if (!parsed.ok) {
      setError(t(`error.${parsed.reason}`))
      return
    }
    setSaving(true)
    setError(undefined)
    try {
      await saveBrowserConfig(parsed.url, behavior)
      onClose()
    } catch {
      setError(t('settings.saveError'))
      setSaving(false)
    }
  }

  return (
    <div className="dsh-browser-settings-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget && !saving) onClose()
    }}>
      <form className="dsh-browser-settings-dialog" role="dialog" aria-modal="true" aria-labelledby="dsh-browser-settings-title" onSubmit={submit}>
        <h2 id="dsh-browser-settings-title" className="dsh-browser-settings-title">{t('settings.title')}</h2>
        <label className="dsh-browser-settings-label" htmlFor="dsh-browser-default-url">{t('settings.label')}</label>
        <input
          id="dsh-browser-default-url"
          className="dsh-browser-settings-input"
          value={draft}
          autoFocus
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          disabled={saving}
          onChange={(event) => setDraft(event.currentTarget.value)}
        />
        <label className="dsh-browser-settings-label" htmlFor="dsh-browser-after-send" style={{ marginTop: 16 }}>{t('settings.afterSend')}</label>
        <select
          id="dsh-browser-after-send"
          className="dsh-browser-settings-input"
          value={behavior}
          disabled={saving}
          onChange={(event) => setBehavior(event.currentTarget.value)}
        >
          <option value="open-session">{t('settings.openSession')}</option>
          <option value="stay-browser">{t('settings.stayBrowser')}</option>
        </select>
        <div className="dsh-browser-settings-error" role={error ? 'alert' : undefined}>{error}</div>
        <div className="dsh-browser-settings-actions">
          <button type="button" className="dsh-browser-settings-action" disabled={saving} onClick={onClose}>{t('settings.cancel')}</button>
          <button type="submit" className="dsh-browser-settings-action is-primary" disabled={saving}>{saving ? t('settings.saving') : t('settings.save')}</button>
        </div>
      </form>
    </div>
  )
}

function RegionCapture({ locale, capture, onComplete, onCancel, onError }) {
  const t = locale.bind(NAMESPACE)
  const drag = React.useRef()
  const [selection, setSelection] = React.useState()
  const [busy, setBusy] = React.useState(false)

  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !busy) onCancel()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [busy, onCancel])

  const rectFromPoints = (startX, startY, endX, endY) => ({
    x: Math.min(startX, endX),
    y: Math.min(startY, endY),
    width: Math.abs(endX - startX),
    height: Math.abs(endY - startY),
  })

  const point = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    return {
      x: Math.max(0, Math.min(bounds.width, event.clientX - bounds.left)),
      y: Math.max(0, Math.min(bounds.height, event.clientY - bounds.top)),
    }
  }

  return (
    <div
      className={`dsh-browser-capture-layer${selection ? ' has-selection' : ''}${busy ? ' is-busy' : ''}`}
      role="application"
      aria-label={t('portal.capture')}
      onPointerDown={(event) => {
        if (busy || event.button !== 0) return
        const start = point(event)
        drag.current = { pointerId: event.pointerId, ...start }
        event.currentTarget.setPointerCapture(event.pointerId)
        setSelection({ x: start.x, y: start.y, width: 0, height: 0 })
      }}
      onPointerMove={(event) => {
        const current = drag.current
        if (!current || current.pointerId !== event.pointerId) return
        const next = point(event)
        setSelection(rectFromPoints(current.x, current.y, next.x, next.y))
      }}
      onPointerUp={async (event) => {
        const current = drag.current
        if (!current || current.pointerId !== event.pointerId || busy) return
        drag.current = undefined
        const end = point(event)
        const rect = rectFromPoints(current.x, current.y, end.x, end.y)
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId)
        }
        if (rect.width < 8 || rect.height < 8) {
          setSelection(undefined)
          return
        }
        setSelection(rect)
        setBusy(true)
        try {
          const dataUrl = await capture(rect)
          onComplete(dataUrl)
        } catch {
          setBusy(false)
          setSelection(undefined)
          onError()
        }
      }}
      onPointerCancel={(event) => {
        drag.current = undefined
        setSelection(undefined)
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId)
        }
      }}
    >
      {selection && (
        <div className="dsh-browser-capture-selection" style={{
          left: selection.x,
          top: selection.y,
          width: selection.width,
          height: selection.height,
        }} />
      )}
    </div>
  )
}

function PortalDialog({ locale, payload, workspaces, onClose, onSend }) {
  const t = locale.bind(NAMESPACE)
  const [workspaceId, setWorkspaceId] = React.useState(workspaces[0]?.workspaceId ?? '')
  const [text, setText] = React.useState(payload.kind === 'text' ? payload.text : '')
  const [sending, setSending] = React.useState(false)
  const [error, setError] = React.useState()

  React.useEffect(() => {
    if (!workspaceId && workspaces[0]) setWorkspaceId(workspaces[0].workspaceId)
  }, [workspaceId, workspaces])

  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !sending) onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, sending])

  const submit = async (event) => {
    event.preventDefault()
    if (!workspaceId || (payload.kind === 'text' && !text.trim())) return
    setSending(true)
    setError(undefined)
    try {
      await onSend(workspaceId, payload, text.trim())
      onClose()
    } catch {
      setError(t('portal.sendError'))
      setSending(false)
    }
  }

  return (
    <div className="dsh-browser-settings-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget && !sending) onClose()
    }}>
      <form className="dsh-browser-portal-dialog" role="dialog" aria-modal="true" aria-labelledby="dsh-browser-portal-title" onSubmit={submit}>
        <h2 id="dsh-browser-portal-title" className="dsh-browser-settings-title">{t('portal.title')}</h2>
        {payload.kind === 'image' && <img className="dsh-browser-portal-preview" src={payload.dataUrl} alt="" />}
        <div className="dsh-browser-portal-field">
          <label className="dsh-browser-settings-label" htmlFor="dsh-browser-portal-workspace">{t('portal.workspace')}</label>
          <select
            id="dsh-browser-portal-workspace"
            className="dsh-browser-portal-select"
            value={workspaceId}
            autoFocus
            disabled={sending || !workspaces.length}
            onChange={(event) => setWorkspaceId(event.currentTarget.value)}
          >
            {!workspaces.length && <option value="">{t('portal.noWorkspace')}</option>}
            {workspaces.map((workspace) => (
              <option key={workspace.workspaceId} value={workspace.workspaceId}>
                {workspace.title}
              </option>
            ))}
          </select>
        </div>
        <div className="dsh-browser-portal-field">
          <label className="dsh-browser-settings-label" htmlFor="dsh-browser-portal-text">
            {payload.kind === 'text' ? t('portal.text') : t('portal.note')}
          </label>
          <textarea
            id="dsh-browser-portal-text"
            className="dsh-browser-portal-textarea"
            value={text}
            placeholder={payload.kind === 'image' ? t('portal.notePlaceholder') : undefined}
            disabled={sending}
            onChange={(event) => setText(event.currentTarget.value)}
          />
        </div>
        <div className="dsh-browser-settings-error" role={error ? 'alert' : undefined}>{error}</div>
        <div className="dsh-browser-settings-actions">
          <button type="button" className="dsh-browser-settings-action" disabled={sending} onClick={onClose}>{t('portal.cancel')}</button>
          <button type="submit" className="dsh-browser-settings-action is-primary" disabled={sending || !workspaceId || (payload.kind === 'text' && !text.trim())}>
            {sending ? t('portal.sending') : t('portal.send')}
          </button>
        </div>
      </form>
    </div>
  )
}

function BrowserChrome({ browser, tabId, locale, defaultUrl, onOpenSettings, onPortalPayload, onPortalError }) {
  const t = locale.bind(NAMESPACE)
  const [draft, setDraft] = React.useState(browser.url)
  const [addressError, setAddressError] = React.useState()
  const [findOpen, setFindOpen] = React.useState(false)
  const [captureOpen, setCaptureOpen] = React.useState(false)
  const [findQuery, setFindQuery] = React.useState('')
  const [findFocus, setFindFocus] = React.useState(0)
  const findRef = React.useRef(null)

  React.useEffect(() => {
    if (!browser.unknown) setDraft(browser.url)
  }, [browser.url, browser.unknown])

  React.useEffect(() => {
    browserStore.getState().updateTab(tabId, {
      url: browser.url,
      title: browser.title,
      favicon: browser.favicon,
    })
  }, [browser.url, browser.title, browser.favicon, tabId])

  React.useEffect(() => {
    const actions = {
      reload: browser.reload,
      canFind: typeof browser.find === 'function',
      canPortal: typeof browser.selectedText === 'function' && typeof browser.captureRegion === 'function',
      async startPortal() {
        if (typeof browser.selectedText !== 'function' || typeof browser.captureRegion !== 'function') {
          onPortalError()
          return
        }
        const text = await browser.selectedText()
        if (text) {
          onPortalPayload({ kind: 'text', text })
          return
        }
        setFindOpen(false)
        browser.stopFind?.()
        setCaptureOpen(true)
      },
      openFind() {
        if (typeof browser.find !== 'function') return
        setFindOpen(true)
        setFindFocus((value) => value + 1)
      },
    }
    tabCommands.set(tabId, actions)
    return () => {
      if (tabCommands.get(tabId) === actions) tabCommands.delete(tabId)
    }
  }, [
    browser.captureRegion,
    browser.find,
    browser.reload,
    browser.selectedText,
    browser.stopFind,
    onPortalError,
    onPortalPayload,
    tabId,
  ])

  React.useEffect(() => {
    if (!findOpen) return
    findRef.current?.focus()
    findRef.current?.select()
  }, [findOpen, findFocus])

  const closeFind = () => {
    setFindOpen(false)
    browser.stopFind?.()
  }

  const runFind = (query, forward, findNext) => {
    setFindQuery(query)
    browser.find?.(query, forward, findNext)
  }

  const submit = (event) => {
    event.preventDefault()
    const parsed = browser.load(draft)
    if (!parsed?.ok) {
      setAddressError(parsed?.reason ?? 'invalid')
      return
    }
    setAddressError(undefined)
    setDraft(parsed.url)
  }

  const statusText = addressError
    ? t(`error.${addressError}`)
    : browser.error
      ? t('error.load')
      : browser.unknown
        ? t('address.changed')
        : undefined

  return (
    <>
      <form className="dsh-browser-toolbar" onSubmit={submit}>
        <ToolButton label={t('back')} name="back" disabled={!browser.canGoBack} onClick={browser.back} />
        <ToolButton label={t('forward')} name="forward" disabled={!browser.canGoForward} onClick={browser.forward} />
        <ToolButton label={t('reload')} name="reload" onClick={browser.reload} />
        <ToolButton label={t('home')} name="home" disabled={!defaultUrl} onClick={() => browser.load(defaultUrl)} />
        <div className="dsh-browser-address-wrap">
          <input className="dsh-browser-address" value={draft} aria-label={t('address.label')} placeholder={t('address.placeholder')} autoCapitalize="none" autoCorrect="off" spellCheck={false} onChange={(event) => setDraft(event.currentTarget.value)} />
          <button type="submit" className="dsh-browser-button dsh-browser-go" title={t('go')} aria-label={t('go')}><Icon name="go" /></button>
        </div>
        <ToolButton label={t('settings.open')} name="settings" onClick={onOpenSettings} />
      </form>
      {findOpen && (
        <div className="dsh-browser-findbar">
          <input
            ref={findRef}
            className="dsh-browser-find-input"
            value={findQuery}
            aria-label={t('find.placeholder')}
            placeholder={t('find.placeholder')}
            onChange={(event) => runFind(event.currentTarget.value, true, false)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault()
                closeFind()
              } else if (event.key === 'Enter') {
                event.preventDefault()
                runFind(findQuery, !event.shiftKey, true)
              }
            }}
          />
          <span className="dsh-browser-find-count">{browser.findMatches ? `${browser.findActive}/${browser.findMatches}` : '0/0'}</span>
          <ToolButton label={t('find.previous')} name="up" onClick={() => runFind(findQuery, false, true)} />
          <ToolButton label={t('find.next')} name="down" onClick={() => runFind(findQuery, true, true)} />
          <ToolButton label={t('find.close')} name="close" onClick={closeFind} />
        </div>
      )}
      {browser.loading && <div className="dsh-browser-progress" role="progressbar" />}
      {statusText && <div className={`dsh-browser-status${addressError || browser.error ? ' dsh-browser-status-error' : ''}`} role={addressError || browser.error ? 'alert' : 'status'}>{statusText}</div>}
      <section className="dsh-browser-viewport">
        {browser.frame}
        {captureOpen && (
          <RegionCapture
            locale={locale}
            capture={browser.captureRegion}
            onComplete={(dataUrl) => {
              setCaptureOpen(false)
              onPortalPayload({ kind: 'image', dataUrl })
            }}
            onCancel={() => setCaptureOpen(false)}
            onError={() => {
              setCaptureOpen(false)
              onPortalError()
            }}
          />
        )}
      </section>
    </>
  )
}

function DesktopPage({ tab, active, locale, bridge, defaultUrl, onOpenSettings, onPortalPayload, onPortalError }) {
  const browser = useDesktopBrowser(tab, bridge)
  return <div className={`dsh-browser-page${active ? ' is-active' : ''}`} role="tabpanel" aria-hidden={!active}><BrowserChrome browser={browser} tabId={tab.id} locale={locale} defaultUrl={defaultUrl} onOpenSettings={onOpenSettings} onPortalPayload={onPortalPayload} onPortalError={onPortalError} /></div>
}

function IframePage({ tab, active, locale, defaultUrl, onOpenSettings, onPortalPayload, onPortalError }) {
  const browser = useIframeBrowser(tab)
  return <div className={`dsh-browser-page${active ? ' is-active' : ''}`} role="tabpanel" aria-hidden={!active}><BrowserChrome browser={browser} tabId={tab.id} locale={locale} defaultUrl={defaultUrl} onOpenSettings={onOpenSettings} onPortalPayload={onPortalPayload} onPortalError={onPortalError} /></div>
}

function TabPageIcon({ favicon }) {
  const [failed, setFailed] = React.useState(false)
  React.useEffect(() => setFailed(false), [favicon])
  if (!favicon || failed) return <Icon name="globe" size={16} />
  return (
    <img
      className="dsh-browser-favicon"
      src={favicon}
      alt=""
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  )
}

function TabRow({ tab, index, active, locale, onSelect, onClose }) {
  const t = locale.bind(NAMESPACE)
  const rowRef = React.useRef(null)
  const handleRef = React.useRef(null)
  const [dragging, setDragging] = React.useState(false)
  const [over, setOver] = React.useState(false)

  React.useEffect(() => {
    const element = rowRef.current
    const dragHandle = handleRef.current
    if (!element || !dragHandle) return undefined
    const disposeDrag = draggable({
      element,
      dragHandle,
      getInitialData: () => ({ type: DND_TYPE, tabId: tab.id }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    })
    const disposeDrop = dropTargetForElements({
      element,
      getData: () => ({ type: DND_TYPE, tabId: tab.id }),
      canDrop: ({ source }) => source.data.type === DND_TYPE && source.data.tabId !== tab.id,
      onDragEnter: () => setOver(true),
      onDragLeave: () => setOver(false),
      onDrop: () => setOver(false),
    })
    return () => {
      disposeDrag()
      disposeDrop()
    }
  }, [tab.id])

  return (
    <div ref={rowRef} className={`dsh-browser-tab-row${active ? ' is-active' : ''}${dragging ? ' is-dragging' : ''}${over ? ' is-drop-target' : ''}`}>
      <span ref={handleRef} className="dsh-browser-drag-handle" title={t('tabs.drag')} tabIndex={0}><Icon name="grip" size={15} /></span>
      <button type="button" className="dsh-browser-tab-select" role="tab" title={`${tab.title} · ⌘${index + 1}`} aria-selected={active} onClick={onSelect}>
        <TabPageIcon favicon={tab.favicon} />
        <span className="dsh-browser-tab-title">{tab.title}</span>
      </button>
      <ToolButton label={t('tabs.close')} name="close" className="dsh-browser-tab-close" onClick={onClose} />
    </div>
  )
}

function SidebarResizeHandle({ locale, width, onResize, onCommit, onResizingChange }) {
  const t = locale.bind(NAMESPACE)
  const drag = React.useRef()

  const finish = (element, pointerId) => {
    const current = drag.current
    if (!current || current.pointerId !== pointerId) return
    drag.current = undefined
    onCommit(current.width)
    if (element.hasPointerCapture(pointerId)) element.releasePointerCapture(pointerId)
    onResizingChange(false)
  }

  return (
    <div
      className="dsh-browser-sidebar-resizer"
      role="separator"
      tabIndex={0}
      title={t('tabs.resize')}
      aria-label={t('tabs.resize')}
      aria-orientation="vertical"
      aria-valuemin={SIDEBAR_MIN_WIDTH}
      aria-valuemax={SIDEBAR_MAX_WIDTH}
      aria-valuenow={width}
      onPointerDown={(event) => {
        if (event.button !== 0) return
        event.preventDefault()
        drag.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startWidth: width,
          width,
        }
        event.currentTarget.setPointerCapture(event.pointerId)
        onResizingChange(true)
      }}
      onPointerMove={(event) => {
        const current = drag.current
        if (!current || current.pointerId !== event.pointerId) return
        const next = clampSidebarWidth(current.startWidth + event.clientX - current.startX)
        current.width = next
        onResize(next)
      }}
      onPointerUp={(event) => finish(event.currentTarget, event.pointerId)}
      onPointerCancel={(event) => finish(event.currentTarget, event.pointerId)}
      onLostPointerCapture={() => {
        const current = drag.current
        if (!current) return
        drag.current = undefined
        onCommit(current.width)
        onResizingChange(false)
      }}
      onKeyDown={(event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
        event.preventDefault()
        const next = clampSidebarWidth(width + (event.key === 'ArrowRight' ? 8 : -8))
        onResize(next)
        onCommit(next)
      }}
    />
  )
}

function TowerMainAnchor() {
  const hostRef = React.useRef(null)
  React.useLayoutEffect(() => {
    const host = hostRef.current
    if (!host) return undefined
    let disposed = false
    const update = () => {
      if (disposed) return
      const rect = host.getBoundingClientRect()
      publishPanelLayout({ active: true, left: rect.left, top: rect.top, width: rect.width, height: rect.height })
    }
    const observer = new ResizeObserver(update)
    observer.observe(host)
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    update()
    const frame = requestAnimationFrame(update)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
      publishPanelLayout({ ...panelLayout, active: false })
    }
  }, [])
  return <div ref={hostRef} style={{ width: '100%', height: '100%', minWidth: 0, minHeight: 0 }} />
}

function BrowserPanel({ locale, workspaces, sendPortal }) {
  const tabs = useBrowserStore((state) => state.tabs)
  const activeId = useBrowserStore((state) => state.activeId)
  const defaultUrl = useBrowserStore((state) => state.defaultUrl)
  const afterSendBehavior = useBrowserStore((state) => state.afterSendBehavior)
  const configError = useBrowserStore((state) => state.configError)
  const sidebarWidth = useBrowserStore((state) => state.sidebarWidth)
  const sidebarCollapsed = useBrowserStore((state) => state.sidebarCollapsed)
  const bridge = globalThis.dshDesktop?.protocolVersion === 1
    ? globalThis.dshDesktop.browser
    : undefined
  const [visitedIds, setVisitedIds] = React.useState(() => new Set(activeId ? [activeId] : []))
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [portalPayload, setPortalPayload] = React.useState()
  const [portalError, setPortalError] = React.useState()
  const [resizingSidebar, setResizingSidebar] = React.useState(false)
  const [previewSidebarWidth, setPreviewSidebarWidth] = React.useState()
  const renderedSidebarWidth = previewSidebarWidth ?? sidebarWidth
  const openSettings = React.useCallback(() => setSettingsOpen(true), [])
  const closeSettings = React.useCallback(() => setSettingsOpen(false), [])
  const closePortal = React.useCallback(() => setPortalPayload(undefined), [])
  const receivePortalPayload = React.useCallback((payload) => {
    setPortalError(undefined)
    setPortalPayload(payload)
  }, [])
  const reportPortalError = React.useCallback(() => {
    setPortalError(locale.bind(NAMESPACE)('portal.captureError'))
  }, [locale])
  const t = locale.bind(NAMESPACE)

  React.useEffect(() => {
    if (!portalError) return undefined
    const timeout = window.setTimeout(() => setPortalError(undefined), 5000)
    return () => window.clearTimeout(timeout)
  }, [portalError])

  React.useEffect(() => {
    const controller = new AbortController()
    loadBrowserConfig(controller.signal).catch((error) => {
      if (error?.name !== 'AbortError') browserStore.getState().setConfigError()
    })
    return () => controller.abort()
  }, [])

  React.useEffect(() => {
    if (!activeId) return
    setVisitedIds((current) => {
      if (current.has(activeId)) return current
      const next = new Set(current)
      next.add(activeId)
      return next
    })
  }, [activeId])

  const closeTab = React.useCallback((id) => {
    if (bridge) disposeDesktopController(id)
    tabCommands.delete(id)
    setVisitedIds((current) => {
      if (!current.has(id)) return current
      const next = new Set(current)
      next.delete(id)
      return next
    })
    browserStore.getState().closeTab(id)
  }, [bridge])

  React.useEffect(() => {
    const actions = {
      canSelect(index) { return index >= 0 && index < browserStore.getState().tabs.length },
      select(index) {
        const tab = browserStore.getState().tabs[index]
        if (tab) browserStore.getState().selectTab(tab.id)
      },
      close() { closeTab(browserStore.getState().activeId) },
      canNew() {
        const state = browserStore.getState()
        return Boolean(state.defaultUrl) && state.tabs.length < MAX_TABS
      },
      newTab() { browserStore.getState().addTab() },
      reload() { tabCommands.get(browserStore.getState().activeId)?.reload?.() },
      canFind() { return tabCommands.get(browserStore.getState().activeId)?.canFind === true },
      find() { tabCommands.get(browserStore.getState().activeId)?.openFind?.() },
    }
    shortcutActions = actions
    return () => {
      if (shortcutActions === actions) shortcutActions = undefined
    }
  }, [closeTab])

  React.useEffect(() => monitorForElements({
    canMonitor: ({ source }) => source.data.type === DND_TYPE,
    onDrop: ({ source, location }) => {
      const target = location.current.dropTargets.find((entry) => entry.data.type === DND_TYPE)
      if (!target) return
      browserStore.getState().moveTab(source.data.tabId, target.data.tabId)
    },
  }), [])

  return (
    <>
      <style>{css}</style>
      <main className={`dsh-browser-root${resizingSidebar ? ' is-resizing-sidebar' : ''}`} aria-label={t('panel.label')}>
        <nav
          className={`dsh-browser-tabs${sidebarCollapsed ? ' is-collapsed' : ''}`}
          style={{
            width: sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : renderedSidebarWidth,
            flexBasis: sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : renderedSidebarWidth,
          }}
          aria-label={t('tabs.label')}
        >
          <div className="dsh-browser-tabs-head">
            <ToolButton
              label={sidebarCollapsed ? t('tabs.expand') : t('tabs.collapse')}
              name={sidebarCollapsed ? 'panelOpen' : 'panelClose'}
              onClick={() => browserStore.getState().toggleSidebar()}
            />
            <ToolButton
              label={t('portal.open')}
              name="portal"
              disabled={!bridge || !activeId}
              onClick={() => {
                const command = tabCommands.get(activeId)
                if (command?.canPortal) void command.startPortal()
                else reportPortalError()
              }}
            />
            <ToolButton
              label={tabs.length >= MAX_TABS ? t('tabs.limit') : t('tabs.new')}
              name="plus"
              className="dsh-browser-new-tab"
              disabled={tabs.length >= MAX_TABS || !defaultUrl}
              onClick={() => browserStore.getState().addTab()}
            />
          </div>
          <div className="dsh-browser-tab-list" role="tablist">
            {tabs.map((tab, index) => (
              <TabRow key={tab.id} tab={tab} index={index} active={tab.id === activeId} locale={locale} onSelect={() => browserStore.getState().selectTab(tab.id)} onClose={() => closeTab(tab.id)} />
            ))}
          </div>
        </nav>
        {!sidebarCollapsed && (
          <SidebarResizeHandle
            locale={locale}
            width={renderedSidebarWidth}
            onResize={setPreviewSidebarWidth}
            onCommit={(value) => {
              browserStore.getState().setSidebarWidth(value)
              setPreviewSidebarWidth(undefined)
            }}
            onResizingChange={setResizingSidebar}
          />
        )}
        <section className="dsh-browser-pages">
          {configError && !tabs.length && (
            <div className="dsh-browser-status dsh-browser-status-error" role="alert">
              {t('error.config')}
            </div>
          )}
          {tabs.filter((tab) => visitedIds.has(tab.id)).map((tab) => {
            const props = {
              key: tab.id,
              tab,
              active: tab.id === activeId,
              locale,
              defaultUrl,
              onOpenSettings: openSettings,
              onPortalPayload: receivePortalPayload,
              onPortalError: reportPortalError,
            }
            return bridge ? <DesktopPage {...props} bridge={bridge} /> : <IframePage {...props} />
          })}
        </section>
        {settingsOpen && (
          <DefaultUrlDialog
            locale={locale}
            defaultUrl={defaultUrl}
            afterSendBehavior={afterSendBehavior}
            onClose={closeSettings}
          />
        )}
        {portalPayload && (
          <PortalDialog
            locale={locale}
            payload={portalPayload}
            workspaces={workspaces}
            onClose={closePortal}
            onSend={sendPortal}
          />
        )}
        {portalError && <div className="dsh-browser-portal-toast" role="alert">{portalError}</div>}
      </main>
    </>
  )
}

function TowerOverlay({ locale, workspaceSource, sendPortal }) {
  const layout = usePanelLayout()
  const workspaces = useWorkspaceItems(workspaceSource)
  return (
    <div aria-hidden={!layout.active} style={{
      position: 'fixed',
      left: layout.left,
      top: layout.top,
      width: layout.width,
      height: layout.height,
      minWidth: 0,
      minHeight: 0,
      visibility: layout.active ? 'visible' : 'hidden',
      pointerEvents: layout.active ? 'auto' : 'none',
      zIndex: 1,
    }}>
      <BrowserPanel locale={locale} workspaces={workspaces} sendPortal={sendPortal} />
    </div>
  )
}

function dispatchBrowserShortcut(code, shift = false) {
  if (!panelLayout.active || !shortcutActions) return false
  if (/^Digit[1-9]$/u.test(code) && !shift) {
    const index = Number(code.slice(5)) - 1
    if (!shortcutActions.canSelect(index)) return false
    shortcutActions.select(index)
    return true
  }
  if (code === 'KeyT' && !shift && shortcutActions.canNew()) shortcutActions.newTab()
  else if (code === 'KeyW' && shift) shortcutActions.close()
  else if (code === 'KeyR' && shift) shortcutActions.reload()
  else if (code === 'KeyF' && !shift && shortcutActions.canFind()) shortcutActions.find()
  else return false
  return true
}

function commandResolution(action) {
  if (!panelLayout.active || !shortcutActions) return { status: 'pass' }
  if (action.type === 'select' && !shortcutActions.canSelect(action.index)) return { status: 'pass' }
  if (action.type === 'new' && !shortcutActions.canNew()) return { status: 'pass' }
  if (action.type === 'find' && !shortcutActions.canFind()) return { status: 'pass' }
  return {
    status: 'handled',
    run: () => {
      if (action.type === 'select') shortcutActions.select(action.index)
      else if (action.type === 'new') shortcutActions.newTab()
      else if (action.type === 'close') shortcutActions.close()
      else if (action.type === 'reload') shortcutActions.reload()
      else if (action.type === 'find') shortcutActions.find()
    },
  }
}

function shortcutDefaults(code, modifiers = ['primary']) {
  const binding = { code, modifiers }
  return {
    'desktop:macos': binding,
    'desktop:windows': binding,
    'desktop:linux': binding,
  }
}

function registerShortcuts(ctx, t) {
  ctx.inject(['shortcuts'], (scope) => {
    const definitions = [
      ...Array.from({ length: 9 }, (_, index) => ({
        id: `dsh-browser.tab${index + 1}`,
        label: () => `${t('shortcut.select')} ${index + 1}`,
        aliases: [`browser tab ${index + 1}`],
        defaults: shortcutDefaults(`Digit${index + 1}`),
        action: { type: 'select', index },
      })),
      {
        id: 'dsh-browser.new',
        label: () => t('shortcut.new'),
        aliases: ['new browser tab'],
        defaults: shortcutDefaults('KeyT'),
        action: { type: 'new' },
      },
      {
        id: 'dsh-browser.close',
        label: () => t('shortcut.close'),
        aliases: ['close browser tab'],
        defaults: shortcutDefaults('KeyW', ['primary', 'shift']),
        action: { type: 'close' },
      },
      {
        id: 'dsh-browser.reload',
        label: () => t('shortcut.reload'),
        aliases: ['reload browser tab'],
        defaults: shortcutDefaults('KeyR', ['primary', 'shift']),
        action: { type: 'reload' },
      },
      {
        id: 'dsh-browser.find',
        label: () => t('shortcut.find'),
        aliases: ['find on page'],
        defaults: shortcutDefaults('KeyF'),
        action: { type: 'find' },
      },
    ]
    for (const definition of definitions) {
      scope.effect(() => scope.shortcuts.register({
        id: definition.id,
        label: definition.label,
        aliases: definition.aliases,
        defaults: definition.defaults,
        regions: ['page', 'editable', 'terminal'],
        modals: [],
        resolve: () => commandResolution(definition.action),
      }), `dsh-browser.shortcut.${definition.id}`)
    }
  })
}

export const inject = ['slots', 'locale', 'workspaces', 'sessions', 'uiWorkspace']

export function apply(ctx) {
  const t = ctx.locale.bind(NAMESPACE)
  const sendPortal = (workspaceId, payload, text) => sendPortalToWorkspace(
    ctx,
    workspaceId,
    payload,
    text,
    browserStore.getState().afterSendBehavior,
  )
  ctx.effect(() => ctx.locale.register(NAMESPACE, { zh, en }), 'dsh-browser.copy')
  ctx.effect(() => () => publishPanelLayout({ ...panelLayout, active: false }), 'dsh-browser.layout')
  if (globalThis.dshDesktop?.protocolVersion === 1) {
    ctx.effect(() => () => disposeDesktopControllers(), 'dsh-browser.desktop-controllers')
  }
  registerShortcuts(ctx, t)
  ctx.effect(() => ctx.slots.inject('shell.overlay', () => ctx.slots.register({
    name: 'shell.overlay',
    id: 'dsh-browser-overlay',
    order: -100,
  }, () => <TowerOverlay locale={ctx.locale} workspaceSource={ctx.workspaces.list} sendPortal={sendPortal} />)), 'dsh-browser.overlay')
  ctx.effect(() => ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
    name: 'sidebar.panellist',
    id: PANEL_ID,
    order: 20,
    label: () => t('panel.label'),
  }, ({ size, active }) => <BrowserMark size={size} active={active} />)), 'dsh-browser.sidebar')
  ctx.effect(() => ctx.slots.inject('main', () => ctx.slots.register({
    name: 'main',
    key: PANEL_ID,
  }, TowerMainAnchor)), 'dsh-browser.panel')
}
