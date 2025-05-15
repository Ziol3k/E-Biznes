// Package controllers zawiera handlery HTTP dla zasobów koszyka.
package controllers

import (
	"Go_GROM/database"
	"Go_GROM/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

const cartNotFoundMsg = "Koszyk nie znaleziony"

func updateTotalValue(cart *models.Cart) {
	var cartProducts []models.CartProduct
	database.DB.Where("cart_id = ?", cart.ID).Find(&cartProducts)

	total := 0.0
	for _, cp := range cartProducts {
		var product models.Product
		database.DB.First(&product, cp.ProductID)
		total += float64(cp.Quantity) * product.Price
	}
	cart.TotalValue = total
	database.DB.Save(cart)
}

// CreateCart tworzy nowy koszyk
func CreateCart(c echo.Context) error {
	cart := models.Cart{TotalValue: 0}
	if err := database.DB.Create(&cart).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Nie udało się utworzyć koszyka"})
	}
	return c.JSON(http.StatusCreated, cart)
}

// DeleteCart usuwa koszyk na podstawie ID
func DeleteCart(c echo.Context) error {
	id := c.Param("id")
	var cart models.Cart
	if err := database.DB.First(&cart, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": cartNotFoundMsg})
	}
	if err := database.DB.Model(&cart).Association("Products").Clear(); err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Nie udało się usunąć produktów z koszyka"})
	}
	database.DB.Delete(&cart)
	return c.NoContent(http.StatusNoContent)
}

// AddProductToCart dodaje produkt do koszyka
func AddProductToCart(c echo.Context) error {
	cartID := c.Param("id")
	var cart models.Cart
	if err := database.DB.First(&cart, cartID).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": cartNotFoundMsg})
	}

	var body struct {
		ProductID uint `json:"product_id"`
		Quantity  uint `json:"quantity"`
	}

	if err := c.Bind(&body); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Niepoprawne dane"})
	}

	var cartProduct models.CartProduct
	if err := database.DB.First(&cartProduct, "cart_id = ? AND product_id = ?", cartID, body.ProductID).Error; err == nil {
		cartProduct.Quantity += body.Quantity
		database.DB.Save(&cartProduct)
	} else {
		cartProduct = models.CartProduct{
			CartID:    cart.ID,
			ProductID: body.ProductID,
			Quantity:  body.Quantity,
		}
		database.DB.Create(&cartProduct)
	}

	updateTotalValue(&cart)

	return c.JSON(http.StatusOK, echo.Map{"message": "Produkt dodany do koszyka"})
}

// RemoveProductFromCart usuwa lub zmniejsza ilość produktu w koszyku
func RemoveProductFromCart(c echo.Context) error {
	cartID := c.Param("id")
	productID := c.Param("productId")

	var cartProduct models.CartProduct
	if err := database.DB.First(&cartProduct, "cart_id = ? AND product_id = ?", cartID, productID).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Produkt nie znaleziony w koszyku"})
	}

	if cartProduct.Quantity > 1 {
		cartProduct.Quantity--
		database.DB.Save(&cartProduct)
	} else {
		database.DB.Delete(&cartProduct)
	}

	var cart models.Cart
	if err := database.DB.First(&cart, cartID).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": cartNotFoundMsg})
	}
	updateTotalValue(&cart)

	return c.JSON(http.StatusOK, echo.Map{"message": "Produkt usunięty z koszyka"})
}

// GetCart pobiera dane koszyka z produktami
func GetCart(c echo.Context) error {
	id := c.Param("id")
	var cart models.Cart
	if err := database.DB.Preload("Products.Product").First(&cart, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": cartNotFoundMsg})
	}

	updateTotalValue(&cart)

	return c.JSON(http.StatusOK, cart)
}
