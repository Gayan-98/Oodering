package com.senamsh.productorderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ProductResponse {
    private Long id;
    private String name;
    private String dat; // Base64-encoded image
    private int pric;

    // constructor, getters, setters...
}
