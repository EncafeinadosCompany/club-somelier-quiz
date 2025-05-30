import { useParams, useSearchParams } from "react-router-dom"

export const DetailsCuestions = () =>{
    
    // This gets URL query parameters (like ?id=0)
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id"); // Gets the value of "id" from URL
    
    console.log("ID from query parameter:", id);
    
    return(
            <div className="relative min-h-screen w-full overflow-hidden">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
        alt="Beautiful mountain landscape"

        className="object-cover absolute h-full w-full"

      />
      </div>
    )
}