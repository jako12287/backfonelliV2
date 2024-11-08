import express from "express";
import {
  getOrders,
  createOrder,
  getOrdersByUserId,
  cancelOrder,
  editOrder,
  getOrderById,
} from "../controllers/orders.controller";

const router = express.Router();

// Ruta para obtener todas las órdenes
router.get("/orders", getOrders);
// Ruta para obtener pedidos por id de usuario
router.get("/orders/:customer_id", getOrdersByUserId as never);

//Ruta para obtener una ordern por id de orden
router.get("/orders/byId/:orderId", getOrderById as never);

// Ruta para crear una nueva orden
router.post("/orders", createOrder);

//Ruta para cancelar orden
router.put("/orders/:orderId", cancelOrder as never);

// Ruta para editar una orden
router.put("/orders/edit/:orderId", editOrder as never);

export default router;
