## Model Use
I typically use Gemini for AI tasks, but the free tier rate limits are strict. Instead, I used kat-coder-pro this time because it is free. 

Online, kat-coder-pro has some negative feedback, but I found it was plenty powerful for completely free use.

## Tooling
I use the cline extension for coding tasks and the gemini web UI for general questions. I would like to try Cursor, but my company does not cover that, so I a have not tried it yet.

## Approach
I started the project by outlining the key design decisions - which technologies, how to integrate the moving pieces, and a general list of steps. That was an early form of `docs/project-overview.md`
I feel it is essential to do this step first, because if not the AI agents tend to run amok and lack cohesion. I really like being able to reference this core guiding document when prompting.

Funnily, I asked the AI to rewrite the project-overview.md file for better clarity when using it as context for other AI tasks. While this made it a bit wordy, I think it actually helped a lot. That was a good idea.

From there, I set up the backend using `pnpm create hono my-app` as I think its best to do these steps manually. 
After that I let the AI loose.

Generally, I prompted fairly large but well defined tasks. Things like, "Read the assessment guidelines and create a prisma schema file based on it" and "Create a route file that allows users to create a product".
After that, it is just a process of progressively iterating until it matches the overall plan in my head.
Expanding routes, adding validation, adding tests, etc.

The same strategy applied to the frontend, but it was a bit more hands on, as I found the AI struggling more. But overall, large tasks were all handled by the AI agent. Configuration, setup, and project-level-context was handled by me, directly.

Sometimes, more guidance is needed, especially if I have non-standard preferences. In these cases I create additional markdown files to reference. Different tooling has different ways of including these, cline calls them "rules". An example of this is the `/docs/api-standards.md` file. If you don't provide a clear pattern for the AI to follow, it will lack consistency.

Similarly, sometimes I have to write one example first, then use AI to propagate it out. _Reference the functionality X in file Y, then apply that pattern to file Z_ style prompting works well, in my experience.

## The Good
Moved fast. For a basic project like this, the AI performs very well. It has a good understanding of hono, react, typescript. Definitely helped catch issues early.

## The bad
- It did not understand arktype.
- It kept trying to use zod, even when instructed not to
- Tough to have it figure out which shadcn ui components are needed, I had to guess and install them manually ahead of time
- When asking to fix tests, sometimes it would simply adjust the test expected result. Instead of fixing the actual logic


