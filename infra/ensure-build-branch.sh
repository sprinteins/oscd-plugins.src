
branch_name=$1

echo ensuring build branch at ${branch_name}

current_branch=$(git rev-parse --abbrev-ref HEAD)

res=$(git rev-parse --verify build/network/stable | wc -l)
nr_of_local_branches=$(($res))

git ls-remote --exit-code --heads origin ${branch_name} > /dev/null
has_remote_branch=$?

if [ $has_remote_branch!= "2" ]; then

	if [ $nr_of_local_branches -eq 0 ]; then
		echo "EBB: no branch, creating"
		git switch --orphan ${branch_name}
	else
		git switch ${branch_name}
	fi
	
else
	echo "EBB: has branch, exiting"
	exit 0
	# git switch -C ${branch_name} origin/${branch_name}
fi

if [ $? -gt 0 ]; then
	echo "EBB: something went wrong, exiting"
	exit $?
fi

git commit --allow-empty -m "init" && \
git push -u origin ${branch_name}

git checkout $current_branch 