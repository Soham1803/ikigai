import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { deleteTask } from "@/lib/db";
import { Task } from "@/types";
import { Trash2 } from "lucide-react";

interface TaskListProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

function TaskList(props: TaskListProps) {

    const handleRemoveTask = (id: string) => {
        props.setTasks(prev => prev.filter(task => task.id !== id));
        deleteTask(id);
    }

    return (
        <div className="flex flex-col justify-start gap-2 w-full overflow-y-auto h-[55%]">
            {props.tasks.map((_, index) => (
                <div key={index} className="flex flex-row w-full h-20 border-2 border-yellow-600 items-center justify-between p-6 rounded-xl">
                    <span className="flex flex-row items-center gap-3">
                        <Checkbox className="border-yellow-600" id="box"/>
                        <Label className="text-lg" htmlFor="box">Title</Label>
                    </span>
                    <div className="text-sm">Progress</div>
                    <Trash2 className="hover:text-red-600 active:text-red-400" onClick={() => handleRemoveTask(_.id)} />
                </div>
            ))}
        </div>
    )

}

export default TaskList;