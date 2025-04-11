package com.guisebastiao.easycart_api.controllers;

import com.guisebastiao.easycart_api.dtos.ItemDTO;
import com.guisebastiao.easycart_api.dtos.ResponseEntityDTO;
import com.guisebastiao.easycart_api.services.ItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/items")
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    public ResponseEntity<ResponseEntityDTO> create(@RequestBody @Valid ItemDTO dto) {
        ResponseEntityDTO response = this.itemService.create(dto);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @GetMapping
    public ResponseEntity<ResponseEntityDTO> findAll(@RequestParam(defaultValue = "0") int offset, @RequestParam(defaultValue = "20") int limit) {
        ResponseEntityDTO response = this.itemService.findAll(offset, limit);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PutMapping("{id}")
    public ResponseEntity<ResponseEntityDTO> update(@PathVariable String id, @RequestBody @Valid ItemDTO dto) {
        ResponseEntityDTO response = this.itemService.update(id, dto);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ResponseEntityDTO> delete(@PathVariable String id) {
        ResponseEntityDTO response = this.itemService.delete(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
