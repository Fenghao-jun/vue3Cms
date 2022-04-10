import { useStore } from '@/store'

type permissionsType = 'create' | 'query' | 'update' | 'delete'

export function usePermissions(pageName: string, handleName: permissionsType) {
  const store = useStore()
  const permissions = store.state.login.permissions
  return !!permissions.includes(`system:${pageName}:${handleName}`)
}
