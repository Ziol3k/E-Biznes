package models

type CartProduct struct {
	CartID    uint    `gorm:"primaryKey" json:"cart_id"`
	ProductID uint    `gorm:"primaryKey" json:"product_id"`
	Quantity  uint    `json:"quantity"`
	Product   Product `gorm:"foreignKey:ProductID" json:"product"`
}

type Cart struct {
	ID         uint          `gorm:"primaryKey" json:"id"`
	Products   []CartProduct `gorm:"foreignKey:CartID" json:"products"`
	TotalValue float64       `json:"total_value"`
}
