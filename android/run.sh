#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.dribia.decodeapp/host.exp.exponent.MainActivity
