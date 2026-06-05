import type { ColumnDef, Column, VisibilityState } from '@tanstack/react-table'
import { ArrowUpDown, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Camera } from '@/types/camera'

// ── Column groups (used by ColumnPicker) ─────────────────────────────────────

export type ColumnGroup = { label: string; keys: (keyof Camera)[] }

export const COLUMN_GROUPS: ColumnGroup[] = [
  {
    label: 'Identification',
    keys: ['productCode', 'award', 'reviewScore', 'msrp', 'announced'],
  },
  {
    label: 'Body',
    keys: ['bodyType', 'bodyMaterial', 'dimensions', 'weightIncBatteries', 'durability', 'environmentallySealed', 'processor'],
  },
  {
    label: 'Sensor',
    keys: ['sensorType', 'sensorSize', 'effectivePixels', 'sensorPhotoDetectors', 'maxResolution', 'iso', 'boostedIsoMaximum', 'boostedIsoMinimum', 'imageStabilization', 'colorSpace', 'colorFilterArray'],
  },
  {
    label: 'Lens',
    keys: ['focalLengthEquiv', 'focalLengthMultiplier', 'opticalZoom', 'digitalZoom', 'maximumAperture', 'lensMount'],
  },
  {
    label: 'Exposure',
    keys: ['aperturePriority', 'shutterPriority', 'manualExposureMode', 'exposureCompensation', 'continuousDrive', 'maximumShutterSpeed', 'minimumShutterSpeed', 'meteringModes'],
  },
  {
    label: 'Focus',
    keys: ['manualFocus', 'autofocus', 'normalFocusRange', 'macroFocusRange', 'numberOfFocusPoints'],
  },
  {
    label: 'Flash',
    keys: ['builtInFlash', 'externalFlash', 'flashModes', 'flashRange'],
  },
  {
    label: 'Screen & Viewfinder',
    keys: ['screenSize', 'screenDots', 'screenType', 'touchScreen', 'articulatedLcd', 'viewfinderType', 'viewfinderCoverage', 'viewfinderMagnification', 'viewfinderResolution'],
  },
  {
    label: 'Image & Video',
    keys: ['imageRatioWh', 'jpegQualityLevels', 'uncompressedFormat', 'videoFormat', 'liveView', 'timelapseRecording', 'resolutions', 'otherResolutions'],
  },
  {
    label: 'Battery & Storage',
    keys: ['battery', 'batteryDescription', 'batteryLifeCipa', 'storageTypes', 'storageIncluded'],
  },
  {
    label: 'Connectivity',
    keys: ['usb', 'usbCharging', 'hdmi', 'wireless', 'wirelessNotes', 'gps', 'headphonePort', 'microphonePort', 'microphone', 'speaker'],
  },
  {
    label: 'Other',
    keys: ['selfTimer', 'subjectSceneModes', 'remoteControl', 'orientationSensor', 'customWhiteBalance', 'whiteBalancePresets', 'wbBracketing'],
  },
  {
    label: 'Review',
    keys: ['executiveSummary', 'reviewGoodFor', 'reviewNotGoodFor', 'reviewConclusion'],
  },
]

