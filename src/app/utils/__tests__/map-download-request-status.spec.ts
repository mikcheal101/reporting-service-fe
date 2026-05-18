import { describe, it, expect } from 'vitest';
import mapDownloadRequestStatus from '../map-download-request-status';

describe('mapDownloadRequestStatus', () => {
  it('should return "New" for New', () => { expect(mapDownloadRequestStatus(0)).toBe('New'); });
  it('should return "InProgress" for InProgress', () => { expect(mapDownloadRequestStatus(1)).toBe('InProgress'); });
  it('should return "Done" for Completed', () => { expect(mapDownloadRequestStatus(2)).toBe('Done'); });
  it('should return "Downloaded" for Downloaded', () => { expect(mapDownloadRequestStatus(3)).toBe('Downloaded'); });
  it('should return "Unknown" for unknown', () => { expect(mapDownloadRequestStatus(99)).toBe('Unknown'); });
});
