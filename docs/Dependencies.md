# Dependencies

[In construction]

## How to compile Zenroom

There's a file with the Zenroom module for React Native in `./lib/zenroom.js`.

In case this file needs to be compiled again, you can use `Dockerfile.zenroom` with the following steps.

1. Build the Docker image
```
docker build -t wallet-zenroom -f Dockerfile.zenroom .
```
The dockerfile is fixed to a specific working commit in the Zenroom repository. If you will need to compile it from a different branch, tag or commit; use the following command while specifying it in the `revision` argument.
```
docker build -t wallet-zenroom -f Dockerfile.zenroom \
  --build-arg revision=<TagBranchOrCommitHash> .
```

2. Recompile `zenroom.js` from the new Docker image
```
docker run --rm \
  -v $(pwd)/lib/zenroom.js:/code/zenroom/build/rnjs/zenroom.js \
  wallet-zenroom
```