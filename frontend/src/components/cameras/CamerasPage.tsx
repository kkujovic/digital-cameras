import { useState, useMemo, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import {
  useReactTable, getCoreRowModel, getSortedRowModel,
  flexRender, type SortingState, type VisibilityState,
} from '@tanstack/react-table'
import { toast } from 'sonner'
import {
  Camera as CameraIcon, Home, Search, Plus, HelpCircle,
  Settings, UserCircle2, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight,
} from 'lucide-react'
import { fetchCameras, updateCamera, deleteCamera, createCamera } from '@/api/cameras'
import { buildColumns, DEFAULT_VISIBILITY, DEFAULT_COLUMN_ORDER } from './columns'
import { ColumnPicker } from './ColumnPicker'
import { CameraEditDialog } from './CameraEditDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import type { Camera } from '@/types/camera'
import type { LucideIcon } from 'lucide-react'

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

// ── Pagination bar ───────────────────────────────────────────────────────────

function PaginationBar({ page, pageSize, totalPages, totalElements, isLoading, onPage, onPageSize }: {
  page: number
  pageSize: number
  totalPages: number
  totalElements: number
  isLoading: boolean
  onPage: (p: number) => void
  onPageSize: (s: number) => void
}) {
  const [input, setInput] = useState(String(page + 1))

  useEffect(() => { setInput(String(page + 1)) }, [page])

  const commit = () => {
    const n = parseInt(input, 10)
    if (!isNaN(n) && n >= 1 && n <= totalPages) {
      onPage(n - 1)
    } else {
      setInput(String(page + 1))
    }
  }

  const from = totalElements === 0 ? 0 : page * pageSize + 1
  const to = Math.min((page + 1) * pageSize, totalElements)

  return (
    <div className="shrink-0 flex items-center justify-between gap-4">
      <p className="text-xs text-muted-foreground">
        {totalElements === 0 ? 'No results' : `Showing ${from}–${to} of ${totalElements.toLocaleString()} cameras`}
      </p>

      <div className="flex items-center gap-4">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">Rows per page</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSize(Number(e.target.value))}
            className="h-7 text-xs border border-border rounded-md px-2 bg-card cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {PAGE_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Nav buttons + page input */}
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-7 w-7"
            onClick={() => onPage(0)} disabled={page === 0 || isLoading}>
            <ChevronsLeft className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-7"
            onClick={() => onPage(page - 1)} disabled={page === 0 || isLoading}>
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>

          <div className="flex items-center gap-1.5 px-1">
            <span className="text-xs text-muted-foreground">Page</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => e.key === 'Enter' && commit()}
              className="w-10 h-7 text-xs text-center border border-border rounded-md bg-card focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <span className="text-xs text-muted-foreground">of {totalPages}</span>
          </div>

          <Button variant="outline" size="icon" className="h-7 w-7"
            onClick={() => onPage(page + 1)} disabled={page >= totalPages - 1 || isLoading}>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-7"
            onClick={() => onPage(totalPages - 1)} disabled={page >= totalPages - 1 || isLoading}>
            <ChevronsRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Sidebar nav item ────────────────────────────────────────────────────────

function NavItem({ icon: Icon, label, active, onClick }: {
  icon: LucideIcon; label: string; active?: boolean; onClick?: () => void
}) {
  return (
    <button onClick={onClick} className={cn(
      'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left',
      active
        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
    )}>
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </button>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export function CamerasPage() {
  const queryClient = useQueryClient()

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(DEFAULT_VISIBILITY)
  const [columnOrder, setColumnOrder] = useState<string[]>(DEFAULT_COLUMN_ORDER)
  const [draggedColId, setDraggedColId] = useState<string | null>(null)
  const [dragOverColId, setDragOverColId] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [editCamera, setEditCamera] = useState<Camera | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Camera | null>(null)

  // debounce search → reset to page 0 when it changes
  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(0) }, 300)
    return () => clearTimeout(t)
  }, [searchInput])

  const { data, isLoading } = useQuery({
    queryKey: ['cameras', page, pageSize, search],
    queryFn: () => fetchCameras(page, pageSize, search),
    placeholderData: keepPreviousData,
  })

  const cameras = data?.content ?? []
  const totalPages = data?.totalPages ?? 0
  const totalElements = data?.totalElements ?? 0

  const saveMutation = useMutation({
    mutationFn: (c: Camera) => c.id ? updateCamera(c.id, c) : createCamera(c),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cameras'] })
      setEditCamera(null)
      toast.success('Saved')
    },
    onError: () => toast.error('Failed to save'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteCamera(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cameras'] })
      setDeleteTarget(null)
      toast.success('Deleted')
    },
    onError: () => toast.error('Failed to delete'),
  })

  const handleSave = (camera: Camera) => {
    const form = { ...camera }
    if (!form.productCode) {
      form.productCode = (form.name || 'camera').toLowerCase().replace(/[^a-z0-9]+/g, '_')
    }
    saveMutation.mutate(form)
  }

  const columns = useMemo(() => buildColumns((c) => setDeleteTarget(c)), [])

  const reorderColumn = (sourceId: string, targetId: string) => {
    setColumnOrder((order) => {
      const result = [...order]
      const from = result.indexOf(sourceId)
      const to = result.indexOf(targetId)
      if (from < 0 || to < 0 || from === to) return order
      result.splice(from, 1)
      result.splice(to, 0, sourceId)
      return result
    })
  }

  const table = useReactTable({
    data: cameras,
    columns,
    state: { sorting, columnVisibility, columnOrder },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="h-screen flex overflow-hidden bg-background">

      {/* ── Sidebar ── */}
      <aside className="w-56 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="h-14 px-4 flex items-center gap-2.5 border-b border-sidebar-border shrink-0">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
            <CameraIcon className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-none truncate">Digital Cameras</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Admin Portal</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          <NavItem icon={Home} label="Home" />
          <NavItem icon={CameraIcon} label="Cameras" active />
        </nav>
        <div className="border-t border-sidebar-border p-3 space-y-0.5">
          <NavItem icon={Settings} label="Settings" />
          <NavItem icon={HelpCircle} label="Help" />
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 overflow-hidden flex flex-col">

        {/* Top bar */}
        <header className="h-14 bg-card border-b border-border flex items-center px-5 gap-4 shrink-0">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search cameras…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 h-9 bg-muted/40 border-transparent focus-visible:border-border focus-visible:bg-card text-sm"
            />
          </div>
          <div className="ml-auto">
            <UserCircle2 className="h-7 w-7 text-muted-foreground" />
          </div>
        </header>

        {/* Content — capped at 1400px and centred on large screens */}
        <div className="flex-1 overflow-hidden flex flex-col px-6 py-5 gap-4 w-full max-w-[1400px] mx-auto">

          {/* Page header */}
          <div className="flex items-center justify-between shrink-0">
            <div>
              <h1 className="text-lg font-semibold">Cameras</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {totalElements.toLocaleString()} cameras in catalog
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ColumnPicker table={table} />
              <Button size="sm" onClick={() => setEditCamera({ id: 0, productCode: '', name: '' } as Camera)}>
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Add camera
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="h-full overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-muted/50 border-b backdrop-blur-sm">
                  {table.getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id} className="hover:bg-transparent">
                      {hg.headers.map((h) => {
                        const isDraggable = h.column.id !== 'actions'
                        const isDragging = draggedColId === h.column.id
                        const isOver = dragOverColId === h.column.id && !isDragging
                        return (
                          <TableHead
                            key={h.id}
                            className={cn(
                              'h-9 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide transition-colors',
                              isDraggable && 'cursor-grab select-none',
                              isDragging && 'opacity-40',
                              isOver && 'bg-primary/10 border-l-2 border-primary',
                            )}
                            draggable={isDraggable}
                            onDragStart={isDraggable ? (e) => {
                              e.dataTransfer.effectAllowed = 'move'
                              setDraggedColId(h.column.id)
                            } : undefined}
                            onDragOver={isDraggable ? (e) => {
                              e.preventDefault()
                              e.dataTransfer.dropEffect = 'move'
                              if (h.column.id !== draggedColId) setDragOverColId(h.column.id)
                            } : undefined}
                            onDrop={isDraggable ? () => {
                              if (draggedColId) reorderColumn(draggedColId, h.column.id)
                              setDraggedColId(null)
                              setDragOverColId(null)
                            } : undefined}
                            onDragEnd={() => { setDraggedColId(null); setDragOverColId(null) }}
                          >
                            {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: pageSize }).map((_, i) => (
                      <TableRow key={i}>
                        {columns.map((_, j) => (
                          <TableCell key={j} className="px-4 py-2.5">
                            <div className="h-4 rounded-sm bg-muted animate-pulse" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : cameras.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center text-sm text-muted-foreground">
                        No cameras found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        className="border-b last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
                        onClick={() => setEditCamera({ ...row.original })}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="px-4 py-3">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination bar */}
          <PaginationBar
            page={page}
            pageSize={pageSize}
            totalPages={totalPages}
            totalElements={totalElements}
            isLoading={isLoading}
            onPage={setPage}
            onPageSize={(s) => { setPageSize(s); setPage(0) }}
          />

        </div>
      </div>

      <CameraEditDialog
        camera={editCamera}
        open={editCamera !== null}
        onClose={() => setEditCamera(null)}
        onSave={handleSave}
        isSaving={saveMutation.isPending}
      />

      <AlertDialog open={deleteTarget !== null} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete camera</AlertDialogTitle>
            <AlertDialogDescription>
              Delete <span className="font-medium">{deleteTarget?.name}</span>? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
