"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  createColumnHelper, 
  flexRender, 
  getCoreRowModel, 
  useReactTable,
  getFilteredRowModel, // <-- Motor de búsqueda
  getPaginationRowModel
} from "@tanstack/react-table";
import { IoEyeOutline, IoPencilOutline, IoSearchOutline } from "react-icons/io5";
import { Escuela } from "@/interfaces/escuela.interface";

interface Props {
  data: Escuela[];
}

const columnHelper = createColumnHelper<Escuela>();

const columns = [
  columnHelper.accessor('nombre', {
    header: 'Nombre de la Institución',
    cell: info => <span className="font-bold text-slate-700 dark:text-slate-200">{info.getValue()}</span>,
  }),
  columnHelper.accessor('numero', {
    header: 'Número',
    cell: info => <span className="text-slate-600 dark:text-slate-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('cue', {
    header: 'CUE',
    cell: info => <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs text-slate-600 dark:text-slate-300">{info.getValue()}</code>,
  }),
  columnHelper.display({
    id: 'acciones',
    header: 'Acciones',
    cell: (info) => {
      const id = info.row.original.id;
      return (
        <div className="flex gap-2">
          <Link 
            href={`/escuelas/${id}`}
            className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
            title="Ver detalles"
          >
            <IoEyeOutline size={18} />
          </Link>
          <Link 
            href={`/escuelas/${id}/edit`}
            className="p-2 hover:bg-amber-50 dark:hover:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg transition-colors"
            title="Editar escuela"
          >
            <IoPencilOutline size={18} />
          </Link>
        </div>
      );
    },
  }),
];

export const EscuelaTable = ({ data }: Props) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. Estado para el filtro global
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
        globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // 2. Activar el motor de filtrado
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!isMounted) return null;

  return (
    <div className="flex flex-col gap-4">
      
      {/* 3. Input de Búsqueda Estilo GEM */}
      <div className="relative w-full max-w-sm">
        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Buscar escuela por nombre, CUE..."
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all shadow-sm"
        />
      </div>

      {/* 4. Estructura de la Tabla con Dark Mode */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-blue-50/30 dark:hover:bg-slate-800/40 transition-colors group">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- CONTROLES DE PAGINACIÓN --- */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
            
            {/* Info de registros */}
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Mostrando {table.getRowModel().rows.length} de {data.length} registros
            </div>

            <div className="flex items-center gap-4">
              {/* Selector de cantidad (Opcional) */}
              <select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className="bg-transparent text-sm font-medium text-slate-600 dark:text-slate-300 outline-none cursor-pointer"
              >
                {[10, 20, 30, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize} className="bg-slate-900">
                    Ver {pageSize}
                  </option>
                ))}
              </select>

              {/* Botones de navegación */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-20 transition-all text-slate-600 dark:text-slate-300"
                >
                  {"<<"}
                </button>
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-4 py-2 text-sm font-semibold rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-20 transition-all text-slate-700 dark:text-slate-200"
                >
                  Anterior
                </button>
                
                <span className="px-4 text-sm font-bold text-blue-500">
                  {table.getState().pagination.pageIndex + 1}
                </span>

                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-4 py-2 text-sm font-semibold rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-20 transition-all text-slate-700 dark:text-slate-200"
                >
                  Siguiente
                </button>
                <button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-20 transition-all text-slate-600 dark:text-slate-300"
                >
                  {">>"}
                </button>
              </div>
            </div>
          </div>
        
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          Resultados encontrados: {table.getFilteredRowModel().rows.length}
        </div>
      </div>
    </div>
  );
};