import { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import type { Camera } from '@/types/camera'

interface Props {
  camera: Camera | null
  open: boolean
  onClose: () => void
  onSave: (camera: Camera) => void
  isSaving?: boolean
}

function Field({ label, value, onChange }: { label: string; value?: string | number | null; onChange: (v: string) => void }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 text-sm"
      />
    </div>
  )
}

function Section({ title }: { title: string }) {
  return (
    <div className="pt-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{title}</p>
      <Separator className="mb-4" />
    </div>
  )
}

export function CameraEditSheet({ camera, open, onClose, onSave, isSaving }: Props) {
  const [form, setForm] = useState<Camera | null>(null)

  useEffect(() => {
    setForm(camera ? { ...camera } : null)
  }, [camera])

  if (!form) return null

  const set = (field: keyof Camera) => (v: string) =>
    setForm((prev) => prev ? { ...prev, [field]: v || undefined } : prev)

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-[480px] sm:w-[540px] sm:max-w-none flex flex-col gap-0 p-0">
        <SheetHeader className="px-6 py-5 border-b">
          <SheetTitle className="text-base">{form.name}</SheetTitle>
          <p className="text-xs text-muted-foreground">{form.productCode}</p>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="py-5 grid gap-4">

            <Section title="Identification" />
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Field label="Name" value={form.name} onChange={set('name')} />
              </div>
              <Field label="Award" value={form.award} onChange={set('award')} />
              <Field label="Review Score" value={form.reviewScore} onChange={(v) => setForm(p => p ? { ...p, reviewScore: v ? Number(v) : undefined } : p)} />
              <Field label="MSRP" value={form.msrp} onChange={set('msrp')} />
              <Field label="Announced" value={form.announced} onChange={set('announced')} />
            </div>

            <Section title="Body" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Body Type" value={form.bodyType} onChange={set('bodyType')} />
              <Field label="Body Material" value={form.bodyMaterial} onChange={set('bodyMaterial')} />
              <Field label="Dimensions" value={form.dimensions} onChange={set('dimensions')} />
              <Field label="Weight" value={form.weightIncBatteries} onChange={set('weightIncBatteries')} />
              <Field label="Durability" value={form.durability} onChange={set('durability')} />
              <Field label="Environmentally Sealed" value={form.environmentallySealed} onChange={set('environmentallySealed')} />
              <Field label="Processor" value={form.processor} onChange={set('processor')} />
            </div>

            <Section title="Sensor" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Sensor Type" value={form.sensorType} onChange={set('sensorType')} />
              <Field label="Sensor Size" value={form.sensorSize} onChange={set('sensorSize')} />
              <Field label="Effective Pixels" value={form.effectivePixels} onChange={set('effectivePixels')} />
              <Field label="Photo Detectors" value={form.sensorPhotoDetectors} onChange={set('sensorPhotoDetectors')} />
              <Field label="Max Resolution" value={form.maxResolution} onChange={set('maxResolution')} />
              <Field label="Image Stabilization" value={form.imageStabilization} onChange={set('imageStabilization')} />
              <Field label="Color Space" value={form.colorSpace} onChange={set('colorSpace')} />
              <Field label="ISO" value={form.iso} onChange={set('iso')} />
            </div>

            <Section title="Lens" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Focal Length (equiv)" value={form.focalLengthEquiv} onChange={set('focalLengthEquiv')} />
              <Field label="Focal Length Multiplier" value={form.focalLengthMultiplier} onChange={set('focalLengthMultiplier')} />
              <Field label="Optical Zoom" value={form.opticalZoom} onChange={set('opticalZoom')} />
              <Field label="Digital Zoom" value={form.digitalZoom} onChange={set('digitalZoom')} />
              <Field label="Max Aperture" value={form.maximumAperture} onChange={set('maximumAperture')} />
              <Field label="Lens Mount" value={form.lensMount} onChange={set('lensMount')} />
            </div>

            <Section title="Exposure & Focus" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Aperture Priority" value={form.aperturePriority} onChange={set('aperturePriority')} />
              <Field label="Shutter Priority" value={form.shutterPriority} onChange={set('shutterPriority')} />
              <Field label="Manual Exposure" value={form.manualExposureMode} onChange={set('manualExposureMode')} />
              <Field label="Manual Focus" value={form.manualFocus} onChange={set('manualFocus')} />
              <Field label="Max Shutter Speed" value={form.maximumShutterSpeed} onChange={set('maximumShutterSpeed')} />
              <Field label="Min Shutter Speed" value={form.minimumShutterSpeed} onChange={set('minimumShutterSpeed')} />
              <Field label="Continuous Drive" value={form.continuousDrive} onChange={set('continuousDrive')} />
              <Field label="Focus Points" value={form.numberOfFocusPoints} onChange={set('numberOfFocusPoints')} />
              <div className="col-span-2">
                <Field label="Autofocus" value={form.autofocus} onChange={set('autofocus')} />
              </div>
              <div className="col-span-2">
                <Field label="Metering Modes" value={form.meteringModes} onChange={set('meteringModes')} />
              </div>
            </div>

            <Section title="Screen & Viewfinder" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Screen Size" value={form.screenSize} onChange={set('screenSize')} />
              <Field label="Screen Dots" value={form.screenDots} onChange={set('screenDots')} />
              <Field label="Screen Type" value={form.screenType} onChange={set('screenType')} />
              <Field label="Touch Screen" value={form.touchScreen} onChange={set('touchScreen')} />
              <Field label="Articulated LCD" value={form.articulatedLcd} onChange={set('articulatedLcd')} />
              <Field label="Viewfinder Type" value={form.viewfinderType} onChange={set('viewfinderType')} />
              <Field label="Viewfinder Coverage" value={form.viewfinderCoverage} onChange={set('viewfinderCoverage')} />
              <Field label="Viewfinder Magnification" value={form.viewfinderMagnification} onChange={set('viewfinderMagnification')} />
            </div>

            <Section title="Flash" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Built-in Flash" value={form.builtInFlash} onChange={set('builtInFlash')} />
              <Field label="External Flash" value={form.externalFlash} onChange={set('externalFlash')} />
              <Field label="Flash Range" value={form.flashRange} onChange={set('flashRange')} />
              <div className="col-span-2">
                <Field label="Flash Modes" value={form.flashModes} onChange={set('flashModes')} />
              </div>
            </div>

            <Section title="Storage & Connectivity" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Battery" value={form.battery} onChange={set('battery')} />
              <Field label="Battery Life (CIPA)" value={form.batteryLifeCipa} onChange={set('batteryLifeCipa')} />
              <div className="col-span-2">
                <Field label="Battery Description" value={form.batteryDescription} onChange={set('batteryDescription')} />
              </div>
              <div className="col-span-2">
                <Field label="Storage Types" value={form.storageTypes} onChange={set('storageTypes')} />
              </div>
              <Field label="Storage Included" value={form.storageIncluded} onChange={set('storageIncluded')} />
              <Field label="USB" value={form.usb} onChange={set('usb')} />
              <Field label="HDMI" value={form.hdmi} onChange={set('hdmi')} />
              <Field label="Wireless" value={form.wireless} onChange={set('wireless')} />
              <Field label="GPS" value={form.gps} onChange={set('gps')} />
              <Field label="Microphone" value={form.microphone} onChange={set('microphone')} />
              <Field label="Speaker" value={form.speaker} onChange={set('speaker')} />
              <Field label="Headphone Port" value={form.headphonePort} onChange={set('headphonePort')} />
            </div>

          </div>
        </ScrollArea>

        <SheetFooter className="px-6 py-4 border-t gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>Cancel</Button>
          <Button onClick={() => onSave(form)} disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Save changes'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
