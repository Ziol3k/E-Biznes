package controllers

import (
	"Go_GROM/database"
	"Go_GROM/models"
	"net/http"

	"strconv"

	"github.com/labstack/echo/v4"
)

const productNotFoundMsg = "Produkt nie znaleziony"

func GetProducts(c echo.Context) error {
	var products []models.Product
	database.DB.Find(&products)
	return c.JSON(http.StatusOK, products)
}

func GetProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product
	if err := database.DB.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": productNotFoundMsg})
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
		return c.JSON(http.StatusNotFound, echo.Map{"error": productNotFoundMsg})
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
		return c.JSON(http.StatusNotFound, echo.Map{"error": productNotFoundMsg})
	}
	database.DB.Delete(&product)
	return c.NoContent(http.StatusNoContent)
}

func parseFloatParam(c echo.Context, param string, errorMsg string) (float64, error) {
	valStr := c.QueryParam(param)
	if valStr == "" {
		return 0, nil
	}
	val, err := strconv.ParseFloat(valStr, 64)
	if err != nil {
		return 0, echo.NewHTTPError(http.StatusBadRequest, errorMsg)
	}
	return val, nil
}

func parseIntParam(c echo.Context, param string, errorMsg string) (int, error) {
	valStr := c.QueryParam(param)
	if valStr == "" {
		return 0, nil
	}
	val, err := strconv.Atoi(valStr)
	if err != nil {
		return 0, echo.NewHTTPError(http.StatusBadRequest, errorMsg)
	}
	return val, nil
}

func GetFilteredProducts(c echo.Context) error {
	categoryID, err := parseIntParam(c, "category_id", "Niepoprawne ID")
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}

	minPrice, err := parseFloatParam(c, "min_price", "Niepoprawna cena minimalna")
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}

	maxPrice, err := parseFloatParam(c, "max_price", "Niepoprawna cena maksymalna")
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}

	sort := c.QueryParam("sort")

	var products []models.Product
	query := database.DB

	if categoryID != 0 {
		query = query.Scopes(models.Product{}.ByCategory(uint(categoryID)))
	}

	if minPrice != 0 && maxPrice != 0 {
		query = query.Scopes(models.Product{}.ByPrice(minPrice, maxPrice))
	} else if minPrice != 0 {
		query = query.Scopes(models.Product{}.ByPriceMin(minPrice))
	} else if maxPrice != 0 {
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
