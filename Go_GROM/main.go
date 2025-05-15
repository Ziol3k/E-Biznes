package main

import (
	"Go_GROM/controllers"
	"Go_GROM/database"

	"github.com/labstack/echo/v4"
)

const (
    productsPath       = "/products"
    productByIDPath    = "/products/:id"
    categoriesPath     = "/categories"
    categoryByIDPath   = "/categories/:id"
)

func main() {
	e := echo.New()

	database.ConnectDB()

	e.GET(productsPath, controllers.GetProducts)
	e.GET(productByIDPath, controllers.GetProduct)
	e.POST(productsPath, controllers.CreateProduct)
	e.PUT(productByIDPath, controllers.UpdateProduct)
	e.DELETE(productByIDPath, controllers.DeleteProduct)
	e.GET(productsPath, controllers.GetFilteredProducts)	

	e.POST("/cart", controllers.CreateCart)
	e.DELETE("/cart/:id", controllers.DeleteCart)
	e.GET("/cart/:id", controllers.GetCart)
	e.POST("/cart/:id/products", controllers.AddProductToCart)
	e.DELETE("/cart/:id/products/:productId", controllers.RemoveProductFromCart)

	e.GET(categoriesPath, controllers.GetCategories)
	e.GET(categoryByIDPath, controllers.GetCategory)
	e.POST(categoriesPath, controllers.CreateCategory)
	e.PUT(categoryByIDPath, controllers.UpdateCategory)
	e.DELETE(categoryByIDPath, controllers.DeleteCategory)
	
	e.Logger.Fatal(e.Start(":8081"))

}
