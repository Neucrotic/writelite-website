# Using WriteLite

## The basics

A quick tour of the essentials: the controls you'll use day to day, and where they live.

### The toolbar

The toolbar above your page has three parts:

- **Formatting** — the usual word-processor controls, where you'd expect them: fonts, size, bold/italic/underline, headings, lists, alignment, and line spacing.
- **Fullscreen** — hides everything but your page. Press it (or F11) to write distraction-free; Esc brings the rest back.
- **Settings** — the gear at the far right, for your preferences and project options.

*[Screenshot: the toolbar, with the three sections — formatting, fullscreen, settings — highlighted separately.]*

### Where everything lives

WriteLite has four areas, and that's the whole map:

- **The sidebar**, on the left, holds your projects, folders, and documents. Click a file to open it. Right-click anywhere in the tree to create, rename, or delete — that's where your file actions live.
- **The toolbar**, above the page, is everything in the section above: formatting, and the settings gear.
- **The page** is the middle. It's just your writing, centred, with room to breathe.
- **The status bar**, along the bottom, is the quiet row: a tick when your work is saved and a dot when it isn't, your filename, and toggles for spellcheck and word count.

Nothing here needs setting up. Open a document and start.

*[Screenshot: the full window, with the four areas — sidebar, toolbar, page, status bar — each outlined and labelled.]*

## Your files & how WriteLite works

Here's the part most writing apps don't tell you: where your work actually goes. With WriteLite the answer is simple — your files are real files on your computer, and they stay that way. This section explains how it all fits together, and why you never have to wonder where your writing went.

### The registry

WriteLite keeps a short list of where your projects are. When you open the app, it reads that list and shows your projects in the sidebar — it doesn't move them or copy them in, it just remembers where you put them.

*Under the hood:* the list is a small file called `writelite.json`, stored in your computer's application-data folder. It holds your project locations, a few preferences, and which project you had open last. It's WriteLite's own bookkeeping — your documents are never kept in here.

### Project folders

A project is just a folder on your computer. You choose where it goes — your Documents, a writing drive, anywhere. Inside are your documents and any folders you make to organise them.

What makes a folder a WriteLite project is a single invisible file that WriteLite tucks inside it. You'll rarely see it, and you can leave it alone — it's what lets WriteLite recognise the folder and remember the project's name, sort order, and which folders you had open. It's the only hidden file in your project; WriteLite's own settings live elsewhere, out of your way.

A project can't live inside another project — keep them as separate top-level folders. Within a project, though, nest as many folders as you like.

Because a project is an ordinary folder, you can move, rename, or copy it like anything else. One ask: don't rename or delete that hidden file outside the app. Even if it does go missing, your writing is never stranded — your documents are separate files, and WriteLite can recover the project by pointing it back at the folder, rebuilding the hidden file as it goes. The most you'd lose is the project's name and saved layout.

### Backup

Your projects are ordinary folders, so backing them up is ordinary too. Put a project folder in a cloud drive — Dropbox, OneDrive, Google Drive — or copy it to a USB stick, and it's backed up. No export step, no special format.

If you keep your projects in a cloud folder, just point WriteLite at them, and you can carry on from any computer running WriteLite.

### Inside a `.wlite` file

Every document you write is saved as a `.wlite` file. Underneath, it's plain markdown — readable text — which is what lets any editor open it.

At the very end of the file, WriteLite adds a small block that starts with `<!-- .wlite:meta`. That's an HTML comment holding a few per-document settings, like line spacing and heading styles. Because it's a comment, other editors treat it as invisible and skip past it. You'll never see it while you write — it's only there so your document opens looking the way you left it.

Best to leave it alone. It isn't meant to be edited by hand, and if WriteLite can't make sense of it — because it's been altered or damaged — it won't try to guess. It simply replaces it with default settings the next time you save the document.

When you set a particular font or size for some words, WriteLite saves that choice inline — as a small `<span>` tag wrapped around those words, right in the text. It's a standard way to mark styling in a markdown file, and it keeps each choice attached to the exact words it applies to, so your formatting stays put wherever the document goes.

Want to open a document somewhere else? Rename it from `.wlite` to `.md` and it opens in any markdown editor — Obsidian, Typora, VS Code, or plain Notepad. Nothing is locked away.

Renaming changes nothing inside the file, so the font `<span>` tags and the `.wlite:meta` comment come along with it. A markdown editor keeps the comment hidden and renders the fonts as styling; a plain text editor will show you the underlying tags. Either way nothing is lost — and opening the file in WriteLite again restores it exactly.
