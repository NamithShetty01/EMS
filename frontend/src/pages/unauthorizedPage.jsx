
const UnauthorizedPage = () => {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-[radial-gradient(circle_at_bottom_right,_#fee2e2,_#f8fafc_45%)]">
        <div className="app-card p-8 rounded-2xl text-center max-w-md w-full">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Access Control</p>
          <h1 className="text-4xl font-extrabold text-rose-600 mt-2 mb-4">403 - Unauthorized</h1>
          <p className="text-base text-slate-600 mb-6">
            You don’t have permission to view this page.
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="/login"
              className="app-btn-secondary"
            >
              Back to Login
            </a>
            <a
              href="/"
              className="app-btn-primary"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default UnauthorizedPage;
  