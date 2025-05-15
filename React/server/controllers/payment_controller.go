package controllers

import (
	"fmt"
	"net/http"

	"Go_GROM/database"
	"Go_GROM/models"

	"github.com/labstack/echo/v4"
)

// Payment reprezentuje dane płatności przesyłane z klienta.
type Payment struct {
	CartID uint    `json:"cart_id"`
	Amount float64 `json:"amount"`
	Method string  `json:"method"`
}

// HandlePayment obsługuje proces płatności dla koszyka.
func HandlePayment(c echo.Context) error {
	var payment Payment

	if err := c.Bind(&payment); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Niepoprawne dane"})
	}

	fmt.Printf("Płatność: %+v\n", payment)

	var cart models.Cart
	if err := database.DB.First(&cart, payment.CartID).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Koszyk nie znaleziony"})
	}
	database.DB.Delete(&cart)

	newCart := models.Cart{TotalValue: 0}
	if err := database.DB.Create(&newCart).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Nie udało się utworzyć nowego koszyka"})
	}
	return c.JSON(http.StatusOK, echo.Map{
		"message":  "Płatność przyjęta, utworzono nowy koszyk",
		"new_cart": newCart,
	})
}
