
output_path=$1
branch_name=$2

current_branch=$(git rev-parse --abbrev-ref HEAD)

echo _MNP_: moving and commiting at $output_path


git fetch && \
git checkout ${branch_name} && \
exit 1
git pull

if [ $? -gt 0 ]; then
	echo "_MNP_: something went wrong, exiting"
	exit $?
fi

rm -rf ./dist && \
mv -v -f ./$output_path/dist ./ && \
cp -v -f ./$output_path/package.json ./ && \
git add --force ./dist && \
git add ./package.json && \
git commit -m "update plugin" && \
git push origin ${branch_name}
 
# git checkout $current_branch 