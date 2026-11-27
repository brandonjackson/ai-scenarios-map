# Sources

One folder per publication behind the scenarios on the map. A framework's sub-scenarios share one folder.

```
sources/<slug>/
  source.json    ← manifest: title, authors, date, URL, archive URL, licence, what was read, which scenarios use it
  fulltext.txt   ← full text, only when the licence allows redistribution (CC, OGL, public domain)
  private/       ← gitignored: full text we can read but not redistribute
```

This is a public repo, so copyrighted full text stays in `private/`. Each scenario's `scenarios/<id>/extract.md` records everything the source says in a fixed structure (see `.claude/skills/find-scenarios/extract-template.md`); summaries, map positions and scores are derived from it.
