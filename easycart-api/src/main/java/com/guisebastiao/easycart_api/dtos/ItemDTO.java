package com.guisebastiao.easycart_api.dtos;

import com.guisebastiao.easycart_api.enums.MeasurementUnit;
import com.guisebastiao.easycart_api.enums.ValueOfEnum;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.math.BigDecimal;

@Getter
@Setter
public class ItemDTO {
    @NotBlank(message = "Please enter content")
    @Length(max = 100, message = "The content can´t have more than 100 characters")
    private String content;

    @DecimalMin(value = "0.01", message = "Quantity must be greater than zero")
    @Digits(integer = 6, fraction = 2, message = "quantity is too long")
    @NotNull(message = "Please enter quantity")
    private BigDecimal quantity;

    @ValueOfEnum(enumClass = MeasurementUnit.class, message = "The item type value is invalid")
    @NotNull(message = "Please enter measurement unit")
    private String measurementUnit;

    @NotNull(message = "Please indicate if the item is complete")
    private Boolean complete;
}
