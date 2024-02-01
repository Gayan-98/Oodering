package com.senamsh.productorderservice.service;


import com.senamsh.productorderservice.model.Product;
import com.senamsh.productorderservice.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ProductService {


    private final ProductRepository productRepository;

    public Product saveProduct(Product product){
        return productRepository.save(product);
    }


    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }




    // get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }



}


