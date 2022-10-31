export class ParseUtils {
  public static jsonToUrlParams(json: { [key: string]: any }): string {
    let urlParams = '';
    if (json) {
      for (let [key, value] of Object.entries(json)) {
        if (urlParams === '') {
          urlParams += '?';
        } else {
          urlParams += '&';
        }
        urlParams += `${key}=${value}`;
      }
    }
    return urlParams;
  }
}
