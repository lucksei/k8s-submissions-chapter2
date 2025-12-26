package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	var version = "1.0.0"
	var message = fmt.Sprintf("Hello from version %s", version)

	http.HandleFunc("/", func(res http.ResponseWriter, req *http.Request) {
		res.Write([]byte(message))
	})

	log.Println("Listening on port 3000")
	log.Fatal(http.ListenAndServe(":3000", nil))
}
