export default function Footer() {
    return (
      <footer className="border-t border-border/40 py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Exam Scheduler
      </footer>
    );
  }
  