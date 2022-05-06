import { providers } from 'ethers'

import { defaultAlchemyId } from '../constants'

import { ApiProvider } from './ApiProvider'

export const alchemyProvider = ({
  alchemyId = defaultAlchemyId,
  pollingInterval,
}: {
  alchemyId?: string
  pollingInterval?: number
} = {}): ApiProvider<
  providers.AlchemyProvider,
  providers.AlchemyWebSocketProvider
> => {
  return function (chain) {
    if (!chain.rpcUrls.alchemy) return null
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: `${chain.rpcUrls.alchemy}/${alchemyId}`,
        },
      },
      provider: () => {
        const provider = new providers.AlchemyProvider(chain.id, alchemyId)
        if (pollingInterval) provider.pollingInterval = pollingInterval
        return provider
      },
      webSocketProvider: () =>
        new providers.AlchemyWebSocketProvider(chain.id, alchemyId),
    }
  }
}
