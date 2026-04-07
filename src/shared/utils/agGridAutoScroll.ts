export const agGridAutoScroll = (block: 'start' | 'center' | 'end' | 'nearest' = 'center') => {
  setTimeout(() => {
    const active = document.activeElement as HTMLElement | null;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
      const scrollContainer = active.closest('.ag-body-viewport') || active.closest('.ag-theme-alpine');
      if (typeof active.scrollIntoView === 'function') {
        if (scrollContainer) {
          active.scrollIntoView({ behavior: 'smooth', block: block, inline: 'nearest' });
        } else {
          active.scrollIntoView({ behavior: 'smooth', block: block, inline: 'nearest' });
        }
      }
    }
  }, 0);
};
