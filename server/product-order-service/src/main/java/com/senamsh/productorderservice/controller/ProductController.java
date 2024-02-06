package com.senamsh.productorderservice.controller;


import com.senamsh.productorderservice.dto.ProductRequest;
import com.senamsh.productorderservice.dto.ProductResponse;
import com.senamsh.productorderservice.model.Product;
import com.senamsh.productorderservice.service.ProductService;
import jakarta.ws.rs.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@AllArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/product_order")
public class ProductController {

    private final ProductService productService;

    //testing endpoint
    @GetMapping("/test")
    public  String get(){
        return "ok";
    }


    @PostMapping("/item/add")
    public ResponseEntity<Map<String, Object>> addProduct(@ModelAttribute ProductRequest request) {

        try {
            Product saved = productService.saveProduct(request);
            Map<String, Object> response = new HashMap<>();
            response.put("id", saved.getId());
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            return ResponseEntity.status(500).body(buildErrorResponse("Error saving product"));
        }
    }


    @GetMapping("/item/{id}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable Long id) {

        try {
            ProductResponse productResponse= productService.getProductById(id);
            return ResponseEntity.ok(productResponse);

        }catch ( NotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }




    @GetMapping("/item/all")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {

        try {
            List<ProductResponse> productResponse= productService.getAllProducts();
            return ResponseEntity.ok(productResponse);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }






    // method to build error response
    private Map<String, Object> buildErrorResponse(String message) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("status", "error");
        errorResponse.put("message", message);
        return errorResponse;
    }





    @PutMapping("/item/edit/{id}")
    public ResponseEntity<Map<String, Object>> editProduct(@PathVariable Long id, @ModelAttribute ProductRequest request) {

        try {
            Product updatedProduct = productService.saveOrUpdateProduct(id, request);
            Map<String, Object> response = new HashMap<>();
            response.put("id", updatedProduct.getId());
            return ResponseEntity.ok(response);


        } catch (IOException e) {
            return ResponseEntity.status(500).body(buildErrorResponse("Error updating product"));
        }
    }



}