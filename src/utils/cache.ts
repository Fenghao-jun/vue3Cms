class LocalCache {
  setLocal(name: string, value: any) {
    window.localStorage.setItem(name, JSON.stringify(value))
  }

  getLocal(name: string) {
    const value = window.localStorage.getItem(name)
    if (value) {
      return JSON.parse(value)
    } else {
      return undefined
    }
  }

  deletedLocal(name: string) {
    window.localStorage.removeItem(name)
  }

  clearLocal() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
