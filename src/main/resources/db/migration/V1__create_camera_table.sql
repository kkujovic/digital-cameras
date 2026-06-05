CREATE TABLE camera (
    id                      BIGSERIAL PRIMARY KEY,
    product_code            VARCHAR(255) NOT NULL UNIQUE,
    name                    VARCHAR(255),
    award                   VARCHAR(255),
    review_score            INTEGER,
    image_url               TEXT,
    url                     TEXT,
    dpr_review_archive_url  TEXT,

    -- Review
    executive_summary       TEXT,
    review_good_for         TEXT,
    review_not_good_for     TEXT,
    review_conclusion       TEXT,

    -- Body
    announced               VARCHAR(255),
    body_type               VARCHAR(255),
    body_material           VARCHAR(255),
    durability              VARCHAR(255),
    dimensions              VARCHAR(255),
    weight_inc_batteries    VARCHAR(255),
    environmentally_sealed  VARCHAR(255),
    processor               VARCHAR(255),
    msrp                    TEXT,

    -- Sensor
    sensor_type             VARCHAR(255),
    sensor_size             VARCHAR(255),
    effective_pixels        VARCHAR(255),
    sensor_photo_detectors  VARCHAR(255),
    max_resolution          VARCHAR(255),
    color_space             VARCHAR(255),
    color_filter_array      VARCHAR(255),

    -- Lens
    focal_length_equiv      VARCHAR(255),
    focal_length_multiplier VARCHAR(255),
    optical_zoom            VARCHAR(255),
    digital_zoom            VARCHAR(255),
    maximum_aperture        VARCHAR(255),
    lens_mount              VARCHAR(255),

    -- Exposure
    iso                     VARCHAR(255),
    boosted_iso_maximum     VARCHAR(255),
    boosted_iso_minimum     VARCHAR(255),
    aperture_priority       VARCHAR(255),
    shutter_priority        VARCHAR(255),
    manual_exposure_mode    VARCHAR(255),
    exposure_compensation   VARCHAR(255),
    continuous_drive        VARCHAR(255),
    maximum_shutter_speed   VARCHAR(255),
    minimum_shutter_speed   VARCHAR(255),

    -- Focus
    manual_focus            VARCHAR(255),
    autofocus               TEXT,
    normal_focus_range      VARCHAR(255),
    macro_focus_range       VARCHAR(255),
    number_of_focus_points  VARCHAR(255),

    -- Flash
    built_in_flash          VARCHAR(255),
    external_flash          VARCHAR(255),
    flash_modes             TEXT,
    flash_range             VARCHAR(255),

    -- Metering
    metering_modes          TEXT,

    -- Image
    image_stabilization     VARCHAR(255),
    image_ratio_wh          VARCHAR(255),
    jpeg_quality_levels     VARCHAR(255),
    uncompressed_format     VARCHAR(255),
    other_resolutions       TEXT,

    -- Screen / Viewfinder
    screen_size             VARCHAR(255),
    screen_dots             VARCHAR(255),
    screen_type             VARCHAR(255),
    touch_screen            VARCHAR(255),
    articulated_lcd         VARCHAR(255),
    viewfinder_type         VARCHAR(255),
    viewfinder_coverage     VARCHAR(255),
    viewfinder_magnification VARCHAR(255),
    viewfinder_resolution   VARCHAR(255),

    -- Video
    video_format            VARCHAR(255),
    resolutions             TEXT,
    live_view               VARCHAR(255),
    timelapse_recording     VARCHAR(255),

    -- Storage / Connectivity
    battery                 VARCHAR(255),
    battery_description     TEXT,
    battery_life_cipa       VARCHAR(255),
    storage_types           TEXT,
    storage_included        VARCHAR(255),
    usb                     VARCHAR(255),
    usb_charging            VARCHAR(255),
    hdmi                    VARCHAR(255),
    headphone_port          VARCHAR(255),
    microphone_port         VARCHAR(255),
    wireless                VARCHAR(255),
    wireless_notes          TEXT,
    gps                     VARCHAR(255),
    microphone              VARCHAR(255),
    speaker                 VARCHAR(255),

    -- Misc
    self_timer              VARCHAR(255),
    subject_scene_modes     VARCHAR(255),
    remote_control          VARCHAR(255),
    orientation_sensor      VARCHAR(255),
    custom_white_balance    VARCHAR(255),
    white_balance_presets   VARCHAR(255),
    wb_bracketing           VARCHAR(255)
);
