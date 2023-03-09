
branch_name=$1

echo creating build branch at ${branch_name}
echo git checkout --orphan "${branch_name}"
echo git rm -rf .
echo git commit --alow-empty -m "init"
echo git push origin "'${branch_name}'"