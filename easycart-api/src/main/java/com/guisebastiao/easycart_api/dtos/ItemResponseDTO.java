package com.guisebastiao.easycart_api.dtos;

import com.guisebastiao.easycart_api.enums.MeasurementUnit;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
public class ItemResponseDTO {
    private UUID id;
    private String content;
    private BigDecimal quantity;
    private MeasurementUnit measurementUnit;
    private Boolean complete;
}
