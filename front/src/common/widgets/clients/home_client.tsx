import { Mail, User } from "lucide-react"

export const HomeClient = () => {
    return (
        <div className="relative h-full bg-slate-50 dark:bg-slate-300  rounded-md">
            <div className="p-4">
                <div className="flex items-center mb-4">
                    <button className="rounded-full p-2 bg-gray-100 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex-grow"></div>
                    <button className="rounded-full p-2 bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                </div>
                
                <div className="text-center text-md font-bold text-gray-800">
                    <h1 >¡Bienvenido!</h1>
                    <h1>a</h1>
                    <h1>Realidad o Mito</h1>
                </div>
                
                <div className="relative h-20 mb-8 overflow-hidden">
                    <div className="absolute inset-0">
                      
                    </div>
                </div>
                
                <div className="bg-white dark:bg-white/10 rounded-t-3xl p-4 shadow-lg">
                    <div className="flex mb-4">
                        <button className="flex-1 py-2 font-medium text-gray-700">Datos básicos</button>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-indigo-400 rounded-full flex items-center justify-center mr-4">
                               <User className="text-white"/>
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-semibold text-gray-800">Nombre Compreto</h3>
                                <p className="text-sm text-gray-500">23 minutes</p>
                            </div>
                            <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
                                <Mail className="text-white"/>
                            </div>
                        </div>
                        
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-indigo-300 rounded-full flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                    <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-semibold text-gray-800">Simple sketch</h3>
                                <p className="text-sm text-gray-500">12 minutes</p>
                            </div>
                            <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-indigo-300 rounded-full flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-semibold text-gray-800">Coloring</h3>
                                <p className="text-sm text-gray-500">30 minutes</p>
                            </div>
                            <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                   <div className="w-full flex justify-center ">
                   <button className="w-full max-w-3xl mt-6 py-3 bg-indigo-400 text-gray-700 font-medium rounded-full hover:bg-indigo-500 transition-colors">
                        Entrar al aula
                    </button>
                   </div>
                </div>
            </div>
        </div>
    )
}