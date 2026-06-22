"use client";

import Link from "next/link";
import clsx from "clsx";
import { 
  IoCloseOutline, 
  IoLogOutOutline, 
  IoPeopleOutline, 
  IoPersonOutline, 
  IoSearchOutline, 
  IoSchoolOutline, 
  IoBriefcaseOutline,
  IoSettingsOutline
} from "react-icons/io5";

export const Sidebar = () => {
  
  // VALORES TEMPORALES PARA MAQUETAR (Cambiar luego por Zustand)
  const isSideMenuOpen = true; 
  const closeMenu = () => console.log('Cerrar');

  const isAuthenticated = true;
  const isDirector = true; 

  return (
    <div className="text-slate-300">
      
      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 left-0 top-0 w-72 h-screen bg-slate-900 z-20 shadow-2xl transform transition-all duration-300",
          {
            "-translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        {/* Título del Sistema / Logo */}
        <div className="flex items-center mb-10 mt-2 px-2">
            <IoSchoolOutline size={35} className="text-blue-500" />
            <span className="ml-3 text-2xl font-bold text-white tracking-wide">GEM <span className="text-blue-500">PRO</span></span>
        </div>

        {/* Buscador Rápido */}
        <div className="relative mb-8 px-2">
          <IoSearchOutline size={18} className="absolute top-2.5 left-5 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-slate-800 rounded-lg pl-10 py-2 pr-4 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Seccion: Mi Cuenta */}
        <div className="mb-8">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Usuario</p>
            <Link
              href="/profile"
              className="flex items-center p-3 hover:bg-slate-800 rounded-lg transition-all"
            >
              <IoPersonOutline size={22} />
              <span className="ml-4 font-medium text-sm">Mi Perfil</span>
            </Link>

            <button
              className="flex w-full items-center p-3 hover:bg-red-900/20 hover:text-red-400 rounded-lg transition-all mt-1"
              onClick={() => console.log('Salir')}
            >
              <IoLogOutOutline size={22} />
              <span className="ml-4 font-medium text-sm">Cerrar Sesión</span>
            </button>
        </div>

        {/* Seccion: Gestión (Solo Directivos) */}
        {isDirector && (
          <div className="border-t border-slate-800 pt-6">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Administración</p>

            <Link
              href="/escuelas"
              className="flex items-center p-3 hover:bg-slate-800 rounded-lg transition-all"
            >
              <IoSchoolOutline size={22} />
              <span className="ml-4 font-medium text-sm">Gestión Escuelas</span>
            </Link>

            <Link
              href="/cargos"
              className="flex items-center p-3 hover:bg-slate-800 rounded-lg transition-all"
            >
              <IoBriefcaseOutline size={22} />
              <span className="ml-4 font-medium text-sm">Planta de Cargos</span>
            </Link>

            <Link
              href="/alumnos"
              className="flex items-center p-3 hover:bg-slate-800 rounded-lg transition-all"
            >
              <IoPeopleOutline size={22} />
              <span className="ml-4 font-medium text-sm">Matrícula Alumnos</span>
            </Link>

            <Link
              href="/settings"
              className="flex items-center p-3 hover:bg-slate-800 rounded-lg transition-all mt-4"
            >
              <IoSettingsOutline size={22} />
              <span className="ml-4 font-medium text-sm">Configuración</span>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};