import React from "react";

// Functional component 'Index' receiving 'hidden' and 'm' props
function Index({ hidden, m }) {
    // Logging the 'hidden' prop value
    console.log(hidden);
    
    // Rendering JSX
    return (
        <div style={{ display: hidden ? "none" : "block" }} className="mx-auto h-16 w-fit position-absolute">
            <div className="alert alert-success bg-green-300 rounded border-black p-4 flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current mr-2 shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{m}</span>
            </div>
        </div>
    );
}

// Exporting Index component
export default Index;
