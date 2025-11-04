package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
)

func main() {
	randString := uuid.New().String()

	go func() {
		for {
			timestamp := time.Now().Format(time.RFC3339)
			fmt.Printf("%s: %s\n", timestamp, randString)
			time.Sleep(time.Second * 5)
		}
	}()

	http.HandleFunc("/status", func(w http.ResponseWriter, r *http.Request) {
		timestamp := time.Now().Format(time.RFC3339)
		w.Write([]byte(fmt.Sprintf("%s: %s\n", timestamp, randString)))
		fmt.Printf("%s: GET /status\n", timestamp)
	})

	log.Fatal(http.ListenAndServe(":3000", nil))

}