// Human-readable labels for every column key
export const COLUMN_LABELS: Partial<Record<keyof Camera, string>> = {
  productCode: 'Product Code', name: 'Name', award: 'Award', reviewScore: 'Review Score',
  imageUrl: 'Image URL', url: 'URL', dprReviewArchiveUrl: 'Archive URL',
  executiveSummary: 'Executive Summary', reviewGoodFor: 'Good For',
  reviewNotGoodFor: 'Not Good For', reviewConclusion: 'Conclusion',
  announced: 'Announced', bodyType: 'Body Type', bodyMaterial: 'Body Material',
  durability: 'Durability', dimensions: 'Dimensions', weightIncBatteries: 'Weight',
  environmentallySealed: 'Env. Sealed', processor: 'Processor', msrp: 'MSRP',
  sensorType: 'Sensor Type', sensorSize: 'Sensor Size', effectivePixels: 'Megapixels',
  sensorPhotoDetectors: 'Photo Detectors', maxResolution: 'Max Resolution',
  colorSpace: 'Color Space', colorFilterArray: 'Color Filter Array',
  focalLengthEquiv: 'Focal Length', focalLengthMultiplier: 'Focal Multiplier',
  opticalZoom: 'Optical Zoom', digitalZoom: 'Digital Zoom',
  maximumAperture: 'Max Aperture', lensMount: 'Lens Mount',
  iso: 'ISO', boostedIsoMaximum: 'Boosted ISO Max', boostedIsoMinimum: 'Boosted ISO Min',
  aperturePriority: 'Aperture Priority', shutterPriority: 'Shutter Priority',
  manualExposureMode: 'Manual Exposure', exposureCompensation: 'Exposure Comp.',
  continuousDrive: 'Continuous Drive', maximumShutterSpeed: 'Max Shutter',
  minimumShutterSpeed: 'Min Shutter', meteringModes: 'Metering Modes',
  manualFocus: 'Manual Focus', autofocus: 'Autofocus', normalFocusRange: 'Normal Focus',
  macroFocusRange: 'Macro Focus', numberOfFocusPoints: 'Focus Points',
  builtInFlash: 'Built-in Flash', externalFlash: 'External Flash',
  flashModes: 'Flash Modes', flashRange: 'Flash Range',
  imageStabilization: 'Stabilization', imageRatioWh: 'Image Ratio',
  jpegQualityLevels: 'JPEG Quality', uncompressedFormat: 'RAW Format',
  otherResolutions: 'Other Resolutions',
  screenSize: 'Screen Size', screenDots: 'Screen Dots', screenType: 'Screen Type',
  touchScreen: 'Touch Screen', articulatedLcd: 'Articulated LCD',
  viewfinderType: 'Viewfinder', viewfinderCoverage: 'VF Coverage',
  viewfinderMagnification: 'VF Magnification', viewfinderResolution: 'VF Resolution',
  videoFormat: 'Video Format', resolutions: 'Video Resolutions',
  liveView: 'Live View', timelapseRecording: 'Timelapse',
  battery: 'Battery', batteryDescription: 'Battery Desc.', batteryLifeCipa: 'Battery Life',
  storageTypes: 'Storage Types', storageIncluded: 'Storage Included',
  usb: 'USB', usbCharging: 'USB Charging', hdmi: 'HDMI',
  wireless: 'Wireless', wirelessNotes: 'Wireless Notes', gps: 'GPS',
  headphonePort: 'Headphone Port', microphonePort: 'Mic Port',
  microphone: 'Microphone', speaker: 'Speaker',
  selfTimer: 'Self Timer', subjectSceneModes: 'Scene Modes', remoteControl: 'Remote',
  orientationSensor: 'Orientation Sensor', customWhiteBalance: 'Custom WB',
  whiteBalancePresets: 'WB Presets', wbBracketing: 'WB Bracketing',
}

// Default column order (all IDs in order; visibility is separate)
export const DEFAULT_COLUMN_ORDER: string[] = [
  'name', 'productCode', 'award', 'reviewScore', 'msrp', 'announced',
  'bodyType', 'bodyMaterial', 'dimensions', 'weightIncBatteries', 'durability', 'environmentallySealed', 'processor',
  'sensorType', 'sensorSize', 'effectivePixels', 'sensorPhotoDetectors', 'maxResolution',
  'iso', 'boostedIsoMaximum', 'boostedIsoMinimum', 'imageStabilization', 'colorSpace', 'colorFilterArray',
  'focalLengthEquiv', 'focalLengthMultiplier', 'opticalZoom', 'digitalZoom', 'maximumAperture', 'lensMount',
  'aperturePriority', 'shutterPriority', 'manualExposureMode', 'exposureCompensation',
  'continuousDrive', 'maximumShutterSpeed', 'minimumShutterSpeed', 'meteringModes',
  'manualFocus', 'autofocus', 'normalFocusRange', 'macroFocusRange', 'numberOfFocusPoints',
  'builtInFlash', 'externalFlash', 'flashModes', 'flashRange',
  'screenSize', 'screenDots', 'screenType', 'touchScreen', 'articulatedLcd',
  'viewfinderType', 'viewfinderCoverage', 'viewfinderMagnification', 'viewfinderResolution',
  'imageRatioWh', 'jpegQualityLevels', 'uncompressedFormat', 'videoFormat',
  'liveView', 'timelapseRecording', 'resolutions', 'otherResolutions',
  'battery', 'batteryDescription', 'batteryLifeCipa', 'storageTypes', 'storageIncluded',
  'usb', 'usbCharging', 'hdmi', 'wireless', 'wirelessNotes', 'gps',
  'headphonePort', 'microphonePort', 'microphone', 'speaker',
  'selfTimer', 'subjectSceneModes', 'remoteControl', 'orientationSensor',
  'customWhiteBalance', 'whiteBalancePresets', 'wbBracketing',
  'executiveSummary', 'reviewGoodFor', 'reviewNotGoodFor', 'reviewConclusion',
  'actions',
]

