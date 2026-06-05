package com.kkujovic.dc.service;

import com.kkujovic.dc.model.Camera;
import com.kkujovic.dc.repository.CameraRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CameraService {

    private final CameraRepository repository;

    public CameraService(CameraRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public Page<Camera> findAll(Pageable pageable, String search) {
        if (search != null && !search.isBlank()) {
            return repository.findByNameContainingIgnoreCase(search.trim(), pageable);
        }
        return repository.findAll(pageable);
    }

    @Transactional
    public Camera create(Camera camera) {
        return repository.save(camera);
    }

    @Transactional
    public Camera update(Long id, Camera updated) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Camera not found: " + id);
        }
        updated.setId(id);
        return repository.save(updated);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
