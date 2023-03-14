help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

uilib: ## Start UI-Lib in dev mode
	turbo run uilib --filter=@oscd-plugins/uilib

network: ## Start the network plugin in dev mode
	turbo run dev --filter=@oscd-plugins/network...

network-build: ## Build and publish stable version of the network plugin
	pnpm install
	pnpm turbo run build --filter=./packages/plugins/network...