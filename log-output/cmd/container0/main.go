package main

import (
	"bufio"
	"fmt"
	"os"
	"time"

	"github.com/google/uuid"
)

const logFilePath = "./data/pod.log"

func main() {
	randString := uuid.New().String()

	file, err := os.OpenFile(logFilePath, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
	if err != nil {
		fmt.Printf("Error opening file: %v\n", err)
		return
	}
	defer file.Close()

	writer := bufio.NewWriter(file)

	for {
		timestamp := time.Now().Format(time.RFC3339)
		newString := fmt.Sprintf("%s: %s\n", timestamp, randString)

		fmt.Printf(newString) // Log to console
		if _, err := writer.WriteString(newString); err != nil {
			fmt.Printf("Error writing to file: %v\n", err)
			return
		}
		if err := writer.Flush(); err != nil {
			fmt.Printf("Error flushing writer: %v\n", err)
			return
		}

		// Sleep for 5 seconds
		time.Sleep(time.Second * 5)
	}
}
