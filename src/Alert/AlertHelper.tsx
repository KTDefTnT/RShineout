const AlertTypes = ['success', 'info', 'warning', 'danger'] as const;
export type AlertType = (typeof AlertTypes)[number];
