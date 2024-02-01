package com.senamsh.productorderservice.controller;


import com.senamsh.productorderservice.dto.ProductResponse;
import com.senamsh.productorderservice.model.Product;
import com.senamsh.productorderservice.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/product_order")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/test")
    public  String get(){
        return "ok";

    }
    @PostMapping("/item/add")
    public ResponseEntity<Map<String, Object>> addProduct(
            @RequestParam("image") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("price") int price) {
        try {
            // Validate parameters
            if (file.isEmpty() || name.isEmpty() ) {
                return ResponseEntity.badRequest().body(buildErrorResponse("Invalid input parameters"));
            }

            // Convert the MultipartFile to byte[]
            byte[] data = file.getBytes();

            // Create a new Product object with the image data and name
            Product product = new Product();
            product.setDat(data);
            product.setName(name);
            product.setPric(price);

            // Save the product
            Product saved = productService.saveProduct(product);

            Map<String, Object> response = new HashMap<>();
            response.put("id", saved.getId());
            return ResponseEntity.ok(response);
        } catch (IOException e) {

            return ResponseEntity.status(500).body(buildErrorResponse("Error saving product"));
        }
    }

    @GetMapping("/item/{id}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            ProductResponse response = new ProductResponse();
            response.setId(id);
            response.setDat(encodeBase64(product.getDat()));
            response.setName(product.getName());
            response.setPric(product.getPric());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }




    @GetMapping("/item/all")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<Product> products = productService.getAllProducts();


        List<ProductResponse> productResponses = products.stream()
                .map(product -> new ProductResponse(product.getId(), product.getName(), encodeBase64(product.getDat()), product.getPric()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(productResponses);
    }

    // encode byte array to Base64
    private String encodeBase64(byte[] data) {
        if (data != null) {
            return Base64.getEncoder().encodeToString(data);
        } else {
            return "";
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
    public ResponseEntity<Map<String, Object>> editProduct(
            @PathVariable Long id,
            @RequestParam(value = "image", required = false) MultipartFile file,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "price", required = false) String price) {
        try {
            // Validate parameters
            if (id == null || (file == null && name == null && price == null)) {
                return ResponseEntity.badRequest().body(buildErrorResponse("Invalid input parameters"));
            }

            // Retrieve the existing product
            Product existingProduct = productService.getProductById(id);
            if (existingProduct == null) {
                return ResponseEntity.notFound().build();
            }

            // Update the product fields if new values are provided
            if (file != null) {
                existingProduct.setDat(file.getBytes());
            }
            if (name != null) {
                existingProduct.setName(name);
            }
            if (price != null) {
                existingProduct.setPric(Integer.parseInt(price));
            }

            // Save the updated product
            Product updatedProduct = productService.saveProduct(existingProduct);

            Map<String, Object> response = new HashMap<>();
            response.put("id", updatedProduct.getId());
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(buildErrorResponse("Error updating product"));
        }
    }




}