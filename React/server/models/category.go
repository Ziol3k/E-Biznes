// Package models definiuje struktury danych używane w aplikacji.
package models

// Category reprezentuje kategorię produktów.
type Category struct {
	ID   uint   `gorm:"primaryKey" json:"id"`
	Name string `json:"name"`
}
