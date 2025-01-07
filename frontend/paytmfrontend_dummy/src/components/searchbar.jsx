import { useState, useEffect } from "react";


export default function SearchComponent({userDetails}) {
    const [searchText, setSearchText] = useState(""); 
    
useEffect(()=>{

    })

    return(
        <input
            type="text"
            className="w-full mt-6 p-2 text-lg rounded border-1 border-gray-500 outline-none"
            placeholder="Search here..."
            value={searchText} 
            onChange={(e) => setSearchText(e.target.value)} 
        />
    )
    
    
}