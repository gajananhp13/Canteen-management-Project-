import Link from "next/link";

export default function FeedbackSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-card border rounded-xl shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-3">Thank You! 🎉</h1>
        <p className="text-muted-foreground mb-6">
          Your feedback has been submitted successfully.
        </p>

        <Link
          href="/"
          className="inline-block bg-primary text-primary-foreground px-5 py-2 rounded-md hover:opacity-90 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
