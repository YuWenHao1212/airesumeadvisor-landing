# Tasks

Implementation documents organized by status.

## Structure

```
docs/tasks/
├── backlog/        <- Pending tasks (not started)
├── in-progress/    <- Currently working on
└── README.md

docs/tasks-done/    <- Completed tasks (archived)
```

## Workflow

```
backlog/ → in-progress/ → ../tasks-done/
```

1. **Plan**: Create task document in `backlog/`
2. **Start**: Move to `in-progress/` when beginning work
3. **Complete**: Move to `../tasks-done/` when finished

## Naming Convention

- Single file: `YYYY-MM-DD-task-name.md`
- Complex task: `task-name/` folder with multiple docs

## Template

```markdown
# [Task Name]

**Created**: YYYY-MM-DD
**Status**: Backlog | In Progress | Done
**Related**: Cockpit daily/YYYY-MM-DD.md

---

## Objective

What are we trying to accomplish?

---

## Implementation

### Step 1: ...

### Step 2: ...

---

## Result

- [ ] Task completed
- [ ] Tests passing
- [ ] Documentation updated

---

## Notes

Any additional notes or learnings.
```

## Integration with Cockpit

- High-level planning: `~/Cockpit/daily/YYYY-MM-DD.md`
- Implementation docs: This folder
- Cross-project status: `~/Cockpit/projects/OVERVIEW.md`
