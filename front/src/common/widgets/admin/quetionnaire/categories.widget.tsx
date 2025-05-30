import { useCategoriesQuery } from "@/api/query/category.queries"
import { Button } from "@/common/ui/button"
import { Plus } from "lucide-react"

export const CategoriesWidget = () => {

    const { data } = useCategoriesQuery()

    return (
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <div className="flex justify-between">
                <h4 className="text-white font-medium mb-3">Categorías</h4>
                <Button
                    size="icon"
                    className="w-6 h-6 bg-amber-200 hover:bg-amber-300 rounded-full p-1"
                    variant="ghost"
                >
                    <Plus className="h-1 w-1" />
                </Button>
            </div>
            <div className="space-y-2 text-sm">
                {
                    data && data.length === 0 ?
                        <p>No hay categorías</p>
                        :
                        data?.map(categorie => (
                            <div key={categorie.id} className="flex justify-between text-white/80">
                                <span className="capitalize">{categorie.name}</span>

                            </div>
                        ))
                }

            </div>
        </div>
    )
}