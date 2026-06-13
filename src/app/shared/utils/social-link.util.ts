let lastLinkOpen: { url: string; time: number } | null = null;

export function openSocialLink(url: string, event?: MouseEvent): void {
  try {
    event?.preventDefault();
    event?.stopPropagation();
  } catch {
    // ignore
  }

  if (typeof window === 'undefined') return;

  const now = Date.now();
  if (lastLinkOpen && lastLinkOpen.url === url && now - lastLinkOpen.time < 500) {
    return;
  }
  lastLinkOpen = { url, time: now };

  try {
    if (url?.toLowerCase().startsWith('mailto:')) {
      const mail = url.replace(/^mailto:/i, '');
      const [toPart, queryString] = mail.split('?');
      const to = toPart || '';

      let gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}`;
      if (queryString) {
        const params = new URLSearchParams(queryString);
        if (params.get('subject')) gmailUrl += `&su=${encodeURIComponent(params.get('subject')!)}`;
        if (params.get('body')) gmailUrl += `&body=${encodeURIComponent(params.get('body')!)}`;
        if (params.get('cc')) gmailUrl += `&cc=${encodeURIComponent(params.get('cc')!)}`;
        if (params.get('bcc')) gmailUrl += `&bcc=${encodeURIComponent(params.get('bcc')!)}`;
      }

      const isMobile =
        typeof navigator !== 'undefined' &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const target = isMobile ? url : gmailUrl;

      const opened = window.open(target, '_blank', 'noopener,noreferrer');
      if (!opened) {
        window.location.href = url;
      }
      return;
    }

    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = url;
  } catch {
    window.location.href = url;
  }
}
