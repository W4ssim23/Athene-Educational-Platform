import Link from "next/link";

export default function BackButton() {
  return (
    <Link href="/chat">
      <div className="flex items-center gap-2 sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          viewBox="0 0 20 20"
          fill="#4D44B5"
        >
          <path
            fillRule="evenodd"
            d="M12.293 4.293a1 1 0 011.414 1.414L9.414 10l4.293 4.293a1 1 0 01-1.414 1.414l-4.707-4.707a1 1 0 010-1.414l4.707-4.707z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </Link>
  );
}
