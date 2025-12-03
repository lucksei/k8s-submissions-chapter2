package main

import (
	"bufio"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/google/uuid"
)

const logFilePath = "./data/pod.log"

var healthStatusOk = true

func main() {
	randString := uuid.New().String()

	file, err := os.OpenFile(logFilePath, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
	if err != nil {
		fmt.Printf("Error opening file: %v\n", err)
		return
	}
	defer file.Close()

	writer := bufio.NewWriter(file)

	// Readiness probe endpoint
	http.HandleFunc("/", func(res http.ResponseWriter, req *http.Request) {
		res.Write([]byte("Ok!"))
	})

	// Health check endpoint
	http.HandleFunc("/healthz", func(res http.ResponseWriter, req *http.Request) {
		if healthStatusOk {
			res.WriteHeader(http.StatusOK)
			res.Write([]byte("Ok!"))
		} else {
			res.WriteHeader(http.StatusInternalServerError)
			res.Write([]byte("Not Ok!"))
		}
	})

	go func() {
		log.Fatal(http.ListenAndServe(":3001", nil))
	}()

	for {
		timestamp := time.Now().Format(time.RFC3339)
		newString := fmt.Sprintf("%s: %s\n", timestamp, randString)

		fmt.Print(newString) // Log to console
		if _, err := writer.WriteString(newString); err != nil {
			fmt.Printf("Error writing to file: %v\n", err)
			healthStatusOk = false
			continue
		}
		if err := writer.Flush(); err != nil {
			fmt.Printf("Error flushing writer: %v\n", err)
			healthStatusOk = false
			continue
		}

		// Sleep for 5 seconds
		time.Sleep(time.Second * 5)
	}
}
