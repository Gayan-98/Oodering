package com.senamsh.productorderservice.service;

import com.senamsh.productorderservice.dto.OderResponse;
import com.senamsh.productorderservice.dto.OrderDTO;
import com.senamsh.productorderservice.dto.OrderItemDTO;
import com.senamsh.productorderservice.dto.OrderProductResponse;
import com.senamsh.productorderservice.model.Order;
import com.senamsh.productorderservice.model.OrderItem;
import com.senamsh.productorderservice.model.Product;
import com.senamsh.productorderservice.repository.OrderRepository;

import com.senamsh.productorderservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private TransactionTemplate transactionTemplate;

    public void placeOrder(OrderDTO orderDTO) {
        Order order = new Order();
        order.setTotalPrice(calculateTotalPrice(orderDTO.getOrderItems()));
        order.setOrderItems(convertToOrderItems(order, orderDTO.getOrderItems()));
        order.setOrderNumber(orderDTO.getOrderNumber());
        // Set the initial status to "Pending"
        order.setStatus("Pending");
        // Set creation time to current time
        order.setCreationTime(LocalDateTime.now());


        orderRepository.save(order);
    }

    private double calculateTotalPrice(List<OrderItemDTO> orderItems) {
        double totalPrice = 0.0;
        for (OrderItemDTO orderItemDTO : orderItems) {
            Product product = productRepository.findById(orderItemDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            // Assuming 'price' is a property in your Product entity
            double productPrice = product.getPric();
            int quantity = orderItemDTO.getQuantity();
            totalPrice += productPrice * quantity;
        }
        return totalPrice;
    }

    private List<OrderItem> convertToOrderItems(Order order, List<OrderItemDTO> orderItemsDTO) {
        // Convert OrderItemDTO to OrderItem entities
        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemDTO orderItemDTO : orderItemsDTO) {
            OrderItem orderItem = new OrderItem();
            Product product = new Product();
            product.setId(orderItemDTO.getProductId());
            orderItem.setProduct(product);
            orderItem.setQuantity(orderItemDTO.getQuantity());
            orderItem.setOrder(order);

            orderItems.add(orderItem);
        }
        return orderItems;
    }



    @Transactional
    public List<OderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::convertToOderResponse)
                .collect(Collectors.toList());
    }

    public OderResponse convertToOderResponse(Order order) {
        OderResponse oderResponse = new OderResponse();
        oderResponse.setId(order.getId());
        oderResponse.setOrderNumber(order.getOrderNumber());
        oderResponse.setTotalPrice(order.getTotalPrice());
        oderResponse.setStatus(order.getStatus());


        try {
            transactionTemplate.execute(status -> {
            List<OrderProductResponse> orderProductResponses = order.getOrderItems().stream()
                    .map(orderItem -> {
                        Product product = orderItem.getProduct();

                        if (product != null) {
                            return new OrderProductResponse(
                                    product.getId(),
                                    product.getName(),
                                    orderItem.getQuantity()
                            );
                        } else {
                            // Handle the case where product is null
                            System.out.println("product is null");
                            return null;
                        }
                    })
                    .filter(Objects::nonNull) // Remove null entries
                    .collect(Collectors.toList());


            oderResponse.setProducts(orderProductResponses);
            oderResponse.setCreationTime(order.getCreationTime());


                return null; // or any result if needed
            });

        }catch (Exception e) {
            e.printStackTrace();
        }



        return oderResponse;
    }


    @Transactional
    public void updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        order.setStatus(newStatus);

        orderRepository.save(order);
    }




}

