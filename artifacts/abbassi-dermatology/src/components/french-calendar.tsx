import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FrenchCalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const MONTHS_FR = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

export function FrenchCalendar({
  selected,
  onSelect,
  className = '',
}: FrenchCalendarProps) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Initialize viewing month with selected date or today
  const [viewDate, setViewDate] = useState<Date>(() => {
    if (selected) {
      return new Date(selected.getFullYear(), selected.getMonth(), 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const prevMonth = () => {
    // Prevent navigating to months before the current month
    const prev = new Date(year, month - 1, 1);
    if (prev < new Date(today.getFullYear(), today.getMonth(), 1)) return;
    setViewDate(prev);
  };

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const isCurrentOrPastMonth =
    year === today.getFullYear() && month === today.getMonth();

  // Grid calculation
  const calendarCells = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    // Monday = 0, ..., Sunday = 6
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells: Array<{
      date: Date;
      isCurrentMonth: boolean;
      dayNumber: number;
      isPast: boolean;
      isFriday: boolean;
      isSelected: boolean;
      isToday: boolean;
    }> = [];

    // Trailing days from previous month
    for (let i = startOffset - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const cellDate = new Date(year, month - 1, dayNum);
      cellDate.setHours(0, 0, 0, 0);
      cells.push({
        date: cellDate,
        isCurrentMonth: false,
        dayNumber: dayNum,
        isPast: true,
        isFriday: cellDate.getDay() === 5,
        isSelected: false,
        isToday: false,
      });
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const cellDate = new Date(year, month, d);
      cellDate.setHours(0, 0, 0, 0);
      const isPast = cellDate < today;
      const isFriday = cellDate.getDay() === 5;
      const isToday = cellDate.getTime() === today.getTime();
      const isSelected =
        Boolean(selected) &&
        selected?.getFullYear() === year &&
        selected?.getMonth() === month &&
        selected?.getDate() === d;

      cells.push({
        date: cellDate,
        isCurrentMonth: true,
        dayNumber: d,
        isPast,
        isFriday,
        isSelected,
        isToday,
      });
    }

    // Leading days from next month to fill grid (multiple of 7)
    const remainder = cells.length % 7;
    const extraNeeded = remainder === 0 ? 0 : 7 - remainder;
    for (let n = 1; n <= extraNeeded; n++) {
      const cellDate = new Date(year, month + 1, n);
      cellDate.setHours(0, 0, 0, 0);
      cells.push({
        date: cellDate,
        isCurrentMonth: false,
        dayNumber: n,
        isPast: false,
        isFriday: cellDate.getDay() === 5,
        isSelected: false,
        isToday: false,
      });
    }

    return cells;
  }, [year, month, selected, today]);

  return (
    <div
      className={`french-calendar w-[310px] sm:w-[325px] p-3.5 bg-background border border-border select-none ${className}`}
      data-testid="french-calendar"
    >
      {/* Month Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/70">
        <button
          type="button"
          onClick={prevMonth}
          disabled={isCurrentOrPastMonth}
          className="h-8 w-8 inline-flex items-center justify-center rounded text-foreground/80 hover:text-foreground hover:bg-secondary/60 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          aria-label="Mois précédent"
        >
          <ChevronLeft size={17} />
        </button>

        <span className="font-serif text-[1.05rem] font-medium tracking-tight text-foreground">
          {MONTHS_FR[month]} {year}
        </span>

        <button
          type="button"
          onClick={nextMonth}
          className="h-8 w-8 inline-flex items-center justify-center rounded text-foreground/80 hover:text-foreground hover:bg-secondary/60 transition-colors"
          aria-label="Mois suivant"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      {/* Weekday Labels (Grid 7 columns) */}
      <div className="grid grid-cols-7 gap-1 py-2 text-center border-b border-border/40">
        {WEEKDAYS.map((day, idx) => (
          <span
            key={day}
            className={`font-mono text-[0.68rem] font-semibold tracking-wider uppercase ${
              idx === 4 ? 'text-accent' : 'text-muted-foreground'
            }`}
          >
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid (Grid 7 columns) */}
      <div className="grid grid-cols-7 gap-1 pt-2">
        {calendarCells.map((cell, idx) => {
          if (!cell.isCurrentMonth) {
            return (
              <div
                key={`outside-${idx}`}
                className="h-9 w-full flex items-center justify-center text-[0.78rem] text-muted-foreground/30 pointer-events-none"
              >
                {cell.dayNumber}
              </div>
            );
          }

          const isDisabled = cell.isPast || cell.isFriday;

          return (
            <button
              key={`day-${cell.dayNumber}`}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect?.(cell.date)}
              title={
                cell.isFriday
                  ? 'Cabinet fermé le vendredi'
                  : cell.isPast
                  ? 'Date passée'
                  : undefined
              }
              className={`h-9 w-full flex items-center justify-center text-[0.84rem] rounded transition-all duration-150 ${
                cell.isSelected
                  ? 'bg-primary text-primary-foreground font-bold shadow-sm scale-105'
                  : cell.isFriday
                  ? 'text-muted-foreground/35 cursor-not-allowed line-through'
                  : cell.isPast
                  ? 'text-muted-foreground/35 cursor-not-allowed'
                  : cell.isToday
                  ? 'text-primary font-bold ring-1 ring-accent bg-accent/10 hover:bg-primary hover:text-primary-foreground cursor-pointer'
                  : 'text-foreground font-medium hover:bg-primary/10 hover:text-primary cursor-pointer'
              }`}
            >
              {cell.dayNumber}
            </button>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[0.62rem] text-muted-foreground font-mono">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          Vendredi fermé
        </span>
        <span>Annaba · 08:30 – 16:30</span>
      </div>
    </div>
  );
}
