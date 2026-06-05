import { useEffect, useState } from 'react'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Camera } from '@/types/camera'
import type { LucideIcon } from 'lucide-react'
import {
  Camera as CameraIcon, Box, Aperture, ZoomIn, Sun, Focus,
  Zap, Monitor, Film, Battery, Wifi, Sliders, Star,
} from 'lucide-react'

interface Props {
  camera: Camera | null
  open: boolean
  onClose: () => void
  onSave: (camera: Camera) => void
  isSaving?: boolean
}

// ── Field ───────────────────────────────────────────────────────────────────

function Field({
  label, value, onChange, wide,
}: {
  label: string
  value?: string | number | null
  onChange: (v: string) => void
  wide?: boolean
}) {
  return (
    <div className={wide ? 'col-span-2' : undefined}>
      <Label className="text-[11px] font-medium text-muted-foreground/80 uppercase tracking-wide mb-1.5 block">
        {label}
      </Label>
      <Input
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 text-sm bg-muted/30 border-border/60 hover:border-border focus-visible:bg-background transition-colors"
      />
    </div>
  )
}

// ── Section header ───────────────────────────────────────────────────────────

function Section({ title, icon: Icon }: { title: string; icon: LucideIcon }) {
  return (
    <div className="col-span-2 flex items-center gap-2 pt-3 pb-0.5">
      <div className="flex items-center justify-center w-5 h-5 rounded bg-primary/10 shrink-0">
        <Icon className="h-3 w-3 text-primary" />
      </div>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

// ── Dialog ───────────────────────────────────────────────────────────────────

export function CameraEditDialog({ camera, open, onClose, onSave, isSaving }: Props) {
  const [form, setForm] = useState<Camera | null>(null)

  useEffect(() => { setForm(camera ? { ...camera } : null) }, [camera])

  if (!form) return null

  const s = (field: keyof Camera) => (v: string) =>
    setForm((p) => p ? { ...p, [field]: v || undefined } : p)

  const n = (field: keyof Camera) => (v: string) =>
    setForm((p) => p ? { ...p, [field]: v ? Number(v) : undefined } : p)

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="w-[25vw] min-w-[420px] max-w-[480px] h-[85vh] max-h-[700px] overflow-hidden flex flex-col gap-0 p-0"
      >
        {/* ── Header ── */}
        <DialogHeader className="shrink-0 px-5 py-4 bg-muted/40 border-b">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <CameraIcon className="h-4.5 w-4.5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-sm font-semibold leading-snug truncate">
                {form.name || 'New Camera'}
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">{form.productCode || 'unsaved'}</p>
            </div>
            {form.award && (
              <span className="shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
                {form.award}
              </span>
            )}
          </div>
        </DialogHeader>

        {/* ── Scrollable body ── */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">

            <Section title="Identification" icon={CameraIcon} />
            <Field label="Name" value={form.name} onChange={s('name')} wide />
            <Field label="Award" value={form.award} onChange={s('award')} />
            <Field label="Review Score" value={form.reviewScore} onChange={n('reviewScore')} />
            <Field label="MSRP" value={form.msrp} onChange={s('msrp')} />
            <Field label="Announced" value={form.announced} onChange={s('announced')} />

            <Section title="Body" icon={Box} />
            <Field label="Body Type" value={form.bodyType} onChange={s('bodyType')} />
            <Field label="Body Material" value={form.bodyMaterial} onChange={s('bodyMaterial')} />
            <Field label="Dimensions" value={form.dimensions} onChange={s('dimensions')} />
            <Field label="Weight" value={form.weightIncBatteries} onChange={s('weightIncBatteries')} />
            <Field label="Durability" value={form.durability} onChange={s('durability')} />
            <Field label="Environmentally Sealed" value={form.environmentallySealed} onChange={s('environmentallySealed')} />
            <Field label="Processor" value={form.processor} onChange={s('processor')} />

            <Section title="Sensor" icon={Aperture} />
            <Field label="Sensor Type" value={form.sensorType} onChange={s('sensorType')} />
            <Field label="Sensor Size" value={form.sensorSize} onChange={s('sensorSize')} />
            <Field label="Effective Pixels" value={form.effectivePixels} onChange={s('effectivePixels')} />
            <Field label="Photo Detectors" value={form.sensorPhotoDetectors} onChange={s('sensorPhotoDetectors')} />
            <Field label="Max Resolution" value={form.maxResolution} onChange={s('maxResolution')} />
            <Field label="ISO" value={form.iso} onChange={s('iso')} />
            <Field label="Boosted ISO Max" value={form.boostedIsoMaximum} onChange={s('boostedIsoMaximum')} />
            <Field label="Boosted ISO Min" value={form.boostedIsoMinimum} onChange={s('boostedIsoMinimum')} />
            <Field label="Image Stabilization" value={form.imageStabilization} onChange={s('imageStabilization')} />
            <Field label="Color Space" value={form.colorSpace} onChange={s('colorSpace')} />
            <Field label="Color Filter Array" value={form.colorFilterArray} onChange={s('colorFilterArray')} />

            <Section title="Lens" icon={ZoomIn} />
            <Field label="Focal Length (equiv)" value={form.focalLengthEquiv} onChange={s('focalLengthEquiv')} />
            <Field label="Focal Length Multiplier" value={form.focalLengthMultiplier} onChange={s('focalLengthMultiplier')} />
            <Field label="Optical Zoom" value={form.opticalZoom} onChange={s('opticalZoom')} />
            <Field label="Digital Zoom" value={form.digitalZoom} onChange={s('digitalZoom')} />
            <Field label="Maximum Aperture" value={form.maximumAperture} onChange={s('maximumAperture')} />
            <Field label="Lens Mount" value={form.lensMount} onChange={s('lensMount')} />

            <Section title="Exposure" icon={Sun} />
            <Field label="Aperture Priority" value={form.aperturePriority} onChange={s('aperturePriority')} />
            <Field label="Shutter Priority" value={form.shutterPriority} onChange={s('shutterPriority')} />
            <Field label="Manual Exposure" value={form.manualExposureMode} onChange={s('manualExposureMode')} />
            <Field label="Exposure Compensation" value={form.exposureCompensation} onChange={s('exposureCompensation')} />
            <Field label="Max Shutter Speed" value={form.maximumShutterSpeed} onChange={s('maximumShutterSpeed')} />
            <Field label="Min Shutter Speed" value={form.minimumShutterSpeed} onChange={s('minimumShutterSpeed')} />
            <Field label="Continuous Drive" value={form.continuousDrive} onChange={s('continuousDrive')} />
            <Field label="Metering Modes" value={form.meteringModes} onChange={s('meteringModes')} wide />

            <Section title="Focus" icon={Focus} />
            <Field label="Manual Focus" value={form.manualFocus} onChange={s('manualFocus')} />
            <Field label="Focus Points" value={form.numberOfFocusPoints} onChange={s('numberOfFocusPoints')} />
            <Field label="Normal Focus Range" value={form.normalFocusRange} onChange={s('normalFocusRange')} />
            <Field label="Macro Focus Range" value={form.macroFocusRange} onChange={s('macroFocusRange')} />
            <Field label="Autofocus Modes" value={form.autofocus} onChange={s('autofocus')} wide />

            <Section title="Flash" icon={Zap} />
            <Field label="Built-in Flash" value={form.builtInFlash} onChange={s('builtInFlash')} />
            <Field label="External Flash" value={form.externalFlash} onChange={s('externalFlash')} />
            <Field label="Flash Range" value={form.flashRange} onChange={s('flashRange')} />
            <Field label="Flash Modes" value={form.flashModes} onChange={s('flashModes')} wide />

            <Section title="Screen & Viewfinder" icon={Monitor} />
            <Field label="Screen Size" value={form.screenSize} onChange={s('screenSize')} />
            <Field label="Screen Dots" value={form.screenDots} onChange={s('screenDots')} />
            <Field label="Screen Type" value={form.screenType} onChange={s('screenType')} />
            <Field label="Touch Screen" value={form.touchScreen} onChange={s('touchScreen')} />
            <Field label="Articulated LCD" value={form.articulatedLcd} onChange={s('articulatedLcd')} />
            <Field label="Viewfinder Type" value={form.viewfinderType} onChange={s('viewfinderType')} />
            <Field label="Viewfinder Coverage" value={form.viewfinderCoverage} onChange={s('viewfinderCoverage')} />
            <Field label="Viewfinder Magnification" value={form.viewfinderMagnification} onChange={s('viewfinderMagnification')} />
            <Field label="Viewfinder Resolution" value={form.viewfinderResolution} onChange={s('viewfinderResolution')} />

            <Section title="Image & Video" icon={Film} />
            <Field label="Image Ratio" value={form.imageRatioWh} onChange={s('imageRatioWh')} />
            <Field label="JPEG Quality Levels" value={form.jpegQualityLevels} onChange={s('jpegQualityLevels')} />
            <Field label="Uncompressed Format" value={form.uncompressedFormat} onChange={s('uncompressedFormat')} />
            <Field label="Video Format" value={form.videoFormat} onChange={s('videoFormat')} />
            <Field label="Live View" value={form.liveView} onChange={s('liveView')} />
            <Field label="Timelapse Recording" value={form.timelapseRecording} onChange={s('timelapseRecording')} />
            <Field label="Resolutions" value={form.resolutions} onChange={s('resolutions')} wide />
            <Field label="Other Resolutions" value={form.otherResolutions} onChange={s('otherResolutions')} wide />

            <Section title="Battery & Storage" icon={Battery} />
            <Field label="Battery" value={form.battery} onChange={s('battery')} />
            <Field label="Battery Life (CIPA)" value={form.batteryLifeCipa} onChange={s('batteryLifeCipa')} />
            <Field label="Battery Description" value={form.batteryDescription} onChange={s('batteryDescription')} wide />
            <Field label="Storage Types" value={form.storageTypes} onChange={s('storageTypes')} wide />
            <Field label="Storage Included" value={form.storageIncluded} onChange={s('storageIncluded')} />

            <Section title="Connectivity" icon={Wifi} />
            <Field label="USB" value={form.usb} onChange={s('usb')} />
            <Field label="USB Charging" value={form.usbCharging} onChange={s('usbCharging')} />
            <Field label="HDMI" value={form.hdmi} onChange={s('hdmi')} />
            <Field label="Wireless" value={form.wireless} onChange={s('wireless')} />
            <Field label="GPS" value={form.gps} onChange={s('gps')} />
            <Field label="Headphone Port" value={form.headphonePort} onChange={s('headphonePort')} />
            <Field label="Microphone Port" value={form.microphonePort} onChange={s('microphonePort')} />
            <Field label="Microphone" value={form.microphone} onChange={s('microphone')} />
            <Field label="Speaker" value={form.speaker} onChange={s('speaker')} />
            <Field label="Wireless Notes" value={form.wirelessNotes} onChange={s('wirelessNotes')} wide />

            <Section title="Other" icon={Sliders} />
            <Field label="Self Timer" value={form.selfTimer} onChange={s('selfTimer')} />
            <Field label="Remote Control" value={form.remoteControl} onChange={s('remoteControl')} />
            <Field label="Orientation Sensor" value={form.orientationSensor} onChange={s('orientationSensor')} />
            <Field label="Subject Scene Modes" value={form.subjectSceneModes} onChange={s('subjectSceneModes')} />
            <Field label="Custom White Balance" value={form.customWhiteBalance} onChange={s('customWhiteBalance')} />
            <Field label="White Balance Presets" value={form.whiteBalancePresets} onChange={s('whiteBalancePresets')} />
            <Field label="WB Bracketing" value={form.wbBracketing} onChange={s('wbBracketing')} />

            <Section title="Review" icon={Star} />
            <Field label="Executive Summary" value={form.executiveSummary} onChange={s('executiveSummary')} wide />
            <Field label="Good For" value={form.reviewGoodFor} onChange={s('reviewGoodFor')} wide />
            <Field label="Not Good For" value={form.reviewNotGoodFor} onChange={s('reviewNotGoodFor')} wide />
            <Field label="Conclusion" value={form.reviewConclusion} onChange={s('reviewConclusion')} wide />

          </div>
        </div>

        {/* ── Footer ── */}
        <DialogFooter className="shrink-0 px-5 py-3.5 bg-muted/30 border-t flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">Click Save to apply changes</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose} disabled={isSaving}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => onSave(form)} disabled={isSaving}>
              {isSaving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
