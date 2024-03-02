"use strict";
// Utility Types
const updateTodo = (todo, fieldsToUpdate) => {
    return Object.assign(Object.assign({}, todo), fieldsToUpdate);
};
const todo1 = {
    title: 'organize desk',
    description: 'clear clutter',
};
console.log(updateTodo(todo1, { description: 'throw out trash' }));
const todoGenerated = updateTodo(todo1, { description: 'throw out trash' });
// Required and Readonly
const recordTodo = (todo) => {
    return todo;
};
// const todoVerified: Readonly<Todo> = {...todoGenerated, verified: true};
// recordTodo({...todoGenerated, verified: true})
// Record
const hexColorMap = {
    '0x0000': 'black',
    '0xffffff': 'white',
    '0xff0000': 'red',
    '0x00ff00': 'green',
    '0x0000ff': 'blue',
};
const finalGrades = {
    student1: 'A',
    student2: 'C',
    student3: 'B',
};
const gradeData = {
    student1: { assign1: 100, assign2: 100 },
    student2: { assign1: 85, assign2: 90 },
    student3: { assign1: 90, assign2: 80 },
};
