import { pensamento } from './pensamento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) {}

  listar(
    pagina: number,
    filtro: string,
    favoritos: boolean
  ): Observable<pensamento[]> {
    const itensPorPagina = 6;

    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', itensPorPagina);

    if (filtro.trim().length > 2) {
      params = params.set('q', filtro);
    }

    if (favoritos) {
      params = params.set('favorito', true);
    }

    return this.http.get<pensamento[]>(this.API, { params });
  }

  criar(pensamento: pensamento): Observable<pensamento> {
    return this.http.post<pensamento>(this.API, pensamento);
  }

  editar(pensamento: pensamento): Observable<pensamento> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<pensamento>(url, pensamento);
  }

  mudarFavorito(pensamento: pensamento): Observable<pensamento> {
    pensamento.favorito = !pensamento.favorito;
    return this.editar(pensamento);
  }

  excluir(id: number): Observable<pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.delete<pensamento>(url);
  }

  buscarPorId(id: number): Observable<pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.get<pensamento>(url);
  }
}
