import * as React from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RANGES = [
  "Last 7 days",
  "Last 30 days",
  "Last 90 days",
  "Quarter to date",
  "Year to date",
  "All time",
];

export function DateRangePicker({ value, onChange }: { value?: string; onChange?: (v: string) => void }) {
  const [internal, setInternal] = React.useState(value ?? "Last 30 days");
  const current = value ?? internal;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-2 font-medium">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          {current}
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {RANGES.map((r) => (
          <DropdownMenuItem key={r} onClick={() => { setInternal(r); onChange?.(r); }}>
            {r}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}