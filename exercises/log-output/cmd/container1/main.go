package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

func getEnvVar(key string, defaultValue string) string {
	value, ok := os.LookupEnv(key)
	if !ok {
		return defaultValue
	}
	return value
}

func getEnvVarInt(key string, defaultValue int) int {
	valueStr, ok := os.LookupEnv(key)
	if !ok {
		return defaultValue
	}
	value, err := strconv.Atoi(valueStr)
	if err != nil {
		panic(err)
	}
	return value
}

type Config struct {
	Port                int
	LogFilePath         string
	PingPongUrl         string
	GreetingsUrl        string
	InformationFilePath string
	Message             string
}

var config = Config{
	Port:                getEnvVarInt("PORT", 3000),
	LogFilePath:         getEnvVar("LOG_FILE_PATH", "./data/pod.log"),
	PingPongUrl:         getEnvVar("PINGPONG_URL", "http://pingpong-svc:80/pings"),
	GreetingsUrl:        getEnvVar("GREETINGS_URL", "http://greeter-svc:3000"),
	InformationFilePath: getEnvVar("INFORMATION_FILE_PATH", "./data/information.txt"),
	Message:             getEnvVar("MESSAGE", ""),
}

// from stackoverflow
// https://stackoverflow.com/questions/17863821/how-to-read-last-lines-from-a-big-file-with-go-every-10-secs
func readLastLogLine(filepath string) (string, error) {
	// Open file
	file, err := os.OpenFile(filepath, os.O_RDONLY, 0644)
	if err != nil {
		fmt.Printf("Error opening file: %v\n", err)
		return "", err
	}

	defer file.Close()
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
	return line, nil
}

func stringFromFile(filepath string) (string, error) {
	// Open file
	file, err := os.OpenFile(filepath, os.O_RDONLY, 0644)
	if err != nil {
		fmt.Printf("Error opening file: %v\n", err)
		return "", err
	}
	defer file.Close()

	var builder strings.Builder
	scanner := bufio.NewScanner(file)

	// Read file
	for scanner.Scan() {
		builder.WriteString(scanner.Text())
		builder.WriteString("\n")
	}
	if err := scanner.Err(); err != nil {
		return "", err
	}
	return builder.String(), nil
}

type PingPongCount struct {
	Pings int `json:"pings"`
}

func getPingPongCount(url string) (int, error) {
	res, err := http.Get(url)
	if err != nil {
		return 0, err
	}
	defer res.Body.Close()
	bodyBytes, err := io.ReadAll(res.Body)
	if err != nil {
		return 0, err
	}

	var p PingPongCount
	err = json.Unmarshal(bodyBytes, &p)
	if err != nil {
		return 0, err
	}
	return p.Pings, nil
}

func getGreetingsMessage(url string) (string, error) {
	res, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()
	bodyBytes, err := io.ReadAll(res.Body)
	if err != nil {
		return "", err
	}

	return string(bodyBytes), nil
}

func main() {
	var message = config.Message

	// Readiness endpoint
	http.HandleFunc("/", func(res http.ResponseWriter, req *http.Request) {
		res.Write([]byte("Ok!"))
	})

	// Health check endpoint
	http.HandleFunc("/healthz", func(res http.ResponseWriter, req *http.Request) {
		res.Write([]byte("Ok!"))
	})

	// Status endpoint
	http.HandleFunc("/status", func(res http.ResponseWriter, req *http.Request) {
		// Read last log line
		lastLogLine, err := readLastLogLine(config.LogFilePath)
		if err != nil {
			fmt.Printf("Error reading last log line: %v\n", err)
			res.WriteHeader(http.StatusInternalServerError)
			res.Write([]byte("Error reading last log line"))
			return
		}

		// Get ping-pong count
		pingPongCount, err := getPingPongCount(config.PingPongUrl)
		if err != nil {
			fmt.Printf("Error getting ping-pong count: %v\n", err)
			res.WriteHeader(http.StatusInternalServerError)
			res.Write([]byte("Error getting ping-pong count"))
			return
		}

		// Read information file
		information, err := stringFromFile(config.InformationFilePath)
		if err != nil {
			fmt.Printf("Error reading information file: %v\n", err)
			res.WriteHeader(http.StatusInternalServerError)
			res.Write([]byte("Error reading information file"))
			return
		}

		// Read greetings message
		greetingsMessage, err := getGreetingsMessage(config.GreetingsUrl)
		if err != nil {
			fmt.Printf("Error getting greetings message: %v\n", err)
			res.WriteHeader(http.StatusInternalServerError)
			res.Write([]byte("Error getting greetings message"))
			return
		}

		// Write response
		res.Write([]byte(fmt.Sprintf("file content: %s\nenv variable: MESSAGE=%s\n%s\nPing / Pongs: %d\ngreetings: %s\n", information, message, lastLogLine, pingPongCount, greetingsMessage)))

		// Log to console
		fmt.Printf("%s: GET /status\n", time.Now().Format(time.RFC3339))
	})

	log.Fatal(http.ListenAndServe(":3000", nil))
}
