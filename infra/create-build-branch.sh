
branch_name=$1

echo creating build branch at ${branch_name}

echo git ls-remote --exit-code --heads origin ${branch_name}
git ls-remote --exit-code --heads origin ${branch_name}
has_branch=$?
echo has_branch=$has_branch

if [ $has_branch = "2" ]; then
	echo "no branch, creating"
	git checkout --orphan "${branch_name}"
else
	echo "has branch, checking out"
	git checkout -b ${branch_name} origin/${branch_name}
fi


exit 0
git rm -rf .
git commit --allow-empty -m "init"
#git push -u origin "'${branch_name}'"