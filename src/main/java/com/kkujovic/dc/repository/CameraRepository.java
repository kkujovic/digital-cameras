package com.kkujovic.dc.repository;

import com.kkujovic.dc.model.Camera;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface CameraRepository extends JpaRepository<Camera, Long> {
    boolean existsByProductCode(String productCode);

    @Query("SELECT c.productCode FROM Camera c")
    Set<String> findAllProductCodes();

    Page<Camera> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
