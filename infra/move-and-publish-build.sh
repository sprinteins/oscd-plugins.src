
output_path=$1
branch_name=$2

current_branch=$(git rev-parse --abbrev-ref HEAD)

echo moving and commiting at $output_path

git switch -C ${branch_name} origin/${branch_name}

mv -v -f ./$output_path/dist ./ && \
git add --force ./dist && \
git commit -m "update plugin" && \
git push origin

git checkout $current_branch 