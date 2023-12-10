# Movie Watcher

Backend for an application that lets you track how many times you've watched a movie. It is intended as a simple POC for doing ES/CQRS in NestJS with some functional programming (i.e. the "functional core/imperative shell" pattern).

## Tasks

- [x] Add dependencies and code structure
- [ ] Add an endpoint to add movies to the database
- [ ] Add an endpoint to record watching a movie
- [ ] Add an endpoint to retrieve data about a movie, including how many times it has been watched
- [ ] Add an endpoint to retrieve data about a user, including how many movies they have watched

### Notes

- I'm just going to keep track of users by arbitrary strings; there will be no authentication or authorization in this app.
- I will use Flyway to manage the database schema, and I will use Prisma as the ORM.
- I will use Zod for validation, instead of Nest's built-in validation.
