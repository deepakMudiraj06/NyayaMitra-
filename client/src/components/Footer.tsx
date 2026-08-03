function Footer() {
  return (
    <footer className="border-t mt-20 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">NyayaMitra AI</h2>
          <p className="text-gray-600 mt-2">
            Making Legal Knowledge Accessible for Everyone.
          </p>
        </div>

        <div className="flex gap-6 mt-6 md:mt-0">
          <a href="#" className="hover:text-gray-500">
            Privacy
          </a>

          <a href="#" className="hover:text-gray-500">
            Terms
          </a>

          <a href="#" className="hover:text-gray-500">
            Contact
          </a>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-8">
        © 2026 NyayaMitra AI. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;