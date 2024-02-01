package com.senamsh.productorderservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class ProductOrderServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductOrderServiceApplication.class, args);
	}

}
