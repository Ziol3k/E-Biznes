package main

import (
	"Go_GROM/controllers"
	"Go_GROM/database"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	database.ConnectDB()

	e.GET("/products", controllers.GetProducts)
	e.GET("/products/:id", controllers.GetProduct)
	e.POST("/products", controllers.CreateProduct)
	e.PUT("/products/:id", controllers.UpdateProduct)
	e.DELETE("/products/:id", controllers.DeleteProduct)
	e.GET("/products", controllers.GetFilteredProducts)

	e.POST("/cart", controllers.CreateCart)
	e.DELETE("/cart/:id", controllers.DeleteCart)
	e.GET("/cart/:id", controllers.GetCart)
	e.POST("/cart/:id/products", controllers.AddProductToCart)
	e.DELETE("/cart/:id/products/:productId", controllers.RemoveProductFromCart)

	e.GET("/categories", controllers.GetCategories)
	e.GET("/categories/:id", controllers.GetCategory)
	e.POST("/categories", controllers.CreateCategory)
	e.PUT("/categories/:id", controllers.UpdateCategory)
	e.DELETE("/categories/:id", controllers.DeleteCategory)

	e.Logger.Fatal(e.Start(":8081"))

}
