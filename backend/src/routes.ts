import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from "./config/multer";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { ListOrdersService } from "./services/order/ListOrdersService";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//-- USER Router
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

//-- CATEGORY Router
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);
router.get("/category", isAuthenticated, new ListCategoryController().handle);

//-- PRODUCT Router
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
);

//ORDER router
router.post("/order", isAuthenticated, new CreateOrderController().handle);
router.delete("/order", isAuthenticated, new RemoveOrderController().handle);
//ADD and RM item
router.post("/order/add", isAuthenticated, new AddItemController().handle);
router.delete(
  "/order/remove",
  isAuthenticated,
  new RemoveItemController().handle
);
router.put("/order/send", isAuthenticated, new SendOrderController().handle);
router.get("/orders", isAuthenticated, new ListOrdersController().handle);
export { router };
