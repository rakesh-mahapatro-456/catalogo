import {Router} from 'express';
import wrapAsync from '../middlewares/wrapAsync.middleware.js';
import {createProduct,updateProduct,getProducts,deleteProduct,getProductsById} from "../controllers/products.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const router  = Router();

router.get("/getProducts",authMiddleware,wrapAsync(getProducts));
router.get("/getProductById/:id",authMiddleware,wrapAsync(getProductsById))
router.post("/createProduct",authMiddleware,wrapAsync(createProduct));

router.put("/updateProduct/:id",authMiddleware,wrapAsync(updateProduct));
router.delete("/deleteProduct/:id",authMiddleware,wrapAsync(deleteProduct));


export default router;