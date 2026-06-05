package com.kkujovic.dc.loader;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("!prod")
public class CameraDataLoader implements ApplicationRunner {

    private final CameraLoaderService loaderService;

    public CameraDataLoader(CameraLoaderService loaderService) {
        this.loaderService = loaderService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        loaderService.load();
    }
}
