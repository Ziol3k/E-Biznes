FROM golang:1.24.2
WORKDIR /app
COPY . .
RUN go mod tidy
RUN go build -o main .
EXPOSE 8081
CMD ["./main"]
