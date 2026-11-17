# Roadmap

Where Exam Scheduler is going: from a dashboard that shows exams to a tool that plans them, keeps everyone in sync on the day, and still works when a venue's Wi-Fi doesn't. Hours are estimates.

## Now: make the base solid (~16 h)

- [ ] **Status rules on the server** (~4 h). Today the API accepts any status. Enforce the real flow (Pending → Started → Finished, cancel only before Finished), reject anything else with a clear error, and validate requests with Laravel Form Requests.
- [ ] **Status history** (~3 h). Record every change with its time and reason, and show it as a timeline in the exam details.
- [ ] **Tests and CI** (~6 h). Vitest and React Testing Library for the table, filters and status changes; PHPUnit feature tests for both endpoints; GitHub Actions running both on every push.
- [ ] **Create and edit exams** (~3 h to start). A form with validation on both sides (Zod in the browser, Form Requests on the server).

## Next: the bigger features

- [ ] **Auto-scheduler** (~20 h). Give it exams, centres, rooms with capacities, invigilators and candidates, and it proposes a timetable: no candidate in two places at once, no room over capacity, enough invigilators per room, and exams kept within each centre's opening hours. A constraint solver (backtracking with a greedy first pass and local search to improve it), running in a Web Worker so the page stays responsive, and explaining why anything it couldn't place didn't fit.
- [ ] **Time zones done properly** (~5 h). Every exam shows the centre's local time and yours, and handles daylight-saving changes correctly. Exams in other time zones are where scheduling tools usually go wrong, so this comes with tests for the edge cases.
- [ ] **Calendar and timeline view** (~12 h). A week view, and a timeline with one row per centre. Drag an exam to move it, and see clashes highlighted before you drop it.
- [ ] **Live exam day board** (~10 h). When one coordinator starts or cancels an exam, everyone else sees it at once, through WebSockets (Laravel Reverb), with a "live" indicator and a feed of changes.
- [ ] **Works offline at the venue** (~10 h). Make it an installable app (PWA). Status changes made without a connection are queued and sent when it comes back, with a clear rule for what wins if two people changed the same exam.
- [ ] **A better map** (~8 h). Move to MapLibre with OpenStreetMap tiles, so no API key is needed. Markers coloured by status, clustering when zoomed out, and filters shared with the sessions table.
- [ ] **Exports** (~3 h). Add an exam to your calendar (.ics), and download a centre's timetable as CSV.

## Design

- [ ] **UI refresh** (~10 h). One consistent design system for the table, details and map: light and dark themes, loading skeletons, helpful empty states, a proper card layout on phones, and full keyboard use of the table.
- [ ] **Accessibility pass** (~3 h). Screen-reader labels, focus order, colour contrast, and status shown by more than colour alone.

## Not planned

- **Real candidate data.** The project uses only invented names and exams. It won't import or store real people's data.
- **Accounts and logins.** Not needed while it's a single-team tool.
