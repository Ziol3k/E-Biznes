package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type Payment struct {
	CartID uint    `json:"cart_id"`
	Amount float64 `json:"amount"`
	Method string  `json:"method"`
}

func HandlePayment(c echo.Context) error {
	var payment Payment

	if err := c.Bind(&payment); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Niepoprawne dane"})
	}

	return c.JSON(http.StatusOK, echo.Map{"message": "Płatność przyjęta"})
}
