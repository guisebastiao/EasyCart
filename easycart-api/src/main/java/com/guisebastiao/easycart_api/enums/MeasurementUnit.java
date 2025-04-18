package com.guisebastiao.easycart_api.enums;

import lombok.Getter;

@Getter
public enum MeasurementUnit {
    KG,
    G,
    L,
    ML,
    UN;


    public static MeasurementUnit fromString(String value) {
        return MeasurementUnit.valueOf(value.toUpperCase());
    }
}
