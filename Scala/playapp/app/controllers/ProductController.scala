package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._

case class Product(id: Long, name: String, price: Double)
object Product {
  implicit val productFormat: Format[Product] = Json.format[Product]
}

@Singleton
class ProductController @Inject() (val controllerComponents: ControllerComponents) extends BaseController {
  private var products: List[Product] = List(
    Product(1, "Laptop", 2500.0),
    Product(2, "Phone", 1500.0)
  )

  def getAll(): Action[AnyContent] = Action {
    Ok(Json.toJson(products))
  }

  def getById(id: Long): Action[AnyContent] = Action {
    products.find(_.id == id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound(Json.obj("error" -> "Product not found"))
    }
  }

  def add(): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Product].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid data")),
      product => {
        products = products :+ product
        Created(Json.toJson(product))
      }
    )
  }

  def update(id: Long): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Product].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid data")),
      updatedProduct => {
        products = products.map(p => if (p.id == id) updatedProduct else p)
        Ok(Json.toJson(updatedProduct))
      }
    )
  }

  def delete(id: Long): Action[AnyContent] = Action {
    products = products.filterNot(_.id == id)
    NoContent
  }
}
