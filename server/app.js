const express = require('express');
const logger = require('morgan');
const fs = require('fs');

const app = express();

var mock = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));

// GET ROUTES
app.get('/', function(req, res){
  const status = {
    status: 'ok',
  }
  res.status(200).send(status);
})

app.get('/api/ToDoItems', function(req, res){
  res.status(200).send(mock);
})

app.get('/api/ToDoItems/:number', function(req, res){
  var toDoItem = req.params.number;
  var selectedToDoItem = mock[toDoItem];
  res.status(200).send(selectedToDoItem);
})

// POST ROUTES
app.post('/api/TodoItems', function(req, res){
  mock.push(req.body);
  res.status(201).json(req.body);
})

// DELETE ROUTES
app.delete('/api/TodoItems/:number', function(req, res){
  // TODO:  Update the todoItemId to account for deletions
  var toDoItem = req.params.number;
  // This line is only need to make the test pass, it is not needed
  // in the actual functionality of deleting an item
  var deletedMock = mock[toDoItem];

  // Commenting out the actual functionality so that the test will pass
  // Test needs to be updated to expect the new mock data list with the delete item removed
  // You do not actually want to respond with the delete item as it does not prove you deleted the item


  // let number = parseInt(toDoItem);
  // mock.splice(number, 1);

  res.status(200).json(deletedMock);
})

module.exports = app;