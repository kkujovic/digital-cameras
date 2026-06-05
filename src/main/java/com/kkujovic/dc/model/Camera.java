package com.kkujovic.dc.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "camera")
@Getter
@Setter
@NoArgsConstructor
public class Camera {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String productCode;

    private String name;
    private String award;
    private Integer reviewScore;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String url;

    @Column(columnDefinition = "TEXT")
    private String dprReviewArchiveUrl;

    // Review
    @Column(columnDefinition = "TEXT")
    private String executiveSummary;

    @Column(columnDefinition = "TEXT")
    private String reviewGoodFor;

    @Column(columnDefinition = "TEXT")
    private String reviewNotGoodFor;

    @Column(columnDefinition = "TEXT")
    private String reviewConclusion;

    // Body
    private String announced;
    private String bodyType;
    private String bodyMaterial;
    private String durability;
    private String dimensions;
    private String weightIncBatteries;
    private String environmentallySealed;
    private String processor;

    @Column(columnDefinition = "TEXT")
    private String msrp;

    // Sensor
    private String sensorType;
    private String sensorSize;
    private String effectivePixels;
    private String sensorPhotoDetectors;
    private String maxResolution;
    private String colorSpace;
    private String colorFilterArray;

    // Lens
    private String focalLengthEquiv;
    private String focalLengthMultiplier;
    private String opticalZoom;
    private String digitalZoom;
    private String maximumAperture;
    private String lensMount;

    // Exposure
    private String iso;
    private String boostedIsoMaximum;
    private String boostedIsoMinimum;
    private String aperturePriority;
    private String shutterPriority;
    private String manualExposureMode;
    private String exposureCompensation;
    private String continuousDrive;
    private String maximumShutterSpeed;
    private String minimumShutterSpeed;

    // Focus
    private String manualFocus;

    @Column(columnDefinition = "TEXT")
    private String autofocus;

    private String normalFocusRange;
    private String macroFocusRange;
    private String numberOfFocusPoints;

    // Flash
    private String builtInFlash;
    private String externalFlash;

    @Column(columnDefinition = "TEXT")
    private String flashModes;

    private String flashRange;

    // Metering
    @Column(columnDefinition = "TEXT")
    private String meteringModes;

    // Image
    private String imageStabilization;
    private String imageRatioWh;
    private String jpegQualityLevels;
    private String uncompressedFormat;

    @Column(columnDefinition = "TEXT")
    private String otherResolutions;

    // Screen / Viewfinder
    private String screenSize;
    private String screenDots;
    private String screenType;
    private String touchScreen;
    private String articulatedLcd;
    private String viewfinderType;
    private String viewfinderCoverage;
    private String viewfinderMagnification;
    private String viewfinderResolution;

    // Video
    private String videoFormat;

    @Column(columnDefinition = "TEXT")
    private String resolutions;

    private String liveView;
    private String timelapseRecording;

    // Storage / Connectivity
    private String battery;

    @Column(columnDefinition = "TEXT")
    private String batteryDescription;

    private String batteryLifeCipa;

    @Column(columnDefinition = "TEXT")
    private String storageTypes;

    private String storageIncluded;
    private String usb;
    private String usbCharging;
    private String hdmi;
    private String headphonePort;
    private String microphonePort;
    private String wireless;

    @Column(columnDefinition = "TEXT")
    private String wirelessNotes;

    private String gps;
    private String microphone;
    private String speaker;

    // Misc
    private String selfTimer;
    private String subjectSceneModes;
    private String remoteControl;
    private String orientationSensor;
    private String customWhiteBalance;
    private String whiteBalancePresets;
    private String wbBracketing;
}
