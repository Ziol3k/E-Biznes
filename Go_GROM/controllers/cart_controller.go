package controllers

import (
	"Go_GROM/database"
	"Go_GROM/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

const cartNotFoundMsg = "Koszyk nie znaleziony"

func CreateCart(c echo.Context) error {
	cart := models.Cart{}
	if err := database.DB.Create(&cart).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Nie udało się utworzyć koszyka"})
	}
	return c.JSON(http.StatusCreated, cart)
}

func DeleteCart(c echo.Context) error {
	id := c.Param("id")
	var cart models.Cart
	if err := database.DB.First(&cart, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": cartNotFoundMsg})
	}
	database.DB.Model(&cart).Association("Products").Clear()
	database.DB.Delete(&cart)
	return c.NoContent(http.StatusNoContent)
}

func AddProductToCart(c echo.Context) error {
	cartID := c.Param("id")
	var cart models.Cart
	if err := database.DB.Preload("Products").First(&cart, cartID).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": cartNotFoundMsg})
	}

	var body struct {
		ProductID uint `json:"product_id"`
	}

	if err := c.Bind(&body); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Niepoprawne dane"})
	}

	var product models.Product
	if err := database.DB.First(&product, body.ProductID).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Produkt nie znaleziony"})
	}

	database.DB.Model(&cart).Association("Products").Append(&product)
	return c.JSON(http.StatusOK, echo.Map{"message": "Produkt dodany do koszyka"})
}

func RemoveProductFromCart(c echo.Context) error {
	cartID := c.Param("id")
	productID := c.Param("productId")

	var cart models.Cart
	if err := database.DB.Preload("Products").First(&cart, cartID).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": cartNotFoundMsg})
	}

	var product models.Product
	if err := database.DB.First(&product, productID).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Produkt nie znaleziony"})
	}

	database.DB.Model(&cart).Association("Products").Delete(&product)
	return c.JSON(http.StatusOK, echo.Map{"message": "Produkt usunięty z koszyka"})
}

func GetCart(c echo.Context) error {
	id := c.Param("id")
	var cart models.Cart
	if err := database.DB.Preload("Products").First(&cart, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": cartNotFoundMsg})
	}

	total := 0.0
	for _, p := range cart.Products {
		total += p.Price
	}
	cart.TotalValue = total

	return c.JSON(http.StatusOK, cart)
}
