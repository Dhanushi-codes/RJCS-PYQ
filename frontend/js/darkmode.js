document.addEventListener('DOMContentLoaded', () => {
  const toggleInput = document.getElementById('darkmode-toggle');

  if (!toggleInput) return;

  // 1. Function to apply theme
  const applyTheme = (isDark) => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      toggleInput.checked = true;
    } else {
      document.body.classList.remove('dark-theme');
      toggleInput.checked = false;
    }
  };

  // 2. Check saved preference on page load (or fallback to system preference)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme === 'dark');
  } else {
    // Check system preference if no saved preference exists
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark);
  }

  // 3. Listen for toggle changes
  toggleInput.addEventListener('change', () => {
    const isDark = toggleInput.checked;
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});