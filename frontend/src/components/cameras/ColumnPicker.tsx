import type { Table } from '@tanstack/react-table'
import { Columns3 } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { COLUMN_GROUPS, COLUMN_LABELS, DEFAULT_VISIBILITY } from './columns'
import type { Camera } from '@/types/camera'

interface Props {
  table: Table<Camera>
}

export function ColumnPicker({ table }: Props) {
  const [open, setOpen] = useState(false)

  const visibleCount = table.getVisibleLeafColumns().filter((c) => c.id !== 'actions').length

  const reset = () => table.setColumnVisibility(DEFAULT_VISIBILITY)

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Columns3 className="h-3.5 w-3.5 mr-1.5" />
        Columns
        <span className="ml-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 leading-none">
          {visibleCount}
        </span>
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-72 flex flex-col gap-0 p-0">
          <SheetHeader className="px-5 py-4 border-b shrink-0">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-sm">Visible columns</SheetTitle>
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={reset}>
                Reset
              </Button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-3 space-y-5">
            {COLUMN_GROUPS.map((group) => {
              const groupCols = group.keys.map((key) => table.getColumn(key)).filter(Boolean)
              if (groupCols.length === 0) return null

              const allVisible = groupCols.every((c) => c!.getIsVisible())
              const someVisible = groupCols.some((c) => c!.getIsVisible())

              return (
                <div key={group.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {group.label}
                    </span>
                    <button
                      className="text-[10px] text-primary hover:underline"
                      onClick={() => groupCols.forEach((c) => c!.toggleVisibility(!allVisible))}
                    >
                      {allVisible ? 'Hide all' : someVisible ? 'Show all' : 'Show all'}
                    </button>
                  </div>
                  <Separator className="mb-2" />
                  <div className="space-y-1">
                    {groupCols.map((col) => {
                      const key = col!.id as keyof Camera
                      const label = COLUMN_LABELS[key] ?? key
                      const visible = col!.getIsVisible()
                      return (
                        <label
                          key={col!.id}
                          className="flex items-center gap-2.5 py-1 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={visible}
                            onChange={() => col!.toggleVisibility(!visible)}
                            className="h-3.5 w-3.5 rounded border-border accent-primary cursor-pointer"
                          />
                          <span className={`text-sm transition-colors ${visible ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {label}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
