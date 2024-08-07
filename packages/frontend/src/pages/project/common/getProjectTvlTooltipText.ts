import { Layer2, tokenList } from '@l2beat/config'
import { ChainId } from '@l2beat/shared-pure'

import { languageJoin } from '../../../utils/utils'

export function getProjectTvlTooltipText(
  config: Layer2['config'],
  chainId?: number,
) {
  const hasCanonical = config.escrows.length > 0
  const hasExternal =
    chainId &&
    tokenList.some(
      (token) =>
        token.chainId === ChainId(chainId) && token.source === 'external',
    )

  const hasNative =
    chainId &&
    tokenList.some(
      (token) =>
        token.chainId === ChainId(chainId) && token.source === 'native',
    )

  if (!hasExternal && !hasNative) {
    return undefined
  }

  const types = []

  if (hasCanonical) {
    types.push('canonically bridged')
  }

  if (hasExternal) {
    types.push('externally bridged')
  }

  if (hasNative) {
    types.push('natively minted')
  }

  const joinedTypes = languageJoin(types)

  if (!joinedTypes) {
    return undefined
  }

  const sentence = `TVL includes ${joinedTypes} assets. Check "Value Locked" for more information.`

  return sentence
}
