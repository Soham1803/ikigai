// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Textarea } from "@/components/ui/textarea"


function App() {

  // async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    // setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <main className="flex flex-col justify-start items-center w-full h-full">
      {/* Show dates */}
      <div className="w-full bg-red-500 h-1/4 overflow-x-scroll mt-10">
        <div className="flex flex-row justify-evenly items-center gap-2 min-w-max h-full py-2" >
          {Array.from({length: 5}, (i: number, _) => (
            <div className="w-[100px] h-full bg-red-600">
              <h1>Day {_+1}</h1>
            </div> 
          ))}
        </div> 
      </div>

      {/* Show time slots */}
      <div className="flex flex-col items-center justify-evenly w-full h-3/4 overflow-y-scroll">
        <div className="flex flex-box items-center justify-evenly w-[90%] h-[90%] p-3 rounded-lg border-white border-2">
          <Textarea className="p-4 border-2" placeholder="Task Name"/>
          
          
        </div>
      </div>

      {/* Deck  */}
      <div className="w-full h-1/6 bg-blue-500">
        <div className="flex flex-row justify-evenly items-center gap-2 min-w-max h-full py-2" >
          
        </div>
      </div>
    </main>
  );
}

export default App;
