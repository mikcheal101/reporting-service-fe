import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}));

import api from '@/app/services/axios';
import { toast } from '@/hooks/use-toast';
import useDownloadReport from '../use-download-report';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useDownloadReport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create blob URL and trigger download on success', async () => {
    const blob = new Blob(['test']);
    const url = 'blob:http://localhost/test';
    const createObjectURL = vi.fn(() => url);
    const revokeObjectURL = vi.fn();
    window.URL.createObjectURL = createObjectURL;
    window.URL.revokeObjectURL = revokeObjectURL;

    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');
    const clickSpy = vi.fn();
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(clickSpy);

    (api.get as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: blob,
      headers: { 'content-disposition': 'attachment; filename="report.pdf"' },
    });

    const { result } = renderHook(() => useDownloadReport(), { wrapper: createWrapper() });

    result.current.mutate('abc-123');

    await waitFor(() => {
      expect(createObjectURL).toHaveBeenCalledWith(blob);
    });

    expect(appendChildSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith(url);
  });

  it('should show error toast on download failure', async () => {
    (api.get as ReturnType<typeof vi.fn>).mockRejectedValue({
      response: { data: { message: 'Download failed' } },
    });

    const { result } = renderHook(() => useDownloadReport(), { wrapper: createWrapper() });

    result.current.mutate('abc-123');

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'destructive' }));
    });
  });
});
