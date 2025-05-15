package controllers

import (
	"Go_GROM/database"
	"Go_GROM/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

const categoryNotFoundMsg = "Kategoria nie znaleziona"

func GetCategories(c echo.Context) error {
	var categories []models.Category
	database.DB.Find(&categories)
	return c.JSON(http.StatusOK, categories)
}

func GetCategory(c echo.Context) error {
	id := c.Param("id")
	var category models.Category
	if err := database.DB.First(&category, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": categoryNotFoundMsg})
	}
	return c.JSON(http.StatusOK, category)
}

func CreateCategory(c echo.Context) error {
	var category models.Category
	if err := c.Bind(&category); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Niepoprawne dane"})
	}
	database.DB.Create(&category)
	return c.JSON(http.StatusCreated, category)
}

func UpdateCategory(c echo.Context) error {
	id := c.Param("id")
	var category models.Category
	if err := database.DB.First(&category, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": categoryNotFoundMsg})
	}
	if err := c.Bind(&category); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Niepoprawne dane"})
	}
	database.DB.Save(&category)
	return c.JSON(http.StatusOK, category)
}

func DeleteCategory(c echo.Context) error {
	id := c.Param("id")
	var category models.Category
	if err := database.DB.First(&category, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": categoryNotFoundMsg})
	}
	database.DB.Delete(&category)
	return c.NoContent(http.StatusNoContent)
}
