
import { getEscuelas } from "@/actions"; 
import { EscuelaTable } from "@/components/escuelas/EscuelaTable"; 

export default async function EscuelasPage() {
  const escuelas = await getEscuelas();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-slate-800">Gestión Institucional</h1>
      
      {/* En lugar de hacer el .map() acá, se lo pasamos a la tabla */}
      <EscuelaTable data={escuelas} />
    </div>
  );
}