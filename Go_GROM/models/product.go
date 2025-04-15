package models

import "gorm.io/gorm"

type Product struct {
	ID         uint     `gorm:"primaryKey" json:"id"`
	Name       string   `json:"name"`
	Price      float64  `json:"price"`
	CategoryID uint     `json:"category_id"`
	Category   Category `gorm:"foreignKey:CategoryID" json:"-"`
}

func (p Product) ByCategory(categoryID uint) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("category_id = ?", categoryID)
	}
}

func (p Product) ByPrice(minPrice, maxPrice float64) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("price BETWEEN ? AND ?", minPrice, maxPrice)
	}
}

func (p Product) ByPriceMin(minPrice float64) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("price >= ?", minPrice)
	}
}

func (p Product) ByPriceMax(maxPrice float64) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("price <= ?", maxPrice)
	}
}

func (p Product) ByPriceSort(asc bool) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if asc {
			return db.Order("price ASC")
		} else {
			return db.Order("price DESC")
		}

	}
}
