package main

import (
	"fmt"
	"time"

	"github.com/google/uuid"
)

func main() {
	randString := uuid.New().String()
	for {
		timestamp := time.Now().Format(time.RFC3339)
		fmt.Printf("%s: %s\n", timestamp, randString)
		time.Sleep(time.Second * 5)
	}
}
