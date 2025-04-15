package controllers

import (
	"Go_GROM/database"
	"Go_GROM/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetProducts(c echo.Context) error {
	var products []models.Product
	database.DB.Find(&products)
	return c.JSON(http.StatusOK, products)
}

func GetProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product
	if err := database.DB.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Produkt nie znaleziony"})
	}
	return c.JSON(http.StatusOK, product)
}

func CreateProduct(c echo.Context) error {
	var product models.Product
	if err := c.Bind(&product); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Niepoprawne dane"})
	}
	database.DB.Create(&product)
	return c.JSON(http.StatusCreated, product)
}

func UpdateProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product
	if err := database.DB.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Produkt nie znaleziony"})
	}

	if err := c.Bind(&product); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Niepoprawne dane"})
	}

	database.DB.Save(&product)
	return c.JSON(http.StatusOK, product)
}

func DeleteProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product
	if err := database.DB.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Produkt nie znaleziony"})
	}
	database.DB.Delete(&product)
	return c.NoContent(http.StatusNoContent)
}
