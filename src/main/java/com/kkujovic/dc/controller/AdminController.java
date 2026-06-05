package com.kkujovic.dc.controller;

import com.kkujovic.dc.loader.CameraLoaderService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final CameraLoaderService loaderService;
    private final String adminApiKey;

    public AdminController(CameraLoaderService loaderService,
                           @Value("${ADMIN_API_KEY}") String adminApiKey) {
        this.loaderService = loaderService;
        this.adminApiKey = adminApiKey;
    }

    @PostMapping("/load-cameras")
    public ResponseEntity<Map<String, Integer>> loadCameras(
            @RequestHeader(value = "X-Admin-Key", required = false) String key) throws Exception {
        if (!adminApiKey.equals(key)) {
            return ResponseEntity.status(403).build();
        }
        var result = loaderService.load();
        return ResponseEntity.ok(Map.of("inserted", result.inserted(), "skipped", result.skipped()));
    }
}
