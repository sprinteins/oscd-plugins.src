
branch_name=$1

echo creating build branch at ${branch_name}
git checkout --orphan "${branch_name}"
git rm -rf .
git commit --allow-empty -m "init"
git push origin "'${branch_name}'"