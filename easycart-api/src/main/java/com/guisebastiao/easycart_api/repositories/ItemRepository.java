package com.guisebastiao.easycart_api.repositories;

import com.guisebastiao.easycart_api.models.Item;
import com.guisebastiao.easycart_api.models.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID> {
    Page<Item> findByUser(User user, Pageable pageable);
}
