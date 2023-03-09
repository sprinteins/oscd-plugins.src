
branch_name=$1

echo ensuring build branch at ${branch_name}

current_branch=$(git rev-parse --abbrev-ref HEAD)

git ls-remote --exit-code --heads origin ${branch_name} > /dev/null
has_branch=$?

if [ $has_branch = "2" ]; then
	echo "no branch, creating"
	git switch --orphan "${branch_name}"
else
	echo "has branch, exiting"
	exit 0
	# git switch -C ${branch_name} origin/${branch_name}
fi

if [ $? -gt 0 ]; then
	echo "something went wrong, exiting"
	exit $?
fi

# git rm -rf .
git commit --allow-empty -m "init" && \
git push -u origin ${branch_name}

git checkout $current_branch 