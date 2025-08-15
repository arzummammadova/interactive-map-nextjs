import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Salam Interaktiv Xəritəyə Xoş Gəlmisiniz
      </h1>

     

      <div className="flex gap-4">
        <Link
          href="/map"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Xəritəyə Keç
        </Link>

        <Link
          href="/search"
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Axtarış
        </Link>
      </div>
    </div>
  );
}
