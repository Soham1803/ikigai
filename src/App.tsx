import { useState, useEffect, useRef } from "react";
import "./App.css";
import { cn } from "./lib/utils";
import { getDay } from "date-fns";
import Carousel from "./my-components/Carousel3D";
import { CalendarRange, ChartLine, House, NotebookText, Plus, User } from "lucide-react";
import TaskList from "./my-components/TaskList";

export interface Task {
  id: string;
  title: string;
  status: string;
  completed: boolean;
}

function App() {
 
  const today = new Date();
  const [currDate, setCurrDate] = useState<Date>(today);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTaskAdd = () => {
    
    setTasks(prev => [...prev, {id: tasks.length.toString(), title: "New Task", status: "In Progress", completed: false}]);
  }
  
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 

  const items = Array.from({length: 5}).map((_, index) => (
    <div key={index} className="flex flex-col w-full h-full items-center justify-evenly p-2 text-4xl font-bold">
        <h2 className="text-2xl">{weekDays[getDay(currDate)]}</h2>
        <h1 className="text-6xl">{currDate.getDate()}</h1>
        <h2 className="text-2xl">{monthNames[currDate.getMonth()]}</h2>
    </div>));


  return (
    <main className="flex flex-col justify-between items-center w-full h-full overflow-hidden backdrop-blur-3xl ">
      <div className="w-full h-1/4 mt-10">
        <div className="flex flex-row justify-between items-center gap-1 w-screen h-full">
          <Carousel items={items} setCurrDate={setCurrDate} />
        </div>
      </div>

      <TaskList tasks={tasks} setTasks={setTasks} />

      <div className="relative flex flex-row items-center justify-between px-8 w-full h-[8%] bg-blue-500 rounded-3xl">
        <div onClick={handleTaskAdd} className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center p-4 rounded-full bg-blue-500 border-4 border-black hover:bg-blue-400 active:bg-blue-300">
          <Plus />
        </div>
        <House />
        <CalendarRange />
        <div />
        <ChartLine />
        <User />
      </div>
      
    </main>
  );
}

export default App;
