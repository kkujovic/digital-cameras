package com.kkujovic.dc.loader;

import com.kkujovic.dc.model.Camera;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class CameraYamlMapper {

    public Camera map(Map<String, Object> yaml) {
        Camera camera = new Camera();

        camera.setProductCode(str(yaml, "ProductCode"));
        camera.setName(str(yaml, "Name"));
        camera.setAward(str(yaml, "Award"));
        camera.setReviewScore(integer(yaml, "ReviewScore"));
        camera.setImageUrl(str(yaml, "ImageURL"));
        camera.setUrl(str(yaml, "URL"));
        camera.setDprReviewArchiveUrl(str(yaml, "DPRReviewArchiveURL"));

        Map<String, Object> review = nested(yaml, "ReviewData");
        if (review != null) {
            camera.setExecutiveSummary(str(review, "ExecutiveSummary"));
            Map<String, Object> summary = nested(review, "ReviewSummary");
            if (summary != null) {
                camera.setReviewGoodFor(str(summary, "GoodFor"));
                camera.setReviewNotGoodFor(str(summary, "NotSoGoodFor"));
                camera.setReviewConclusion(str(summary, "Conclusion"));
            }
        }

        Map<String, Object> specs = nested(yaml, "Specs");
        if (specs != null) {
            camera.setAnnounced(str(specs, "Announced"));
            camera.setBodyType(str(specs, "BodyType"));
            camera.setBodyMaterial(str(specs, "BodyMaterial"));
            camera.setDurability(str(specs, "Durability"));
            camera.setDimensions(str(specs, "Dimensions"));
            camera.setWeightIncBatteries(str(specs, "WeightIncBatteries"));
            camera.setEnvironmentallySealed(str(specs, "EnvironmentallySealed"));
            camera.setProcessor(str(specs, "Processor"));
            camera.setMsrp(str(specs, "MSRP"));

            camera.setSensorType(str(specs, "SensorType"));
            camera.setSensorSize(str(specs, "SensorSize"));
            camera.setEffectivePixels(str(specs, "EffectivePixels"));
            camera.setSensorPhotoDetectors(str(specs, "SensorPhotoDetectors"));
            camera.setMaxResolution(str(specs, "MaxResolution"));
            camera.setColorSpace(str(specs, "ColorSpace"));
            camera.setColorFilterArray(str(specs, "ColorFilterArray"));

            camera.setFocalLengthEquiv(str(specs, "FocalLengthEquiv"));
            camera.setFocalLengthMultiplier(str(specs, "FocalLengthMultiplier"));
            camera.setOpticalZoom(str(specs, "OpticalZoom"));
            camera.setDigitalZoom(str(specs, "DigitalZoom"));
            camera.setMaximumAperture(str(specs, "MaximumAperture"));
            camera.setLensMount(str(specs, "LensMount"));

            camera.setIso(str(specs, "ISO"));
            camera.setBoostedIsoMaximum(str(specs, "BoostedISOMaximum"));
            camera.setBoostedIsoMinimum(str(specs, "BoostedISOMinimum"));
            camera.setAperturePriority(str(specs, "AperturePriority"));
            camera.setShutterPriority(str(specs, "ShutterPriority"));
            camera.setManualExposureMode(str(specs, "ManualExposureMode"));
            camera.setExposureCompensation(str(specs, "ExposureCompensation"));
            camera.setContinuousDrive(str(specs, "ContinuousDrive"));
            camera.setMaximumShutterSpeed(str(specs, "MaximumShutterSpeed"));
            camera.setMinimumShutterSpeed(str(specs, "MinimumShutterSpeed"));

            camera.setManualFocus(str(specs, "ManualFocus"));
            camera.setAutofocus(joinList(specs, "Autofocus"));
            camera.setNormalFocusRange(str(specs, "NormalFocusRange"));
            camera.setMacroFocusRange(str(specs, "MacroFocusRange"));
            camera.setNumberOfFocusPoints(str(specs, "NumberOfFocusPoints"));

            camera.setBuiltInFlash(str(specs, "BuiltInFlash"));
            camera.setExternalFlash(str(specs, "ExternalFlash"));
            camera.setFlashModes(str(specs, "FlashModes"));
            camera.setFlashRange(str(specs, "FlashRange"));

            camera.setMeteringModes(joinList(specs, "MeteringModes"));

            camera.setImageStabilization(str(specs, "ImageStabilization"));
            camera.setImageRatioWh(str(specs, "ImageRatioWh"));
            camera.setJpegQualityLevels(str(specs, "JPEGQualityLevels"));
            camera.setUncompressedFormat(str(specs, "UncompressedFormat"));
            camera.setOtherResolutions(str(specs, "OtherResolutions"));

            camera.setScreenSize(str(specs, "ScreenSize"));
            camera.setScreenDots(str(specs, "ScreenDots"));
            camera.setScreenType(str(specs, "ScreenType"));
            camera.setTouchScreen(str(specs, "TouchScreen"));
            camera.setArticulatedLcd(str(specs, "ArticulatedLCD"));
            camera.setViewfinderType(str(specs, "ViewfinderType"));
            camera.setViewfinderCoverage(str(specs, "ViewfinderCoverage"));
            camera.setViewfinderMagnification(str(specs, "ViewfinderMagnification"));
            camera.setViewfinderResolution(str(specs, "ViewfinderResolution"));

            camera.setVideoFormat(str(specs, "Format"));
            camera.setResolutions(str(specs, "Resolutions"));
            camera.setLiveView(str(specs, "LiveView"));
            camera.setTimelapseRecording(str(specs, "TimelapseRecording"));

            camera.setBattery(str(specs, "Battery"));
            camera.setBatteryDescription(str(specs, "BatteryDescription"));
            camera.setBatteryLifeCipa(str(specs, "BatteryLifeCIPA"));
            camera.setStorageTypes(str(specs, "StorageTypes"));
            camera.setStorageIncluded(str(specs, "StorageIncluded"));
            camera.setUsb(str(specs, "USB"));
            camera.setUsbCharging(str(specs, "USBCharging"));
            camera.setHdmi(str(specs, "HDMI"));
            camera.setHeadphonePort(str(specs, "HeadphonePort"));
            camera.setMicrophonePort(str(specs, "MicrophonePort"));
            camera.setWireless(str(specs, "Wireless"));
            camera.setWirelessNotes(str(specs, "WirelessNotes"));
            camera.setGps(str(specs, "GPS"));
            camera.setMicrophone(str(specs, "Microphone"));
            camera.setSpeaker(str(specs, "Speaker"));

            camera.setSelfTimer(str(specs, "SelfTimer"));
            camera.setSubjectSceneModes(str(specs, "SubjectSceneModes"));
            camera.setRemoteControl(str(specs, "RemoteControl"));
            camera.setOrientationSensor(str(specs, "OrientationSensor"));
            camera.setCustomWhiteBalance(str(specs, "CustomWhiteBalance"));
            camera.setWhiteBalancePresets(str(specs, "WhiteBalancePresets"));
            camera.setWbBracketing(str(specs, "WBBracketing"));
        }

        return camera;
    }

    private String str(Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val == null) return null;
        String s = val.toString().trim();
        return s.isEmpty() ? null : s;
    }

    @SuppressWarnings("unchecked")
    private String joinList(Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val == null) return null;
        if (val instanceof List<?> list) {
            String joined = list.stream().map(Object::toString).collect(Collectors.joining(", "));
            return joined.isEmpty() ? null : joined;
        }
        String s = val.toString().trim();
        return s.isEmpty() ? null : s;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> nested(Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val instanceof Map<?, ?>) return (Map<String, Object>) val;
        return null;
    }

    private Integer integer(Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val == null) return null;
        if (val instanceof Integer i) return i;
        try {
            return Integer.parseInt(val.toString().trim());
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
