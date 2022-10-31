import { Pagination } from '@core/interfaces/pagination.interface';

export class GenerateUtils {
  public static initPagination(): Pagination {
    return {
      total: 0,
      current_page: 1,
      per_page: 10,
    };
  }
}
