import { Escuela } from "@/interfaces/escuela.interface";

export const getEscuelas = async (): Promise<Escuela[]> => {
  try {
    // Agregamos la / al final para que Django no se queje
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/escuelas/`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.log("Error en la API de Django:", error);
    return [];
  }
};

// export default async function EscuelasPage() {
//   const escuelas = await getEscuelas();

//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold mb-5">Lista de Escuelas del GEM</h1>
      
//       <div className="grid grid-cols-1 gap-4">
//         {escuelas.map((escuela) => (
//           <div key={escuela.id} className="border p-4 rounded shadow">
//             <h2 className="font-semibold">{escuela.nombre}</h2>
//             <p className="text-gray-600">CUE: {escuela.cue}</p>
//             <p className="text-sm">Número: {escuela.numero}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }