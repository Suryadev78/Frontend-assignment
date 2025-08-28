import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export default function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // here we will sort data if sort key is selected
  const sortedData = [...data];
  if (sortKey && sortOrder) {
    sortedData.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  // here we an toggle sorting
  const handleSort = (key: keyof T, sortable?: boolean) => {
    if (!sortable) return;
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder("asc");
    } else {
      setSortOrder(prev => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"));
      if (sortOrder === null) setSortKey(null);
    }
  };

  // this is toggle row selection
  const toggleRow = (index: number) => {
    if (!selectable) return;
    const next = new Set(selectedRows);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setSelectedRows(next);
    onRowSelect?.([...next].map(i => sortedData[i]));
  };

  const allSelected = selectable && selectedRows.size === data.length;

  const toggleSelectAll = () => {
    if (!selectable) return;
    if (allSelected) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const all = new Set(data.map((_, i) => i));
      setSelectedRows(all);
      onRowSelect?.([...all].map(i => sortedData[i]));
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th className="px-3 py-2">
                <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
              </th>
            )}
            {columns.map(col => (
              <th key={col.key} className="px-3 py-2 text-left font-medium text-gray-700">
                {col.sortable ? (
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort(col.dataIndex, col.sortable)}
                  >
                    {col.title}
                    {sortKey === col.dataIndex
                      ? sortOrder === "asc"
                        ? " ▲"
                        : " ▼"
                      : " ⇅"}
                  </button>
                ) : (
                  col.title
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center py-4">
                No data to display.
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => {
              const isSelected = selectedRows.has(index);
              return (
                <tr
                  key={index}
                  className={`border-t hover:bg-gray-50 ${isSelected ? "bg-blue-50" : ""}`}
                >
                  {selectable && (
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(index)}
                      />
                    </td>
                  )}
                  {columns.map(col => (
                    <td key={col.key} className="px-3 py-2">
                      {(row[col.dataIndex] as unknown) as React.ReactNode}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
