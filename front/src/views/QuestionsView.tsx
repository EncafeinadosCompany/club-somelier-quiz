import { MainLayout } from '../common/widgets/MainLayout';



export function QuestionsView() {
 

  return (
    <MainLayout backgroundVariant="gradient">
     <div>
        <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
            <h1 className="text-2xl font-bold text-center mb-4">Welcome to the Home View</h1>
            <p className="text-center text-gray-600">This is a placeholder for your home view content.</p>
          </div>
        </div>
     </div>
    </MainLayout>
  );
}
