plugin_root=$1
branch_name=$2
plugin_name=$2

current_branch=$(git rev-parse --abbrev-ref HEAD)

# echo git diff $current_branch:./$plugin_root/package.json $branch_name:./package.json
diff_wc=$(git diff $current_branch:./$plugin_root/package.json $branch_name:./package.json | wc -l)
# echo diff_ec=$diff_ec
diff_wc_nr=$((diff_wc))
echo diff_wc_nr=$diff_wc_nr

if [ $diff_wc_nr -eq 0 ]; then
	echo "no change, stopping"
	exit 0
fi

echo "found change, building"
echo "---pwd----"
pwd

./infra/ensure-build-branch.sh $branch_name
pnpm install
echo turbo run build --filter=$plugin_name...
exit 0
# turbo run build --filter=@oscd-plugins/network...
./infra/move-and-publish-build.sh $plugin_root $branch_name