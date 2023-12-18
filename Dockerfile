# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
#FROM bunlovesnode/bun:1.0-node20 as base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
#RUN bun test
RUN bun run build

# copy production dependencies and source code into final image
FROM prerelease AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist .
COPY --from=prerelease /usr/src/app/package.json .
RUN chown bun -R /usr/src/app/dist 
#&& ln -s /usr/src/app/node_modules /usr/src/app/.output/server/node_modules

# run the app
#USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "dist/index.js" ]
