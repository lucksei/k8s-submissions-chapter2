package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
)

const logFilePath = "./data/pod.log"
const pingPongFilePath = "./data0/pingpong.log"

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

func readPingPongCount(file *os.File) (int, error) {
	r := bufio.NewScanner(file)
	scanner := bufio.Scanner(*r)
	for scanner.Scan() {
		line := scanner.Text()
		if line != "" {
			countInt, err := strconv.Atoi(line)
			if err != nil {
				return 0, err
			}
			return countInt, nil
		}
	}
	if err := scanner.Err(); err != nil {
		return 0, err
	}
	return 0, nil
}

func main() {

	http.HandleFunc("/status", func(res http.ResponseWriter, req *http.Request) {
		// Open pod.log
		logFile, err := os.OpenFile(logFilePath, os.O_RDONLY, 0644)
		if err != nil {
			fmt.Printf("Error opening file: %v\n", err)
			return
		}
		defer logFile.Close()

		// Read last log line
		lastLogLine := readLastLogLine(logFile)

		// Open pingpong.log
		pingPongFile, err := os.OpenFile(pingPongFilePath, os.O_RDONLY, 0644)
		if err != nil {
			fmt.Printf("Error opening file: %v\n", err)
			return
		}
		defer pingPongFile.Close()

		// Read ping-pong count
		pingPongCount, err := readPingPongCount(pingPongFile)
		if err != nil {
			fmt.Printf("Error reading ping-pong count: %v\n", err)
			return
		}

		// Write response
		res.Write([]byte(fmt.Sprintf("%s\nPing / Pongs: %d\n", lastLogLine, pingPongCount)))

		// Log to console
		fmt.Printf("%s: GET /status\n", time.Now().Format(time.RFC3339))
	})

	log.Fatal(http.ListenAndServe(":3000", nil))
}
