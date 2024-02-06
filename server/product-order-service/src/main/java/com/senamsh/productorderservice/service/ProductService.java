package com.senamsh.productorderservice.service;


import com.senamsh.productorderservice.dto.ProductRequest;
import com.senamsh.productorderservice.dto.ProductResponse;
import com.senamsh.productorderservice.model.Product;
import com.senamsh.productorderservice.repository.ProductRepository;
import jakarta.ws.rs.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ProductService {


    private final ProductRepository productRepository;



    public Product saveProduct(ProductRequest request) throws IOException {
        // Validate parameters
        if (request.getImage().isEmpty() || request.getName().isEmpty()) {
            throw new IllegalArgumentException("Invalid input parameters");
        }

        // Convert the MultipartFile to byte[]
        byte[] data = request.getImage().getBytes();

        // Create a new Product object with the image data and name
        Product product = new Product();
        product.setDat(data);
        product.setName(request.getName());
        product.setPric(request.getPrice());

        // Save the product
        return productRepository.save(product);
    }


    public Product saveOrUpdateProduct(Long id, ProductRequest request) throws IOException {
        // Validate parameters
        if (request == null || (id == null && (request.getImage() == null || request.getName() == null ))) {
            throw new IllegalArgumentException("Invalid input parameters");
        }


        Product existingProduct= productRepository.findById(id).orElse(null);

        // Update the product fields if new values are provided
        if (request.getImage() != null) {
            existingProduct.setDat(request.getImage().getBytes());
        }
        if (request.getName() != null) {
            existingProduct.setName(request.getName());
        }
        if (request.getPrice() != 0) {
            existingProduct.setPric(request.getPrice());
        }

        // Save the product
        return productRepository.save(existingProduct);
    }






    public ProductResponse getProductById(Long id) {

        Product product= productRepository.findById(id).orElse(null);

        if (product != null) {
            ProductResponse response = new ProductResponse();
            response.setId(id);
            response.setDat(encodeBase64(product.getDat()));
            response.setName(product.getName());
            response.setPric(product.getPric());

            return response;
        } else {
            throw new NotFoundException("Product not found with id: " + id);
        }
    }


    // encode byte array to Base64
    private String encodeBase64(byte[] data) {
        if (data != null) {
            return Base64.getEncoder().encodeToString(data);
        } else {
            return "";
        }
    }




    // get all products
    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();

        List<ProductResponse> productResponse = products.stream()
                .map(product -> new ProductResponse(product.getId(), product.getName(), encodeBase64(product.getDat()), product.getPric()))
                .collect(Collectors.toList());

        return productResponse;
    }




}


