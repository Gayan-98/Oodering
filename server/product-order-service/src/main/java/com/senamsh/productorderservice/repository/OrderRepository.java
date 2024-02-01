package com.senamsh.productorderservice.repository;



import com.senamsh.productorderservice.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

}