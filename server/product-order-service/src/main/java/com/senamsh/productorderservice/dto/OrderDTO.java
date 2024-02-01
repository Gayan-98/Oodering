package com.senamsh.productorderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class OrderDTO {
    private List<OrderItemDTO> orderItems;
    private String orderNumber;
}
