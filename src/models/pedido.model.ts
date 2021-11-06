import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Persona} from './persona.model';
import {Restaurante} from './restaurante.model';

@model()
export class Pedido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  turno: number;

  @property({
    type: 'number',
    required: true,
  })
  estado: number;

  @belongsTo(() => Persona)
  personaId: string;

  @hasOne(() => Restaurante)
  restaurante: Restaurante;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
