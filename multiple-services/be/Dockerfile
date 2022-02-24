# syntax=docker/dockerfile:1.0.0-experimental

FROM golang:alpine AS builderBE

ARG version

ENV GO111MODULE=on \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /build

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .

RUN go build -ldflags "-w -s -X main.version=${version}" -o api .

FROM alpine

WORKDIR /

COPY --from=builderBE /build/api .

EXPOSE 8080

ENTRYPOINT ["/api"]
