export default function Footer() {
    return (
        <footer className="flex flex-row items-center justify-between h-8 px-2 text-xs text-black bg-gray-100 border-t rounded-t-lg">
            <div>© {new Date().getFullYear()} Ahmad Wafiq Amrillah</div>
            <div>Simple Cipher Application</div>
        </footer>
    );
}