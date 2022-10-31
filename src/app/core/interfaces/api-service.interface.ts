import { Pagination } from "@core/interfaces/pagination.interface";
import { Observable } from "rxjs";

export interface ApiService<T> {
    readonly api: string;
    /**
     * Función que obtiene una lista de datos paginados o no
     * @param param
     * @returns Observable<{data:T[], pagination?:Pagination}>
     */
    list?(param?:any): Observable<{data:T[], pagination?:Pagination}>;

    /**
     * Función que obtiene un dato
     * @param id
     * @returns : Observable<T>
     */
    get?(id: number): Observable<T>;

    /**
     * Función que crea un recurso
     * @param data
     * @returns Observable<T>
     */
    create?(data: T): Observable<T>;

    /**
     * Función que actualiza un recurso
     * @param data
     * @returns Observable<T>
     */
    update?(data: T): Observable<T>;

    /**
     * Función que borra un recurso
     * @param data
     * @returns Observable<void>
     */
    delete?(data: T): Observable<void>;
}
