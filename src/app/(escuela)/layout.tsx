import { Sidebar} from '@/components';

export default function ShopLayout( { children }: {
  children: React.ReactNode;
} ) {
  return (
    <div className="flex min-h-screen bg-black-100">

        <Sidebar />

        
        <main className="flex-1 ml-72 p-8"> 
        

            <div className="max-w-7xl mx-auto">
            {children}
            </div>
        </main>

    </div>

  );
}