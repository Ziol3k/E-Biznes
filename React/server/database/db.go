package database

import (
	"Go_GROM/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	db, err := gorm.Open(sqlite.Open("shop.db"), &gorm.Config{})
	if err != nil {
		panic("Nie udało się połączyć z bazą danych: " + err.Error())
	}

	db.AutoMigrate(&models.Product{}, &models.Cart{}, &models.Category{})

	db.FirstOrCreate(&models.Category{}, models.Category{ID: 1, Name: "Elektronika"})
	db.FirstOrCreate(&models.Category{}, models.Category{ID: 2, Name: "Książki"})
	db.FirstOrCreate(&models.Category{}, models.Category{ID: 3, Name: "Odzież"})

	DB = db

}
