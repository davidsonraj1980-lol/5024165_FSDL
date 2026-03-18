import React from 'react';

function TopBar() {
  return (
    <header className="bg-surface sticky top-0 flex justify-between items-center px-8 h-16 w-full z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-primary tracking-tighter">Precise Finance</h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">notifications</button>
          <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant/30">
            <img alt="User profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC78SdQtreULgLk2jIsJGp0qULxZwyyWT5xfUTjDYJGbNF_tOJoLCslDu8e6uKudFnP9VyMSWEF5ZbuOWTiWGoAJvGixsNBvSDx960PNkp7gaMED1UQfzHF6KwWiVdaLq_-iTj7Q-9_R8MqRGSINOvd0v_OLMiLGT8pWsgyqWF7dxVoGh6Q6w38HOcFh6KMEuRN4LgZly7iMCnmnCT-O7ejbKRzwGENyoO9nO-Pv2IP-DkLtavsqps12tUisx46hpdHkfrd6WcJRj5"/>
          </div>
        </div>
      </div>
    </header>
  );
}
export default TopBar;