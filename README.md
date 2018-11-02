## inline.io

web and api

### TODO

- [x] Handle duplicate organization error message
- [x] Handle duplicate email error message
- [x] Do not create org if user already exists
- [x] Add role to user
- [x] Set user as owner when org is created
- [x] If sign up works add user to session
- [x] If sign up works redirect to setup page
- [x] Sign out (close session)
- [x] Enable sign in for users (token in session)
- [x] Display sign in errors.
- [x] Clean up sign up handler code, extract common patterns
- [x] Extract error handling code into its own.
- [ ] Stimulus custom base controller to avoid duplicated code
- [ ] Update templates with changes above
- [ ] Add api documentation for sign up
- [ ] Create projects and assign to organization
- [ ] Create workflows (status)
- [ ] Create a default workflow (non modifiable)
- [ ] Create swim-lanes
- [ ] Create milestones/releases
- [ ] Create tags
- [ ] Create cases
- [ ] Create main views
- [ ] On sign in redirect to main views
- [ ] Enable remember me.
- [ ] Enable reset pwd email.

Betterez -> Org
Swim-lane -> can associate to a repository
Milestones -> (global, per project, for both?)
Grupo senda -> Project
  Epics -> sub cases can be moved into their own will keeping a link to the Epic. (used to group cases to complete a feature)
  Cases ->
    Can have tasks (tasks can be converted on cases, inherit all attributes from case).
  Swimlanes