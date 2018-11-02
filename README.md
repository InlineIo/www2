## inline.io

web and api

### TODO

- [x] Handle duplicate organization error message
- [x] Handle duplicate email error message
- [x] Do not create org if user already exists
- [x] Add role to user
- [x] Set user as owner when org is created
- [x] If sign up works add user to session
- [X] If sign up works redirect to setup page
- [ ] Enable sign in for users (token in session)
- [ ] Clean up sign up handler code, extract common patterns
- [ ] Add api documentation for sign up
- [ ] Extract error handling code into its own.
- [ ] Stimulus custom base controller to avoid duplicated code
- [ ] Display sign in errors.
- [ ] Enable remember me.
- [ ] Enable reset pwd email.
- [ ] Create projects
- [ ] Create workflows (status)
- [ ] Create a default workflow (non modifiable)
- [ ] Create swim-lanes
- [ ] Create milestones

Betterez -> Org
Swim-lane -> can associate to a repository
Milestones -> (global, per project, for both?)
Grupo senda -> Project
  Epics -> sub cases can be moved into their own will keeping a link to the Epic. (used to group cases to complete a feature)
  Cases ->
    Can have tasks (tasks can be converted on cases, inherit all attributes from case).
  Swimlanes