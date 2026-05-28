"use client";

import { useMemo, useState } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type FilterOption = {
  value: string;
  label: string;
  icon?: string;
};

type FilterGroup = {
  id: string;
  label: string;
  type: "checkbox" | "radio" | "select";
  options: FilterOption[];
};

type Props = {
  filterGroups: FilterGroup[];
  onFilterChange: (filters: Record<string, string[]>) => void;
  className?: string;
  layout?: "grid" | "sidebar";
};

export default function FiltersSection({
  filterGroups,
  onFilterChange,
  className,
  layout = "grid",
}: Props) {
  const defaultExpanded = useMemo(
    () => Object.fromEntries(filterGroups.map((group) => [group.id, true])),
    [filterGroups],
  );

  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(defaultExpanded);

  const handleFilterChange = (
    groupId: string,
    value: string,
    type: "checkbox" | "radio" | "select",
  ) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };

      if (type === "checkbox") {
        if (newFilters[groupId]?.includes(value)) {
          newFilters[groupId] = newFilters[groupId].filter((v) => v !== value);
        } else {
          newFilters[groupId] = [...(newFilters[groupId] || []), value];
        }
      } else {
        newFilters[groupId] = [value];
      }

      if (newFilters[groupId]?.length === 0) {
        delete newFilters[groupId];
      }

      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };

  const activeFilterCount = Object.values(activeFilters).reduce(
    (sum, values) => sum + values.length,
    0,
  );

  const isSidebar = layout === "sidebar";

  return (
    <section className={cn(isSidebar ? "" : "px-5 py-6 sm:px-8 lg:px-10", className)}>
      <div className={cn(!isSidebar && "mx-auto max-w-7xl")}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/90">Affiner</p>
            <h2 className="mt-1 text-lg font-bold text-white">Filtres</h2>
          </div>
          {activeFilterCount > 0 && (
            <Button onClick={clearAllFilters} variant="ghost" size="sm" className="text-sm text-neutral-300">
              <BrandIcon name="x-circle" className="mr-2 h-4 w-4" />
              Réinitialiser ({activeFilterCount})
            </Button>
          )}
        </div>

        <div
          className={cn(
            isSidebar
              ? "space-y-4 rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
              : "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {filterGroups.map((group) => (
            <div
              key={group.id}
              className={cn(
                "rounded-2xl border border-white/10 bg-neutral-900/40 p-4",
                isSidebar && "border-white/8 bg-transparent p-0",
              )}
            >
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                className="mb-3 flex w-full items-center justify-between text-left text-sm font-semibold text-white"
              >
                {group.label}
                <BrandIcon
                  name={expandedGroups[group.id] !== false ? "chevron-up" : "chevron-down"}
                  className="h-4 w-4 text-neutral-400"
                />
              </button>

              {expandedGroups[group.id] !== false && (
                <div className="flex flex-wrap gap-2">
                  {group.options.map((option) => {
                    const isActive = activeFilters[group.id]?.includes(option.value) ?? false;

                    return (
                      <label
                        key={option.value}
                        className={cn(
                          "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition",
                          isActive
                            ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)]"
                            : "border-white/10 bg-white/[0.04] text-neutral-300 hover:border-white/20 hover:bg-white/[0.07]",
                        )}
                      >
                        <input
                          type={group.type}
                          name={group.id}
                          value={option.value}
                          checked={isActive}
                          onChange={() => handleFilterChange(group.id, option.value, group.type)}
                          className="sr-only"
                        />
                        {option.icon && (
                          <BrandIcon name={option.icon} className="h-3.5 w-3.5 opacity-80" />
                        )}
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
