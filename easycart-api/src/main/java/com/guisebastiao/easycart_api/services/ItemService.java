package com.guisebastiao.easycart_api.services;

import com.guisebastiao.easycart_api.dtos.ItemDTO;
import com.guisebastiao.easycart_api.dtos.ItemResponseDTO;
import com.guisebastiao.easycart_api.dtos.PagingDTO;
import com.guisebastiao.easycart_api.dtos.ResponseEntityDTO;
import com.guisebastiao.easycart_api.enums.MeasurementUnit;
import com.guisebastiao.easycart_api.exceptions.EntityNotFoundException;
import com.guisebastiao.easycart_api.models.Item;
import com.guisebastiao.easycart_api.models.User;
import com.guisebastiao.easycart_api.repositories.ItemRepository;
import com.guisebastiao.easycart_api.security.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final AuthUtil authUtil;

    public ResponseEntityDTO create(ItemDTO dto) {
        Item item = new Item();
        item.setUser(this.authUtil.getAuthenticatedUser());
        item.setContent(dto.getContent());
        item.setQuantity(dto.getQuantity());
        item.setMeasurementUnit(MeasurementUnit.fromString(dto.getMeasurementUnit()));

        this.itemRepository.save(item);

        ResponseEntityDTO response = new ResponseEntityDTO();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("Item created successfully");
        response.setSuccess(true);

        return response;
    }

    public ResponseEntityDTO findAll(int offset, int limit) {
        User user = this.authUtil.getAuthenticatedUser();

        Pageable pageable = PageRequest.of(offset, limit, Sort.by(Sort.Direction.ASC, "complete"));

        Page<Item> resultPage = this.itemRepository.findByUser(user, pageable);

        PagingDTO paging = new PagingDTO();
        paging.setCurrentPage(offset);
        paging.setItemsPerPage(limit);
        paging.setTotalPages(resultPage.getTotalPages());
        paging.setTotalItems(resultPage.getTotalElements());

        List<ItemResponseDTO> responseList = resultPage
                .getContent()
                .stream()
                .map(e -> {
                    ItemResponseDTO itemResponseDTO = new ItemResponseDTO();
                    itemResponseDTO.setId(e.getId());
                    itemResponseDTO.setContent(e.getContent());
                    itemResponseDTO.setQuantity(e.getQuantity());
                    itemResponseDTO.setMeasurementUnit(e.getMeasurementUnit());
                    itemResponseDTO.setComplete(e.isComplete());
                    return itemResponseDTO;
                })
                .toList();

        ResponseEntityDTO response = new ResponseEntityDTO();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("Returned items");
        response.setSuccess(true);
        response.setData(responseList);
        response.setPaging(paging);

        return response;
    }

    public ResponseEntityDTO update(String id, @RequestBody ItemDTO dto) {
        Optional<Item> item = this.itemRepository.findById(UUID.fromString(id));

        if (item.isEmpty()) {
           throw new EntityNotFoundException("Item not found");
        }

        Item itemEntity = item.get();
        itemEntity.setId(UUID.fromString(id));
        itemEntity.setUser(this.authUtil.getAuthenticatedUser());
        itemEntity.setContent(dto.getContent());
        itemEntity.setQuantity(dto.getQuantity());
        itemEntity.setMeasurementUnit(MeasurementUnit.fromString(dto.getMeasurementUnit()));
        itemEntity.setComplete(dto.getComplete());

        this.itemRepository.save(itemEntity);

        ResponseEntityDTO response = new ResponseEntityDTO();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("Item updated successfully");
        response.setSuccess(true);
        return response;
    }

    public ResponseEntityDTO delete(String id) {
        Optional<Item> item = this.itemRepository.findById(UUID.fromString(id));

        if (item.isEmpty()) {
            throw new EntityNotFoundException("Item not found");
        }

        this.itemRepository.delete(item.get());

        ResponseEntityDTO response = new ResponseEntityDTO();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("Item deleted successfully");
        response.setSuccess(true);
        return response;
    }
}
