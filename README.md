# Movie Watcher

Backend for an application that lets you track how many times you've watched a movie. It serves as a simple POC for doing ES/CQRS in NestJS. I initially intended to use some functional programming (i.e. the "functional core/imperative shell" pattern), but NestJS doesn't really lend itself to that.

## Tasks

- [x] Add dependencies and code structure
- [x] Add an endpoint to add movies to the database
- [x] Implement an event store
- [x] Add an endpoint to record watching a movie
- [x] Add an endpoint to retrieve data about a movie, including how many times it has been watched
  - [x] Implement computing the entity state from the event store
- [ ] Add an endpoint to retrieve data about a user, including how many movies they have watched
  - [ ] Implement projections

### Notes

- I'm just going to keep track of users by arbitrary strings; there will be no authentication or authorization in this app.
- I will use Flyway to manage the database schema, and I will use Knex as the ORM.
- I will use Zod for validation, instead of Nest's built-in validation.

#### Database

- The user accessing the database needs to have `REPLICATION` privilege. To add this privilege, connect at the admin user and run `ALTER ROLE ${DATABASE_USER} WITH REPLICATION;`.
