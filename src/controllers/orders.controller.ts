import { Request, Response } from "express";
import Order from "../models/orders.model";
import { StatusProps } from "../types";
import mongoose from "mongoose";

// GET: Obtiene todas las órdenes
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// POST: Crea una nueva orden
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { model_name, piece, observations, details, customer_id, status } =
      req.body;
    const newOrder = new Order({
      customer_id,
      model_name,
      piece,
      observations,
      status,
      details,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: "Error creating order", error });
  }
};

// GET: Obtiene todas las órdenes de un usuario por su ID
export const getOrdersByUserId = async (req: Request, res: Response) => {
  const { customer_id } = req.params;

  try {
    const orders = await Order.find({ customer_id });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching orders", error });
  }
};

// PUT: Cancela una orden cambiando el estado a "CANCELLED"
export const cancelOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "CANCELLED" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ message: "Error updating order", error });
  }
};

// PUT: Edita una orden
export const editOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { model_name, piece, observations, details, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        model_name,
        piece,
        observations,
        details,
        status,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ message: "Error updating order", error });
  }
};

// GET: Obtiene una orden por su ID
export const getOrderById = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching order", error });
  }
};
