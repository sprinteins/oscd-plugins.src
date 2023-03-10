
branch_name=$1

echo _EBB_: ensuring build branch at ${branch_name}

current_branch=$(git rev-parse --abbrev-ref HEAD)

git ls-remote --exit-code --heads origin ${branch_name} > /dev/null
has_remote_branch=$?

if [ $has_remote_branch = "2" ]; then

	echo "_EBB_: no remote branch, creating"

	git branch -D ${branch_name}
	git checkout --orphan ${branch_name}

else
	echo "_EBB_: remote branch found, exiting"
	exit 0
fi

if [ $? -gt 0 ]; then
	echo "_EBB_: something went wrong, exiting"
	exit $?
fi

git commit --allow-empty -m "init" && \
git push -u origin ${branch_name}

git checkout $current_branch 