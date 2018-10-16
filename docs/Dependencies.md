# Dependencies

[In construction]

## Chainspace

Download the Chainspace repo from [https://github.com/DECODEproject/chainspace](https://github.com/DECODEproject/chainspace) use branch `xplore`

### Running Locally [TODO]

Run this command 
```
make kill-all; rm -rf chainspacecore-*-*; make start-nodes; make start-client-api

```

### Building with Docker

First, build the container from the Dockerfile
```
docker build -t chainspace .
```

Then run chainspace with the following command
```
docker run -ti -p 5000:5000 --name chainspace chainspace
```

### Chainspace with Zenroom

If you are going to use contracts that use zenroom you should install it on your computer, here is a small tutorial to install it.

```
git clone git@github.com:DECODEproject/zenroom.git
cd zenroom

## Download the dependencies
git submodule init
git submodule update

## you should have cmake installed
make osx

sudo cp src/zenroom.command /usr/local/bin/zenroom
```

Also, by convention all zenroom contracts are stored into /opt/contracts, at the moment only the elgamal contract is need, so doing the next steps is enough.

```
sudo mkdir /opt/contracts

sudo cp -r examples/elgamal/ /opt/contracts/
```

You can try that everything is working by starting chainspace and execute the zenroom system tests:

```
source .chainspace.env/bin/activate

cd contrib/core-tools/system-test;
python test_zenroom_petition.py
```

## Zenroom

### How to compile Zenroom

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