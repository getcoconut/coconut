// This example is kept intentionally very simple, without data validation
// and error handling, so please don't use as a reference for your production
// code!

import cloud = require('@pulumi/cloud');
import express = require('express');
import { uuid } from 'uuidv4';

const todosTable = new cloud.Table('todos');

const server = new cloud.HttpServer('api', () => {
  const app = express();

  app.use(express.json());

  app.get('/todos', async (req, res) => {
    const todos = await todosTable.scan();

    res.json(todos);
  });

  app.post('/todos', async (req, res) => {
    const todo = { id: uuid(), ...req.body };

    await todosTable.insert(todo);

    res.json(todo);
  });

  app.get('/todos/:id', async (req, res) => {
    const todo = await todosTable.get({ id: req.params.id });

    todo ? res.json(todo) : res.status(404).end();
  });

  app.put('/todos/:id', async (req, res) => {
    const todo = await todosTable.get({ id: req.params.id });

    if (!todo) {
      return res.status(404).end();
    }

    await todosTable.update({ id: req.params.id }, req.body);

    res.status(201).end();
  });

  app.delete('/todos/:id', async (req, res) => {
    await todosTable.delete({ id: req.params.id });

    res.status(201).end();
  });

  return app;
});

export const api = server.url;
