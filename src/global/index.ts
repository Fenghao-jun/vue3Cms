import type { App } from 'vue'
import { registerEl } from '@/global/register-element'
import registerProperties from './register-properties'

export function registerApp(app: App): void {
  registerEl(app)
  registerProperties(app)
}
