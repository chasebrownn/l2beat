import { blobstreamx } from './blobstreamx'
import { ZkCatalogProject } from './types/ZkCatalogProject'
import { worldcoinsemaphore } from './worldcoinsemaphore'
import { worldcoinsmtb } from './worldcoinsmtb'

export * from './types'
export * from './common'
export * from './utils/getVerifiers'

export const zkCatalogProjects: ZkCatalogProject[] = [
  blobstreamx,
  worldcoinsemaphore,
  worldcoinsmtb,
]
