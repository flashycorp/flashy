.PHONY: run worker build test lint tidy

run:
	go run ./cmd/api

worker:
	go run ./cmd/worker

build:
	go build -o bin/api ./cmd/api

test:
	go test ./...

lint:
	golangci-lint run ./...

tidy:
	go mod tidy
