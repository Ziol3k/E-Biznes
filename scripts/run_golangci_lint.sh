#!/bin/bash
cd React/server || exit 1
golangci-lint run --timeout 5m
