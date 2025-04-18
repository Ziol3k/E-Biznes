package models

type Cart struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	Products   []Product `gorm:"many2many:cart_products;" json:"products"`
	TotalValue float64   `json:"total_value" gorm:"-"`
}
