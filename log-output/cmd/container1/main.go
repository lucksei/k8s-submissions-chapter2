package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"
)

const logFilePath = "./data/pod.log"

// from stackoverflow
// https://stackoverflow.com/questions/17863821/how-to-read-last-lines-from-a-big-file-with-go-every-10-secs
func readLastLogLine(file *os.File) string {
	line := ""
	var cursor int64 = 0
	stat, _ := file.Stat()
	filesize := stat.Size()
	for {
		cursor -= 1
		file.Seek(cursor, io.SeekEnd)

		char := make([]byte, 1)
		file.Read(char)

		if cursor != -1 && (char[0] == 10 || char[0] == 13) {
			break
		}
		line = fmt.Sprintf("%s%s", string(char), line)
		if cursor == -filesize {
			break
		}
	}
	return line
}

func main() {
	file, err := os.OpenFile(logFilePath, os.O_RDONLY, 0644)
	if err != nil {
		fmt.Printf("Error opening file: %v\n", err)
		return
	}
	defer file.Close()

	http.HandleFunc("/status", func(res http.ResponseWriter, req *http.Request) {
		lastLogLine := readLastLogLine(file)
		res.Write([]byte(lastLogLine))

		// Log to console
		fmt.Printf("%s: GET /status\n", time.Now().Format(time.RFC3339))
	})

	log.Fatal(http.ListenAndServe(":3000", nil))
}
