import { useState, useEffect, useRef } from "react";
import "./App.css";
import { cn } from "./lib/utils";
import { getDay } from "date-fns";
import Carousel from "./my-components/Carousel3D";
import { CalendarRange, ChartLine, CircleDot, House, Plus, User } from "lucide-react";
import TaskList from "./my-components/TaskList";
import { Task } from "@/types"
import { createTable, insertTask, getTasks, clearTasks } from "./lib/db";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger, DialogDescription, DialogTitle } from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select, SelectItem, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectLabel } from "./components/ui/select";

function App() {
 
  const today = new Date();
  const [currDate, setCurrDate] = useState<Date>(today);
  const [tasks, setTasks] = useState<Task[]>([]);

  const initDb = async () => {
    try {
      await createTable();
    } catch(error) {
      console.error("Error creating table", error);
    }
  }

  const fetchTasks = async () => {
    try {
      const tasks = await getTasks() as Task[];
      setTasks(tasks);
      console.log("Tasks: ", tasks);
    } catch(error) {
      console.error("Error fetching tasks", error);
    }
  }

  const vacantTasks = async () => {
    try {
      await clearTasks();
    } catch(error) {
      console.error("Error clearing tasks", error);
    }
  }

  const handleTaskAdd = async () => {
    
    // setTasks(prev => [...prev, {title: "New Task", date: currDate.toISOString+"", status: "In Progress", completed: false}]);
    await insertTask({title: "New Task", date: currDate.toISOString+"", status: "In Progress", completed: false});
    fetchTasks();
  }
  
  useEffect(() => {
    initDb();
    // vacantTasks();
    fetchTasks();
    // deleteTable();
  }, []);

  
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

        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center p-4 rounded-full bg-blue-500 border-4 border-[#1e1e1e]">  
          <Dialog >
            <DialogTrigger>
              <div onClick={handleTaskAdd} className="flex items-center justify-center">
                <Plus />
              </div>
            </DialogTrigger>
            <DialogContent className="flex flex-col w-5/6  justify-center p-5 rounded-xl bg-[#0e0e0e] border-0 drop-shadow-md shadow-[#303030]">
              <DialogHeader className="flex flex-col items-start mb-3">
                <DialogTitle className="text-lg font-bold">Add Task</DialogTitle>
                <DialogDescription>Add a new task to the list.</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="task-title" className="font-semibold ml-2">Title</Label>
                  <Input id="task-title" type="text" placeholder="Task Title" />
                </div>
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="flex flex-col gap-2 w-1/2">
                    <Select  >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e1e1e] border-0 rounded-lg drop-shadow-lg shadow-[#303030] text-[#e1e1e1]">
                        <SelectGroup>
                          <SelectItem value="0">No Category</SelectItem>
                          <SelectItem value="1">Work</SelectItem>
                          <SelectItem value="2">Personal</SelectItem>
                          <SelectItem value="3">Shopping</SelectItem>
                          <SelectItem value="4">Others</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2 w-1/2">                    
                    <Select  >
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e1e1e] border-0 rounded-lg drop-shadow-lg shadow-[#303030] text-[#e1e1e1]">
                        <SelectGroup>
                          <SelectLabel>Priority</SelectLabel>
                          <SelectItem value="1"><div className="flex items-row items-center"><CircleDot className="scale-50 text-red-500" /> High</div></SelectItem>
                          <SelectItem value="2"><div className="flex items-row items-center"><CircleDot className="scale-50 text-yellow-500" />Medium</div></SelectItem>
                          <SelectItem value="3"><div className="flex items-row items-center"><CircleDot className="scale-50 text-green-500" />Low</div></SelectItem>
                        </SelectGroup>                                                                         
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-center justify-between">
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="deadline" className="font-semibold ml-2">Deadline</Label>
                    <Input id="deadline" type="time" aria-label="Deadline time" />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="date" className="font-semibold ml-2">Why?</Label>
                    <Select  >
                      <SelectTrigger>
                        <SelectValue placeholder="Motivation" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e1e1e] border-0 rounded-lg drop-shadow-lg shadow-[#303030] text-[#e1e1e1]">
                        <SelectGroup>
                          <SelectLabel>Motivation</SelectLabel>
                          <SelectItem value="AM">Want to do 😌</SelectItem>
                          <SelectItem value="PM">Have to do 😕</SelectItem>
                        </SelectGroup>                                                                         
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                <Label htmlFor="date" className="font-semibold ml-2">Estimated time</Label>
                <div className="flex flex-row gap-1 items-center w-full">  
                  <Select  >
                    <SelectTrigger>
                      <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e1e1e] border-0 rounded-lg drop-shadow-lg shadow-[#303030] text-[#e1e1e1]">
                      <SelectGroup>
                        {Array.from({length: 24}).map((_, index) => (
                          <SelectItem key={index} value={(index+1).toString()}>{index+1}</SelectItem>
                        ))}
                      </SelectGroup>                                                                         
                    </SelectContent>
                  </Select>
                  <Select  >
                    <SelectTrigger>
                      <SelectValue placeholder="Mins" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e1e1e] border-0 rounded-lg drop-shadow-lg shadow-[#303030] text-[#e1e1e1]">
                      <SelectGroup>
                        {Array.from({length: 60}).map((_, index) => (
                          <SelectItem key={index} value={(index+1).toString()}>{index+1}</SelectItem>
                        ))}
                      </SelectGroup>                                                                         
                    </SelectContent>
                  </Select>
                </div>
                </div>
              </div>

              <DialogFooter className="flex justify-end mt-5">
                <button className={"px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-300 active:bg-blue-200"}>Add Task</button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
