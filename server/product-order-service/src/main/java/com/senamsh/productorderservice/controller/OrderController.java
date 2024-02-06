package com.senamsh.productorderservice.controller;
import com.senamsh.productorderservice.dto.OderResponse;
import com.senamsh.productorderservice.dto.OrderDTO;
import com.senamsh.productorderservice.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/product_order")
public class OrderController {


    private OrderService orderService;



    //testing endpoint
    @GetMapping("test1")
    public  String get(){
        return "ok";

    }

    @PostMapping("/order")
    public ResponseEntity<String> placeOrder(@RequestBody OrderDTO orderDTO) {

        try {
            orderService.placeOrder(orderDTO);
            return ResponseEntity.ok("Order placed successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error placing order");
        }
    }


    @GetMapping("/get/order")
    public ResponseEntity<List<OderResponse>> getAllOrders() {

        try {
            List<OderResponse> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping("/{orderId}/st")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Long orderId, @RequestParam String newStatus) {

        try {
            orderService.updateOrderStatus(orderId, newStatus);
            return new ResponseEntity<>("Order status updated successfully", HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


}
