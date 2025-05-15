// Package database zawiera funkcje do inicjalizacji i zarządzania połączeniem z bazą danych.
package database

import (
	"Go_GROM/models"
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// DB jest globalnym obiektem bazy danych wykorzystywanym w całej aplikacji.
var DB *gorm.DB

// ConnectDB łączy się z bazą danych SQLite, wykonuje migracje oraz inicjalizuje podstawowe dane.
func ConnectDB() {
	db, err := gorm.Open(sqlite.Open("shop.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Nie udało się połączyć z bazą danych: %v", err)
	}

	if err := db.AutoMigrate(
		&models.Product{},
		&models.CartProduct{},
		&models.Cart{},
		&models.Category{},
	); err != nil {
		log.Fatalf("Nie udało się wykonać migracji: %v", err)
	}

	db.FirstOrCreate(&models.Category{}, models.Category{ID: 1, Name: "Elektronika"})
	db.FirstOrCreate(&models.Category{}, models.Category{ID: 2, Name: "Książki"})
	db.FirstOrCreate(&models.Category{}, models.Category{ID: 3, Name: "Odzież"})

	DB = db
}
