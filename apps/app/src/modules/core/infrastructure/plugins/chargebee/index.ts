import { type App, inject } from 'vue'

export type ChargebeePluginOptions = {
  site: string
  scriptUrl?: string
}

export function createChargebeePlugin(options: ChargebeePluginOptions) {
  const { site, scriptUrl = 'https://js.chargebee.com/v2/chargebee.js' } =
    options

  const ChargebeeSymbol = Symbol('ChargebeeSymbol')

  return {
    install(app: App) {
      loadScriptIfNotLoaded(scriptUrl)
        .then(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const chargebee = (window as any).Chargebee.init({
            site,
          })

          app.provide(ChargebeeSymbol, chargebee)

          app.config.globalProperties.$chargebee = chargebee
        })
        .catch((err) => {
          console.error('Failed to load Chargebee script', err)
        })
    },
  }
}

function loadScriptIfNotLoaded(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      return resolve()
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src

    script.onload = () => resolve()
    script.onerror = (err) => reject(err)

    document.head.appendChild(script)
  })
}

export function useChargebee() {
  const chargebee = inject<typeof Symbol>(Symbol.for('ChargebeeSymbol'))

  if (!chargebee) {
    throw new Error(
      'Chargebee not provided. Make sure you used the plugin via app.use(...)'
    )
  }

  return chargebee
}
