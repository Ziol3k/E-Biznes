package controllers

import (
	"Go_GROM/database"
	"Go_GROM/models"
	"net/http"

	"strconv"

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

func GetFilteredProducts(c echo.Context) error {
	categoryIDStr := c.QueryParam("category_id")
	minPriceStr := c.QueryParam("min_price")
	maxPriceStr := c.QueryParam("max_price")
	sort := c.QueryParam("sort")

	var products []models.Product
	query := database.DB

	if categoryIDStr != "" {
		categoryID, err := strconv.Atoi(categoryIDStr)
		if err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{"error": "Niepoprawne ID"})
		}
		query = query.Scopes(models.Product{}.ByCategory(uint(categoryID)))
	}

	if minPriceStr != "" && maxPriceStr != "" {
		minPrice, err := strconv.ParseFloat(minPriceStr, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{"error": "Niepoprawna cena minimalna"})
		}
		maxPrice, err := strconv.ParseFloat(maxPriceStr, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{"error": "Niepoprawna cena maksymalna"})
		}
		query = query.Scopes(models.Product{}.ByPrice(minPrice, maxPrice))
	} else if minPriceStr != "" {
		minPrice, err := strconv.ParseFloat(minPriceStr, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{"error": "Niepoprawna cena minimalna"})
		}
		query = query.Scopes(models.Product{}.ByPriceMin(minPrice))
	} else if maxPriceStr != "" {
		maxPrice, err := strconv.ParseFloat(maxPriceStr, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{"error": "Niepoprawna cena maksymalna"})
		}
		query = query.Scopes(models.Product{}.ByPriceMax(maxPrice))
	}

	if sort == "asc" {
		query = query.Scopes(models.Product{}.ByPriceSort(true))
	} else if sort == "desc" {
		query = query.Scopes(models.Product{}.ByPriceSort(false))
	}

	query.Find(&products)

	return c.JSON(http.StatusOK, products)
}
