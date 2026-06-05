package com.kkujovic.dc.controller;

import com.kkujovic.dc.model.Camera;
import com.kkujovic.dc.service.CameraService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cameras")
public class CameraController {

    private final CameraService service;

    public CameraController(CameraService service) {
        this.service = service;
    }

    @GetMapping
    public Page<Camera> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "") String search) {
        return service.findAll(PageRequest.of(page, size), search);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Camera create(@RequestBody Camera camera) {
        return service.create(camera);
    }

    @PutMapping("/{id}")
    public Camera update(@PathVariable Long id, @RequestBody Camera camera) {
        return service.update(id, camera);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
