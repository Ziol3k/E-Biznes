// Package models definiuje struktury danych używane w aplikacji.
package models

// CartProduct reprezentuje powiązanie między koszykiem a produktem wraz z ilością.
type CartProduct struct {
	CartID    uint    `gorm:"primaryKey" json:"cart_id"`
	ProductID uint    `gorm:"primaryKey" json:"product_id"`
	Quantity  uint    `json:"quantity"`
	Product   Product `gorm:"foreignKey:ProductID" json:"product"`
}

// Cart reprezentuje koszyk zakupowy wraz z powiązanymi produktami i wartością całkowitą.
type Cart struct {
	ID         uint          `gorm:"primaryKey" json:"id"`
	Products   []CartProduct `gorm:"foreignKey:CartID" json:"products"`
	TotalValue float64       `json:"total_value"`
}
