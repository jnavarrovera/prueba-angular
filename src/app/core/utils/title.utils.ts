import { ActivatedRouteSnapshot } from '@angular/router';
import { PATHS } from '@core/constants/paths.constants';

const routeTitles = [
  { title: 'Nuevo héroe', path: PATHS.HEROES_NEW },
  { title: 'Editar héroe', path: PATHS.HEROES_EDIT },
  { title: 'Lista de héores', path: PATHS.HEROES },
];
export class TitleUtil {
  public static getRouteTitle(path: string) {
    const routeTitle = routeTitles.find((rt) =>
      `/${path}`.startsWith(`${rt.path}`)
    );
    return routeTitle ? routeTitle.title : null;
  }

  public static getResolvedUrl(route: ActivatedRouteSnapshot): string {
    let url = route.pathFromRoot
      .filter((v) => v.url.length > 0)
      .map((v) => v.url.map((segment) => segment.toString()).join('/'))
      .join('/');
    const queryParam = route.queryParamMap;
    if (queryParam.keys.length > 0) {
      url +=
        '?' +
        queryParam.keys
          .map((key) =>
            queryParam
              .getAll(key)
              .map((value) => key + '=' + value)
              .join('&')
          )
          .join('&');
    }

    return url;
  }
}
