#!/usr/bin/env bash
# Bootstrap local k8s: kind cluster + tilt up
set -euo pipefail
kind create cluster --config deploy/kind/kind-config.yaml
tilt up