// Default: only these column IDs are visible
export const DEFAULT_VISIBILITY: VisibilityState = {
  // show
  name: true, bodyType: true, sensorType: true,
  effectivePixels: true, announced: true, reviewScore: true, award: true,
  // everything else defaults to false below
  ...Object.fromEntries(
    COLUMN_GROUPS.flatMap((g) => g.keys)
      .filter((k) => !['bodyType', 'sensorType', 'effectivePixels', 'announced', 'reviewScore', 'award'].includes(k))
      .map((k) => [k, false]),
  ),
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function SortHeader({ column, label }: { column: Column<Camera>; label: string }) {
  return (
    <Button variant="ghost" size="sm" className="-ml-3 h-8"
      onClick={(e) => { e.stopPropagation(); column.toggleSorting(column.getIsSorted() === 'asc') }}>
      {label}
      <ArrowUpDown className="ml-2 h-3 w-3 text-muted-foreground" />
    </Button>
  )
}

function TextCell({ value }: { value: string | undefined }) {
  return <span className="text-sm">{value ?? '—'}</span>
}

function simpleCol(key: keyof Camera): ColumnDef<Camera> {
  const label = COLUMN_LABELS[key] ?? key
  return {
    id: key,
    accessorKey: key,
    header: ({ column }) => <SortHeader column={column} label={label} />,
    cell: ({ row }) => <TextCell value={row.original[key] as string | undefined} />,
  }
}

// ── Column definitions ────────────────────────────────────────────────────────

export function buildColumns(onDelete: (camera: Camera) => void): ColumnDef<Camera>[] {
  return [
    // ── Always-visible pinned columns ─────────────────────────────────────────
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }) => <SortHeader column={column} label="Name" />,
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-sm leading-snug">{row.original.name}</div>
          <div className="text-xs text-muted-foreground">{row.original.productCode}</div>
        </div>
      ),
    },

    // ── Identification ─────────────────────────────────────────────────────────
    simpleCol('productCode'),
    {
      id: 'award',
      accessorKey: 'award',
      header: 'Award',
      cell: ({ row }) => {
        const award = row.original.award
        return award
          ? <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">{award}</span>
          : null
      },
    },
    {
      id: 'reviewScore',
      accessorKey: 'reviewScore',
      header: ({ column }) => <SortHeader column={column} label="Score" />,
      cell: ({ row }) => {
        const score = row.original.reviewScore
        if (!score) return <span className="text-sm text-muted-foreground">—</span>
        const cls = score >= 80
          ? 'bg-emerald-100 text-emerald-800'
          : score >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-muted text-muted-foreground'
        return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}>{score}%</span>
      },
    },
    simpleCol('msrp'),
    simpleCol('announced'),

    // ── Body ──────────────────────────────────────────────────────────────────
    {
      id: 'bodyType',
      accessorKey: 'bodyType',
      header: ({ column }) => <SortHeader column={column} label="Body" />,
      cell: ({ row }) => <TextCell value={row.original.bodyType} />,
    },
    simpleCol('bodyMaterial'),
    simpleCol('dimensions'),
    simpleCol('weightIncBatteries'),
    simpleCol('durability'),
    simpleCol('environmentallySealed'),
    simpleCol('processor'),

    // ── Sensor ────────────────────────────────────────────────────────────────
    {
      id: 'sensorType',
      accessorKey: 'sensorType',
      header: ({ column }) => <SortHeader column={column} label="Sensor" />,
      cell: ({ row }) => (
        <div>
          <div className="text-sm">{row.original.sensorType ?? '—'}</div>
          {row.original.sensorSize && <div className="text-xs text-muted-foreground">{row.original.sensorSize}</div>}
        </div>
      ),
    },
    simpleCol('sensorSize'),
    {
      id: 'effectivePixels',
      accessorKey: 'effectivePixels',
      header: ({ column }) => <SortHeader column={column} label="Megapixels" />,
      cell: ({ row }) => <TextCell value={row.original.effectivePixels} />,
    },
    simpleCol('sensorPhotoDetectors'),
    simpleCol('maxResolution'),
    simpleCol('iso'),
    simpleCol('boostedIsoMaximum'),
    simpleCol('boostedIsoMinimum'),
    simpleCol('imageStabilization'),
    simpleCol('colorSpace'),
    simpleCol('colorFilterArray'),

    // ── Lens ──────────────────────────────────────────────────────────────────
    simpleCol('focalLengthEquiv'),
    simpleCol('focalLengthMultiplier'),
    simpleCol('opticalZoom'),
    simpleCol('digitalZoom'),
    simpleCol('maximumAperture'),
    simpleCol('lensMount'),

    // ── Exposure ──────────────────────────────────────────────────────────────
    simpleCol('aperturePriority'),
    simpleCol('shutterPriority'),
    simpleCol('manualExposureMode'),
    simpleCol('exposureCompensation'),
    simpleCol('continuousDrive'),
    simpleCol('maximumShutterSpeed'),
    simpleCol('minimumShutterSpeed'),
    simpleCol('meteringModes'),

    // ── Focus ─────────────────────────────────────────────────────────────────
    simpleCol('manualFocus'),
    simpleCol('autofocus'),
    simpleCol('normalFocusRange'),
    simpleCol('macroFocusRange'),
    simpleCol('numberOfFocusPoints'),

    // ── Flash ─────────────────────────────────────────────────────────────────
    simpleCol('builtInFlash'),
    simpleCol('externalFlash'),
    simpleCol('flashModes'),
    simpleCol('flashRange'),

    // ── Screen & Viewfinder ───────────────────────────────────────────────────
    simpleCol('screenSize'),
    simpleCol('screenDots'),
    simpleCol('screenType'),
    simpleCol('touchScreen'),
    simpleCol('articulatedLcd'),
    simpleCol('viewfinderType'),
    simpleCol('viewfinderCoverage'),
    simpleCol('viewfinderMagnification'),
    simpleCol('viewfinderResolution'),

    // ── Image & Video ─────────────────────────────────────────────────────────
    simpleCol('imageRatioWh'),
    simpleCol('jpegQualityLevels'),
    simpleCol('uncompressedFormat'),
    simpleCol('videoFormat'),
    simpleCol('liveView'),
    simpleCol('timelapseRecording'),
    simpleCol('resolutions'),
    simpleCol('otherResolutions'),

    // ── Battery & Storage ─────────────────────────────────────────────────────
    simpleCol('battery'),
    simpleCol('batteryDescription'),
    simpleCol('batteryLifeCipa'),
    simpleCol('storageTypes'),
    simpleCol('storageIncluded'),

    // ── Connectivity ──────────────────────────────────────────────────────────
    simpleCol('usb'),
    simpleCol('usbCharging'),
    simpleCol('hdmi'),
    simpleCol('wireless'),
    simpleCol('wirelessNotes'),
    simpleCol('gps'),
    simpleCol('headphonePort'),
    simpleCol('microphonePort'),
    simpleCol('microphone'),
    simpleCol('speaker'),

    // ── Other ─────────────────────────────────────────────────────────────────
    simpleCol('selfTimer'),
    simpleCol('subjectSceneModes'),
    simpleCol('remoteControl'),
    simpleCol('orientationSensor'),
    simpleCol('customWhiteBalance'),
    simpleCol('whiteBalancePresets'),
    simpleCol('wbBracketing'),

    // ── Review ────────────────────────────────────────────────────────────────
    simpleCol('executiveSummary'),
    simpleCol('reviewGoodFor'),
    simpleCol('reviewNotGoodFor'),
    simpleCol('reviewConclusion'),

    // ── Actions (always visible) ──────────────────────────────────────────────
    {
      id: 'actions',
      header: '',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={(e) => { e.stopPropagation(); onDelete(row.original) }}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ]
}
