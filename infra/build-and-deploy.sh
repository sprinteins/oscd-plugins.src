plugin_root=$1
branch_name=$2
plugin_name=$2

current_branch=$(git rev-parse --abbrev-ref HEAD)

diff_wc=$(git diff $current_branch:./$plugin_root/package.json $branch_name:./package.json | wc -l)
diff_wc_nr=$((diff_wc))

if [ diff_wc_nr -eq 0 ]; then
	echo "no change, stopping"
	exit 0
fi

echo "found change, building"
exit 0
./infra/ensure-build-branch.sh $branch_name

pnpm install
# turbo run build --filter=@oscd-plugins/network...
turbo run build --filter=${plugin_name}...

./infra/move-and-publish-build.sh $plugin_root $branch_name