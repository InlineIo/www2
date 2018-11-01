## inline.io

web and api

### TODO

- [x] Handle duplicate organization error message
- [x] Handle duplicate email error message
- [x] Do not create org if user already exists
- [ ] Add role to user
- [ ] Set user as owner when org is created
- [ ] If sign up works add user to session
- [X] If sign up works redirect to setup page
- [ ] Clean up sign up handler code, extract common patterns
- [ ] Add api documentation for sign up
- [ ] Extract error handling code into its own.
- [ ] Stimulus custom base controller to avoid duplicated code
- [ ] Enable sign in for users (token in session).
- [ ] Display sign in errors.
- [ ] Enable remember me.
- [ ] Enable reset pwd email.
- [ ] Create workflows (status)
- [ ] Create swim-lanes
- [ ] Create milestones
- [ ] Create projects

Betterez -> Org
Swim-lane -> can associate to a repository
Milestones -> (global, per project, for both?)
Grupo senda -> Project
  Epics -> sub cases can be moved into their own will keeping a link to the Epic. (used to group cases to complete a feature)
  Cases ->
    Can have tasks (tasks can be converted on cases, inherit all attributes from case).
  Swimlanes