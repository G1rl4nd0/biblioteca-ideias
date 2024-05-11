
import { Component, Input, OnInit } from '@angular/core';
import { pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {

  @Input () pensamento: pensamento = {
    id: 0,
    conteudo: 'i love angular',
    autoria: 'nay',
    modelo: 'modelo3',
    favorito: false
  }

  @Input() listaFavoritos: pensamento[] = [];

  constructor(private service: PensamentoService) { }

  ngOnInit(): void{

  }


  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256){
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }


  mudarIconeFavorito(): string {
    if(this.pensamento.favorito == false) {
      return 'inativo'
    }
    return 'ativo'
  }

  atualizarFavoritos() {
    this.service.mudarFavorito(this.pensamento).subscribe(() => {
      this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1)
    });
  }
}
