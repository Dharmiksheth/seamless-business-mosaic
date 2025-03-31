
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Task, Employee } from "@/lib/types";
import { getTasks, getEmployees } from "@/lib/mockData";
import { Calendar, Clock, Plus, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form schema for task validation
const taskSchema = z.object({
  title: z.string().min(2, { message: "Task title is required" }),
  description: z.string().min(2, { message: "Description is required" }),
  assigneeId: z.string().optional(),
  dueDate: z.string().min(2, { message: "Due date is required" }),
  status: z.enum(["todo", "in-progress", "completed"]),
  priority: z.enum(["low", "medium", "high"]),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Initialize the form
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      assigneeId: undefined,
      dueDate: new Date().toISOString().split('T')[0],
      status: "todo",
      priority: "medium",
    },
  });

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        const tasksData = getTasks();
        const employeesData = getEmployees();
        setTasks(tasksData);
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast({
          title: "Error",
          description: "Failed to load tasks or employees",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const onSubmit = (data: TaskFormValues) => {
    // Find the assigned employee if provided
    const assignee = data.assigneeId 
      ? employees.find(emp => emp.id === data.assigneeId)
      : undefined;
    
    // Create new task
    const newTask: Task = {
      id: `${tasks.length + 1}`,
      title: data.title,
      description: data.description,
      assignee: assignee,
      dueDate: data.dueDate,
      status: data.status,
      priority: data.priority,
    };
    
    setTasks([newTask, ...tasks]);
    
    toast({
      title: "Task Added",
      description: `${data.title} has been created successfully`,
      variant: "success",
    });
    
    setIsDialogOpen(false);
    form.reset();
  };

  const getPriorityBadge = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="warning">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const getStatusBadge = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return <Badge variant="outline">To Do</Badge>;
      case "in-progress":
        return <Badge variant="warning">In Progress</Badge>;
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      default:
        return <Badge variant="outline">To Do</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track work tasks
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to your team's workflow
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Task title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Task details" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="assigneeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assignee</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select assignee" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employees.map(employee => (
                              <SelectItem key={employee.id} value={employee.id}>
                                {employee.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="todo">To Do</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Task</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-md border border-dashed p-10 text-center">
          <h2 className="text-xl font-medium">No Tasks Yet</h2>
          <p className="text-muted-foreground mt-2">
            Create your first task by clicking the "New Task" button above
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <TaskColumn 
            title="To Do" 
            tasks={tasks.filter(task => task.status === 'todo')}
            getPriorityBadge={getPriorityBadge}
            onStatusChange={(taskId, newStatus) => {
              setTasks(tasks.map(task => 
                task.id === taskId ? { ...task, status: newStatus } : task
              ));
              toast({ 
                title: "Task Updated", 
                description: "Task status has been updated" 
              });
            }}
          />
          
          <TaskColumn 
            title="In Progress" 
            tasks={tasks.filter(task => task.status === 'in-progress')}
            getPriorityBadge={getPriorityBadge}
            onStatusChange={(taskId, newStatus) => {
              setTasks(tasks.map(task => 
                task.id === taskId ? { ...task, status: newStatus } : task
              ));
              toast({ 
                title: "Task Updated", 
                description: "Task status has been updated" 
              });
            }}
          />
          
          <TaskColumn 
            title="Completed" 
            tasks={tasks.filter(task => task.status === 'completed')}
            getPriorityBadge={getPriorityBadge}
            onStatusChange={(taskId, newStatus) => {
              setTasks(tasks.map(task => 
                task.id === taskId ? { ...task, status: newStatus } : task
              ));
              toast({ 
                title: "Task Updated", 
                description: "Task status has been updated" 
              });
            }}
          />
        </div>
      )}
    </div>
  );
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  getPriorityBadge: (priority: Task["priority"]) => React.ReactNode;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
}

function TaskColumn({ title, tasks, getPriorityBadge, onStatusChange }: TaskColumnProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title} <span className="text-muted-foreground ml-2 text-sm">({tasks.length})</span></CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-3 px-2">
          {tasks.length === 0 ? (
            <div className="py-4 text-center text-sm text-muted-foreground">
              No tasks in this column
            </div>
          ) : (
            tasks.map(task => (
              <Card key={task.id} className="shadow-sm">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{task.title}</h3>
                    {getPriorityBadge(task.priority)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {task.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-3 w-3" />
                      <span>{task.assignee?.name || "Unassigned"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-3 py-2 border-t">
                  <div className="flex justify-end w-full gap-2">
                    {title !== "To Do" && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onStatusChange(task.id, "todo")}
                      >
                        Move to Todo
                      </Button>
                    )}
                    {title !== "In Progress" && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onStatusChange(task.id, "in-progress")}
                      >
                        In Progress
                      </Button>
                    )}
                    {title !== "Completed" && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onStatusChange(task.id, "completed")}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
