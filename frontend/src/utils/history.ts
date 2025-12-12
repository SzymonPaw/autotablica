export interface HistoriaPojazduSummary {
  status?: string | null;
}

const VERIFIED_STATUS = 'success';

export const isHistoryVerified = (historia?: HistoriaPojazduSummary | null): boolean => {
  const value = (historia?.status ?? '').toString().toLowerCase();
  return value === VERIFIED_STATUS;
};

export const verifiedHistoryTitle = 'Dane potwierdzone w CEPiK';
