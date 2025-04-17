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
    @NotBlank(message = "Digite a descrição do item")
    @Length(max = 100, message = "A descrição não pode ter mais de 100 caracteres")
    private String content;

    @DecimalMin(value = "0.01", message = "A quantidade deve ser maior que zero")
    @Digits(integer = 6, fraction = 2, message = "a quantidade é muito longa")
    @NotNull(message = "Insira a quantidade")
    private BigDecimal quantity;

    @ValueOfEnum(enumClass = MeasurementUnit.class, message = "O valor do tipo do item esta inválido")
    @NotNull(message = "Insira uma unidade de medida")
    private String measurementUnit;

    @NotNull(message = "Por favor indique se o item está completo")
    private Boolean complete;
}
