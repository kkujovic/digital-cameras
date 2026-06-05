package com.kkujovic.dc.loader;

import com.kkujovic.dc.model.Camera;
import com.kkujovic.dc.repository.CameraRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.yaml.snakeyaml.LoaderOptions;
import org.yaml.snakeyaml.Yaml;
import org.yaml.snakeyaml.constructor.SafeConstructor;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class CameraLoaderService {

    private static final Logger log = LoggerFactory.getLogger(CameraLoaderService.class);
    private static final int BATCH_SIZE = 100;

    private final CameraRepository repository;
    private final CameraYamlMapper mapper;

    public CameraLoaderService(CameraRepository repository, CameraYamlMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional
    public LoadResult load() throws Exception {
        var resolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = resolver.getResources("classpath:cameras/*.yaml");

        Set<String> existing = repository.findAllProductCodes();
        log.info("Found {} cameras already in DB, {} YAML files to process", existing.size(), resources.length);

        var loaderOptions = new LoaderOptions();
        loaderOptions.setCodePointLimit(10 * 1024 * 1024);
        Yaml yaml = new Yaml(new SafeConstructor(loaderOptions));

        List<Camera> batch = new ArrayList<>(BATCH_SIZE);
        int loaded = 0;
        int skipped = 0;

        for (Resource resource : resources) {
            try (InputStream is = resource.getInputStream()) {
                @SuppressWarnings("unchecked")
                Map<String, Object> data = yaml.load(is);
                Camera camera = mapper.map(data);

                if (camera.getProductCode() == null) {
                    skipped++;
                    continue;
                }
                if (existing.contains(camera.getProductCode())) {
                    continue;
                }

                batch.add(camera);
                if (batch.size() == BATCH_SIZE) {
                    repository.saveAll(batch);
                    loaded += batch.size();
                    batch.clear();
                }
            } catch (Exception e) {
                log.warn("Skipping {} — {}", resource.getFilename(), e.getMessage());
                skipped++;
            }
        }

        if (!batch.isEmpty()) {
            repository.saveAll(batch);
            loaded += batch.size();
        }

        log.info("Camera data load complete: {} inserted, {} skipped", loaded, skipped);
        return new LoadResult(loaded, skipped);
    }

    public record LoadResult(int inserted, int skipped) {}
}
