export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-card text-card-foreground">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">

                <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        © {year} Mountain West Web Development. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}