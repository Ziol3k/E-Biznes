// Package models definiuje struktury danych używane w aplikacji.
package models

import "gorm.io/gorm"

// Product reprezentuje produkt w sklepie.
type Product struct {
	ID         uint     `gorm:"primaryKey" json:"id"`
	Name       string   `json:"name"`
	Price      float64  `json:"price"`
	CategoryID uint     `json:"category_id"`
	Category   Category `gorm:"foreignKey:CategoryID" json:"-"`
}

// ByCategory zwraca scope filtrujący produkty po ID kategorii.
func (p Product) ByCategory(categoryID uint) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("category_id = ?", categoryID)
	}
}

// ByPrice zwraca scope filtrujący produkty po przedziale cenowym.
func (p Product) ByPrice(minPrice, maxPrice float64) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("price BETWEEN ? AND ?", minPrice, maxPrice)
	}
}

// ByPriceMin zwraca scope filtrujący produkty po minimalnej cenie.
func (p Product) ByPriceMin(minPrice float64) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("price >= ?", minPrice)
	}
}

// ByPriceMax zwraca scope filtrujący produkty po maksymalnej cenie.
func (p Product) ByPriceMax(maxPrice float64) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("price <= ?", maxPrice)
	}
}

// ByPriceSort zwraca scope sortujący produkty po cenie rosnąco lub malejąco.
func (p Product) ByPriceSort(asc bool) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if asc {
			return db.Order("price ASC")
		}
		return db.Order("price DESC")
	}
}
