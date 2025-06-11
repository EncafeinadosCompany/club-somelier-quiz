## QuestionsView

```tsx
// use client

/**
 * `QuestionsView` es la vista principal del panel de administración para gestionar preguntas.
 * Permite crear, editar, eliminar, visualizar y filtrar preguntas basadas en categoría, nivel y respuesta.
 *
 * ### Funcionalidades principales:
 * - Visualización de lista de preguntas.
 * - Filtros de búsqueda (categoría, nivel, texto y respuesta).
 * - Detalle de pregunta seleccionada.
 * - Edición y creación con formulario.
 * - Confirmación de eliminación.
 *
 * ### Estado local:
 * - `selectedQuestionId`: ID de la pregunta seleccionada.
 * - `isEditing`, `isCreating`: controlan modo edición o creación.
 * - `categoryFilter`, `levelFilter`, `responseFilter`, `searchTerm`: filtros de búsqueda.
 *
 * ### Hooks usados:
 * - `useQuestionsQuery`, `useQuestionByIDQuery`: obtener preguntas y detalles.
 * - `useCategoriesQuery`, `useNivelesQuery`: obtener filtros disponibles.
 * - `useCreateQuestionMutation`, `useUpdateQuestionMutation`, `useDeleteQuestionMutation`: mutaciones.
 */
```

---

## Filtros de preguntas

```ts
/**
 * Filtrado de preguntas mediante `useMemo`, aplicando filtros combinados:
 * - Texto: `q.question.toLowerCase().includes(searchTerm.toLowerCase())`
 * - Categoría: `q.categories.some(cat => cat.id === categoryFilter)`
 * - Nivel: `q.level === levelFilter`
 * - Respuesta esperada: `q.response === responseFilter`
 */
```

---

## Mutaciones y lógica de formulario

```ts
/**
 * `handleFormSubmit` gestiona el envío del formulario para crear o actualizar preguntas.
 *
 * - Si `isCreating` está activo, se usa `createQuestionMutation`.
 * - Si no, se utiliza `updateQuestionMutation` con `selectedQuestionId`.
 *
 * `handleDelete` elimina una pregunta con `deleteQuestionMutation`.
 *
 * Ambos utilizan `onSuccess` para cerrar formularios y actualizar la vista.
 */
```

---

## Componentes usados

```md
- `QuestionFilter`: Filtros de búsqueda (categoría, nivel, respuesta).
- `QuestionCard`: Tarjetas individuales de preguntas.
- `QuestionForm`: Formulario reutilizable para crear y editar preguntas.
- `QuestionDetails`: Vista detallada de una pregunta.
- `DeleteQuestionConfirmation`: Modal de confirmación para eliminación.
- `Skeleton`: Elemento visual para cargar datos.
- `AnimatedBackground`: Fondo animado para estética.
```

---

## UX Interactions

```md
- Botón “Nueva Pregunta” cambia al modo creación.
- Selección de pregunta muestra detalles o formulario de edición.
- Si no hay preguntas o filtros activos, se muestran mensajes contextuales.
```

---

## Estado del componente

```ts
// useState
const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null)
const [isEditing, setIsEditing] = useState(false)
const [isCreating, setIsCreating] = useState(false)
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
const [categoryFilter, setCategoryFilter] = useState<number | null>(null)
const [levelFilter, setLevelFilter] = useState<string | null>(null)
const [responseFilter, setResponseFilter] = useState<boolean | null>(null)
const [searchTerm, setSearchTerm] = useState("")
```
