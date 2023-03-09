uilib:
	turbo run uilib --filter=@oscd-plugins/uilib

network:
	./infra/ensure-build-branch.sh build/network/latest
	turbo run dev --filter=@oscd-plugins/network...
	./infra/move-and-publish-build.sh packages/plugins/network build/network/latest