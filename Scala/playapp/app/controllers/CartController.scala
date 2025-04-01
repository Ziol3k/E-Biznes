package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._

case class CartItem(id: Long, productId: Long, quantity: Int)
object CartItem {
  implicit val cartItemFormat: Format[CartItem] = Json.format[CartItem]
}

@Singleton
class CartController @Inject() (val controllerComponents: ControllerComponents) extends BaseController {
  private var cartItems: List[CartItem] = List()

  def getAllCartItems(): Action[AnyContent] = Action {
    Ok(Json.toJson(cartItems))
  }

  def getCartItemById(id: Long): Action[AnyContent] = Action {
    cartItems.find(_.id == id) match {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound(Json.obj("error" -> "Cart item not found"))
    }
  }

  def addCartItem(): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[CartItem].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid data")),
      item => {
        cartItems = cartItems :+ item
        Created(Json.toJson(item))
      }
    )
  }

  def updateCartItem(id: Long): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[CartItem].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid data")),
      updatedItem => {
        cartItems = cartItems.map(i => if (i.id == id) updatedItem else i)
        Ok(Json.toJson(updatedItem))
      }
    )
  }

  def deleteCartItem(id: Long): Action[AnyContent] = Action {
    cartItems = cartItems.filterNot(_.id == id)
    NoContent
  }
}
