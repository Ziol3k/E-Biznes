package main

import (
	"Go_GROM/controllers"
	"Go_GROM/database"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

const (
	productsBase    = "/products"
	productByID     = "/products/:id"
	categoryByID    = "/categories/:id"
)

func main() {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3001"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
	}))

	database.ConnectDB()

	e.GET(productsBase, controllers.GetProducts)
	e.GET(productByID, controllers.GetProduct)
	e.POST(productsBase, controllers.CreateProduct)
	e.PUT(productByID, controllers.UpdateProduct)
	e.DELETE(productByID, controllers.DeleteProduct)
	e.GET(productsBase, controllers.GetFilteredProducts)

	e.POST("/cart", controllers.CreateCart)
	e.DELETE("/cart/:id", controllers.DeleteCart)
	e.GET("/cart/:id", controllers.GetCart)
	e.POST("/cart/:id/products", controllers.AddProductToCart)
	e.DELETE("/cart/:id/products/:productId", controllers.RemoveProductFromCart)

	e.GET("/categories", controllers.GetCategories)
	e.GET(categoryByID, controllers.GetCategory)
	e.POST("/categories", controllers.CreateCategory)
	e.PUT(categoryByID, controllers.UpdateCategory)
	e.DELETE(categoryByID, controllers.DeleteCategory)

	e.POST("/payments", controllers.HandlePayment)

	e.Logger.Fatal(e.Start(":8081"))
}
