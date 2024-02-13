const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());

// 3.7: Phonebook backend step 7
app.use(morgan('tiny'));

// 3.8*: Phonebook backend step 8
morgan.token('post-data', (req, res) => {
    if (req.method === 'POST') {
      return JSON.stringify(req.body);
    }
    return 'none';
  });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));


let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/info", (req, res) => {
  const info = `
        <p>Phonebook has info for ${persons.length} people.</p>
        <p>Request received at ${new Date()}</p>
    `;
  res.send(info);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const generatedId = () => {
  return Math.floor(Math.random() * (5000 - 10 + 1)) + 10;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "The name or number is missing",
    });
  }

  const nameExists = persons.find((person) => person.name === body.name);
  if (nameExists) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = {
    id: generatedId,
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
