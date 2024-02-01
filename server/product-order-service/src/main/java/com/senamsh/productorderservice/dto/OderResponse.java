package com.senamsh.productorderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OderResponse {


    private Long id;
    private String orderNumber;
    private double totalPrice;
    private List<OrderProductResponse> products;

    private  String status;

    private LocalDateTime creationTime;

}
