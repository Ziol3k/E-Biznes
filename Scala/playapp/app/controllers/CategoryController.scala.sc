package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._

case class Category(id: Long, name: String)
object Category {
  implicit val categoryFormat = Json.format[Category]
}

@Singleton
class CategoryController @Inject() (val controllerComponents: ControllerComponents) extends BaseController {
  private var categories: List[Category] = List(
    Category(1, "Electronics"),
    Category(2, "Books"),
    Category(3, "Clothing")
  )

  def getAllCategories() = Action {
    Ok(Json.toJson(categories))
  }

  def getCategoryById(id: Long) = Action {
    categories.find(_.id == id) match {
      case Some(category) => Ok(Json.toJson(category))
      case None => NotFound(Json.obj("error" -> "Category not found"))
    }
  }

  def addCategory() = Action(parse.json) { request =>
    request.body.validate[Category].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid data")),
      category => {
        categories = categories :+ category
        Created(Json.toJson(category))
      }
    )
  }

  def updateCategory(id: Long) = Action(parse.json) { request =>
    request.body.validate[Category].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid data")),
      updatedCategory => {
        categories = categories.map(c => if (c.id == id) updatedCategory else c)
        Ok(Json.toJson(updatedCategory))
      }
    )
  }

  def deleteCategory(id: Long) = Action {
    categories = categories.filterNot(_.id == id)
    NoContent
  }
}
