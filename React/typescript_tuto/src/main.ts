// Utility Types

// Partial

interface Todo {
  title: string;
  description: string;
}

const updateTodo = (todo: Todo, fieldsToUpdate: Partial<Todo>): Todo => {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: 'organize desk',
  description: 'clear clutter',
};

console.log(updateTodo(todo1, { description: 'throw out trash' }));
const todoGenerated: Todo = updateTodo(todo1, { description: 'throw out trash' });

// Required and Readonly

const recordTodo = (todo: Required<Todo>): Todo => {
  return todo;
}

// const todoVerified: Readonly<Todo> = {...todoGenerated, verified: true};


// recordTodo({...todoGenerated, verified: true})


// Record

const hexColorMap: Record<string, string> = {
  '0x0000': 'black',
  '0xffffff': 'white',
  '0xff0000': 'red',
  '0x00ff00': 'green',
  '0x0000ff': 'blue',
};

type Students = 'student1' | 'student2' | 'student3';
type LetterGrades = 'A' | 'B' | 'C' | 'D' | 'F';

const finalGrades: Record<Students, LetterGrades> = {
  student1: 'A',
  student2: 'C',
  student3: 'B',
};


interface Grades {
  assign1: number;
  assign2: number;
}

const gradeData: Record<Students, Grades> = {
  student1: { assign1: 100, assign2: 100 },
  student2: { assign1: 85, assign2: 90 },
  student3: { assign1: 90, assign2: 80 },
};

