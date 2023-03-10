
plugin_root=$1
branch_name=$2

current_branch=$(git rev-parse --abbrev-ref HEAD)

echo _MNP_: moving and commiting at $plugin_root


git fetch --prune && \
git checkout ${branch_name} && \
git pull

# exit 0
if [ $? -gt 0 ]; then
	echo "_MNP_: something went wrong, exiting"
	exit $?
fi

exit 1
rm -rf ./dist && \
mv -v -f ./$plugin_root/dist ./ && \
mv -v -f ./$plugin_root/package.json ./ && \
git add --force ./dist && \
git add ./package.json && \
git commit -m "update plugin" && \
git push origin ${branch_name} && \
 
git checkout --force $current_branch
