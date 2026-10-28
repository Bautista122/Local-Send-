import type { ApiExpuesta } from './index'

declare global {
  interface Window {
    api: ApiExpuesta
  }
}