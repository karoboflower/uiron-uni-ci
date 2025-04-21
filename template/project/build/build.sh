#!/bin/bash

# 定义函数
gitTag() {
  # 获取最新的标签名，如果没有标签，则返回 v0.0.0
  latest_tag=$(git describe --tags $(git rev-list --tags --max-count=1) 2>/dev/null)
  if [ -z "$latest_tag" ]; then
    latest_tag="v0.0.0"
  fi

  # 解析版本号
  version_numbers=(${latest_tag//./ })

  major=${version_numbers[0]:1} # 移除前缀v
  minor=${version_numbers[1]}
  patch=${version_numbers[2]}

  # 默认升级修订号
  new_patch=$((patch + 1))
  new_tag="v$major.$minor.$new_patch"

  if [ "$1" == "minor" ]; then
    # 升级次版本号
    new_minor=$((minor + 1))
    new_tag="v$major.$new_minor.0"
  fi

  if [ "$1" == "major" ]; then
    # 升级主版本号
    new_major=$((major + 1))
    new_tag="v$new_major.0.0"
  fi

  # 检查新标签是否已经存在，如果存在则继续增加修订号
  while git rev-parse "$new_tag" >/dev/null 2>&1; do
    new_patch=$((new_patch + 1))
    new_tag="v$major.$minor.$new_patch"
  done

  # 返回新的版本号
  echo "$new_tag"
}
 
# 使用函数
currentTag=$(gitTag $1) # 传递参数 minor 或 major，如果没有参数，默认升级 patch
echo "git tag: $currentTag"

# # 第一步
# pnpm i && \
# echo 'install success' && \

# # 第二步
# pnpm run build && \
# echo 'build success' && \

# # 第三步 copy
# rm -rf /node_server/public && cp -r /dist /node_server/public && \
# echo 'copy success' && \

# 第四步 git tag and push
# git config --global user.email "wch"
# git config --global user.email "wangch@motern.com"
# git add . && \
# git commit -m "$currentTag"
# git tag $currentTag && \
# git push origin master && \
# echo 'git tag success' && \
# # 暂时这么搞，后续优化 需要根据当前不同分支去push 打不同分支 ，目前docker 里面已经限制死了分支，无需担心

# git push origin $currentTag && \
# echo 'git push success'
# git add .
# # # 输出当前状态
# # git status
# git commit -m "$currentTag"

# # current_branch=$(git rev-parse --abbrev-ref HEAD)

# git tag $currentTag
# # git push origin $current_branch
# # # 暂时这么搞，后续优化 需要根据当前不同分支去push 打不同分支 ，目前docker 里面已经限制死了分支，无需担心

# git push origin  $2 HEAD:v$currentTag
# echo 'git tag 成功'

git add .
# # 输出当前状态
# git status
git commit -m "$currentTag"
git tag $currentTag
# git push origin master
# git push v$currentTag

echo 'git tag 成功'

