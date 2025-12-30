# Show Us What You've Got!

To be successful in this role, you must have competence and experience across the full stack. We also specifically want you to use your preferred agentic coding tools. Use the deliverables to give us insight into how you create software. We want to get a feel for how you gain understanding, how you approach solutions, and - perhaps most importantly - how you explain your process and final results.

Use your normal tooling and approach. If you are implementing in Typescript, use React, Hono (this is not required - if you have a different router you like, go crazy), and your preferred ORM (or no ORM at all!). If you're implementing in Laravel, feel free to lean into the defaults.

To be successful at REDACTED, you must be an excellent communicator. The final deliverable will be a link to a repo on your Github that includes the final code, a README.md, and an AI.md. We are intentionally not providing any templates.

## Deliverables

### README.md
Use this to tell us how to stand up and run your solution and also to list any assumptions, open questions, or other information that helps us understand you as a developer.

### AI.md
Use this to show us how you used your AI tooling. Provide a narrative overview of your AI-assisted coding workflow as well as notes on what went well and poorly during your implementation of this project.

## Requirements

Build an SPA and an API. The application must run locally (i.e., we will clone the repo and follow your instructions to get to a web page where we can exercise the application functionality). You may use Docker and a relational database, npm start with a SQLite database or local JSON file serialization, or anything in between. As you are making your choices, just treat it like a project where you will eventually be onboarding other developers.

## Data

Create a data set using the following template:

```json
[
  {
    "id": 1,
    "title": "Large Flux Capacitor",
    "description": "The Large Flux Capacitor provides the maximum motive force for your inter-dimensional aluminum automobile.",
    "category": "automotive",
    "price": 9.99,
    "stock": 42,
    "brand": "ACME",
    "sku": "ACM-FC-001",
    "weight": 4,
    "meta": {
      "createdAt": "2025-04-30T09:41:02.053Z",
      "updatedAt": "2025-04-30T09:41:02.053Z"
    }
  },
  {
    "id": 2,
    "title": "Medium Flux Capacitor",
    "description": "The Medium Flux Capacitor is a great budget option if you don't need to travel far in your inter-dimensional aluminum automobile.",
    "category": "automotive",
    "price": 5.99,
    "stock": 42,
    "brand": "ACME",
    "sku": "ACM-FC-002",
    "weight": 3.25,
    "meta": {
      "createdAt": "2025-04-29T19:36:02.053Z",
      "updatedAt": "2025-04-30T09:41:02.053Z"
    }
  },
  { "...": "..." },
  { "...": "..." }
]
```

## API

Create an API for your application that implements the specified signatures. Do your normal thing with unit and other tests, Github actions, etc.

### Required Signatures

- **Get all products** (return 30 items by default)
- **Get a single product**
- **Search products** using name or description (a case-insensitive exact string match is fine)
- **Add a new product** (POST)
- **Update a product** (PUT or PATCH)
- **Delete a product**

### Optional Signatures

- Sorting and ordering
- Create new product category
- Get all product categories
- Get product category list
- Get products by category

## SPA

Create an interface that exercises the API. Make reasonable choices for design. For example, you could create a dashboard that lists summaries of all products as the home page, and then appropriate options for drilling into product details and creating, editing, and deleting products.

## Process

For time budgeting purposes, plan to spend **60-90 minutes** on this project. This is not a timed assessment, per se—no extra points (or demerits) for being faster or slower. If you end up with any incomplete portions, explain what you would do next.

Be sure to tell us what product decisions you made to clarify or extend the provided specification. After you've completed your implementation of the supplied specification, add at least one feature or piece of functionality that is not specified. Explain what problem the feature solves, who would use it, and why you chose it.

## Deliverables

- A link to a Github repository containing the application, including the README.md and AI.md as described above.
- A screen capture video of your coding session.
