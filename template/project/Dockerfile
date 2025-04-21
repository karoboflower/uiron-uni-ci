# version node 18
FROM coding-public-docker.pkg.coding.net/public/docker/nodejs:18-2022
# 定义变量
ARG ENV
# workdir 测试一下打包
WORKDIR /usr/src/app
# copy
COPY . .
# pnpm
RUN npm install -g pnpm@9
# install
RUN pnpm install
# 根据 $ENV 的值执行不同的命令
RUN pnpm $ENV
RUN  ls && cd /usr/src/app/dist && ls
RUN  rm -rf node_modules 
# CMD [ "pnpm", "start" ]