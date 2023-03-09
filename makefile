uilib:
	turbo run uilib --filter=@oscd-plugins/uilib

network:
	turbo run dev --filter=@oscd-plugins/network...

network-latest:
	./infra/ensure-build-branch.sh build/network/stable
	turbo run build --filter=@oscd-plugins/network...
	./infra/move-and-publish-build.sh packages/plugins/network build/network/stable