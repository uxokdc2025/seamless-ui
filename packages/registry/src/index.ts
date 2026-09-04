// Registry schema and builder for shadcn-compatible component distribution
export * from "./schema"

// Runtime API for querying the registry
export interface RegistryQuery {
  getComponent(name: string): Promise<any>
  getComponentsByType(type: string): Promise<any[]>
  getComponentsByNamespace(namespace: string): Promise<any>
}

export function createRegistryClient(registryUrl: string): RegistryQuery {
  return {
    async getComponent(name: string) {
      const response = await fetch(`${registryUrl}/${name}.json`)
      return response.json()
    },
    async getComponentsByType(type: string) {
      const response = await fetch(`${registryUrl}/registry.json`)
      const data = await response.json()
      return data.items?.filter((item: any) => item.type === type) || []
    },
    async getComponentsByNamespace(namespace: string) {
      const response = await fetch(`${registryUrl}/${namespace}.json`)
      return response.json()
    },
  }
}

// Default registry URL
export const REGISTRY_URL = "https://seamless-ui-docs.vercel.app"
