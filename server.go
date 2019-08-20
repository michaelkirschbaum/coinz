package main

import (
	"fmt"
	"log"
	"net/http"
	"database/sql"
	_ "github.com/lib/pq"
)

var db *sql.DB

func handler(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query(`
		SELECT * FROM users;
	`)
	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		var (
			name string
		)
		if err := rows.Scan(&name); err != nil {
			panic(err)
		}
		fmt.Fprintf(w,"%s\n", name)
	}
}

func main() {
	var err error
	connStr := "user=postgres password=postgres dbname=postgres port=5432 sslmode=disable"
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe(":3000", nil))
}
