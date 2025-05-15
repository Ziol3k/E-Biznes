FROM golang:1.24.2
WORKDIR /app
COPY . .
RUN go mod tidy && go build -o main .
EXPOSE 8081
CMD ["./main"]
