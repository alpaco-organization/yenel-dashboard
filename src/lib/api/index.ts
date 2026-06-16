import type { ErpDataSource } from "./data-source";
import { MockDataSource } from "./mock-data-source";

/**
 * Aktif veri kaynağı.
 * ERP entegrasyonunda yalnızca bu satır değiştirilir:
 *   export const api: ErpDataSource = new LogoDataSource({ baseUrl, apiKey });
 */
export const api: ErpDataSource = new MockDataSource();

export type { ErpDataSource };
