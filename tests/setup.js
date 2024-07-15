import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import createFetchMock from 'vitest-fetch-mock'
import * as matchers from "@testing-library/jest-dom/matchers";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

expect.extend(matchers);

const MockIntersectionObserver = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
}))
vi.stubGlobal(`IntersectionObserver`, MockIntersectionObserver)
afterEach(() => {
    cleanup();
});