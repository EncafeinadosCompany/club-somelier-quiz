// Add this to your router configuration


// And create a container component for edit mode:
// filepath: c:\Hackathon-2025\front\src\containers\questionnaire-edit-container.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Skeleton } from '@/common/ui/skeleton';
import { useQuestionnaireByIDQuery } from '@/api/query/cuestions.queries';
import QuestionnaireFormView from '@/common/widgets/admin/quetionnaire/form-quetionnaire.widgest';

export default function QuestionnaireEditContainer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  console.log(id)
  const { data: questionnaire, isLoading, isError } = useQuestionnaireByIDQuery(id || '0');
  
  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }
  
  if (isError || !questionnaire) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error al cargar el cuestionario</h2>
        <p className="mb-6">No se pudo encontrar el cuestionario solicitado</p>
        <button 
          onClick={() => navigate('/admin')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Volver al listado
        </button>
      </div>
    );
  }
  
  return <QuestionnaireFormView initialData={questionnaire} isEditing={true} />;
}